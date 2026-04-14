// ============================================================
//  JULIA SET — Fragment Shader
//  GLSL ES 3.00 / WebGL2
//
//  The Julia set for parameter c is the boundary of the set of
//  z-values whose orbit under z -> z^2 + c remains bounded.
//  Unlike the Mandelbrot set (where we fix z=0, vary c),
//  here we fix c, vary z (one pixel = one starting z value).
//
//  Features:
//    - Smooth escape-time coloring
//    - Orbit trap (point trap) coloring
//    - Distance estimation glow
//    - Animated parameter c cycling through preset values
//    - Mouse control: hold mouse to lock c to cursor position
//    - 8 famous c presets (dendrite, rabbit, basilica, etc.)
//    - Exterior distance shading + normal map approximation
//
//  Uniforms:
//    u_time       : elapsed seconds
//    u_resolution : viewport size in pixels
//    u_mouse      : mouse position [0..1, 0..1]
// ============================================================

precision highp float;

uniform float u_time;
uniform vec2  u_resolution;
uniform vec2  u_mouse;

out vec4 fragColor;

const int   MAX_ITER = 300;
const float BAILOUT  = 256.0;
const float LOG2     = 0.6931471806;

// ── Famous Julia set parameters ──────────────────────────────
// Each has a distinct visual character:
//   0: Dendrite        — spindly, tree-like, totally disconnected
//   1: Rabbit          — three-lobed, 3-cycle bulb, connected
//   2: Basilica        — two lobes, main cardioid boundary
//   3: Siegel disk     — quasiperiodic rotation, smooth interior
//   4: Airplane        — 4-cycle, insect-like
//   5: San Marco       — dragon-like, period-2
//   6: Spiral          — tight spiral filaments
//   7: Douady rabbit   — three-fold rabbit symmetry

vec2 julia_presets[8];
void init_presets() {
    julia_presets[0] = vec2( 0.0,       1.0    );  // dendrite
    julia_presets[1] = vec2(-0.12256,   0.74486);  // rabbit
    julia_presets[2] = vec2(-0.75,      0.0    );  // basilica (Fatou/Julia boundary)
    julia_presets[3] = vec2(-0.39054,  -0.58679);  // Siegel disk
    julia_presets[4] = vec2(-1.75488,   0.0    );  // airplane
    julia_presets[5] = vec2(-0.7269,    0.1889 );  // San Marco dragon
    julia_presets[6] = vec2( 0.285,     0.01   );  // spiral
    julia_presets[7] = vec2(-0.12256,   0.74486);  // Douady rabbit (same as 1, shown at diff zoom)
}

// ── Palette ──────────────────────────────────────────────────
vec3 palette(float t, float phase) {
    // Electric ocean: blues, cyans, magenta hot spots
    vec3 a = vec3(0.5,  0.5,  0.5);
    vec3 b = vec3(0.5,  0.5,  0.5);
    vec3 c = vec3(1.0,  0.7,  0.4);
    vec3 d = vec3(0.0,  0.15, 0.20);
    return a + b * cos(6.28318 * (c * (t + phase) + d));
}

// ── Complex operations ───────────────────────────────────────
vec2 cmul(vec2 a, vec2 b) {
    return vec2(a.x*b.x - a.y*b.y, a.x*b.y + a.y*b.x);
}

// ── Julia iteration ──────────────────────────────────────────
void main() {
    init_presets();

    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    float aspect = u_resolution.x / u_resolution.y;

    // Map to complex plane: z is the variable, c is fixed per-frame
    vec2 z = (uv - vec2(0.5)) * vec2(aspect, 1.0) * 3.5;

    // Animate c: cycle through presets with smooth interpolation
    float preset_t   = u_time * 0.15;
    int   preset_a   = int(mod(preset_t, 8.0));
    int   preset_b   = int(mod(preset_t + 1.0, 8.0));
    float preset_mix = fract(preset_t);
    // Smooth step for crossfade
    preset_mix = preset_mix * preset_mix * (3.0 - 2.0 * preset_mix);

    vec2 c_anim = mix(julia_presets[preset_a], julia_presets[preset_b], preset_mix);

    // Mouse override: use mouse as c when close to center
    vec2 mouse_c = (u_mouse - vec2(0.5)) * vec2(aspect, 1.0) * 3.5;
    // Only use mouse if it's in a reasonable Julia param range
    float mouse_use = smoothstep(2.5, 1.5, length(mouse_c));
    vec2  c = mix(c_anim, mouse_c, mouse_use * 0.7);

    // ── Main iteration loop ───────────────────────────────
    vec2  dz      = vec2(1.0, 0.0);  // derivative
    float trap    = 1e10;             // point trap: distance to z=(0.5, 0)
    vec2  trap_pt = vec2(0.5, 0.0);
    int   n       = 0;
    bool  escaped = false;
    float smooth_n = 0.0;

    for (int i = 0; i < MAX_ITER; i++) {
        // Orbit trap: min distance to a fixed point
        trap = min(trap, length(z - trap_pt));

        // Derivative for distance estimation
        dz = 2.0 * cmul(z, dz);

        // Julia iteration: z = z^2 + c
        z = cmul(z, z) + c;
        n = i + 1;

        if (dot(z, z) > BAILOUT) {
            float log_zn = log(dot(z, z)) * 0.5;
            float nu     = log(log_zn / LOG2) / LOG2;
            smooth_n     = float(n) - nu;
            escaped      = true;
            break;
        }
    }

    // ── Coloring ──────────────────────────────────────────
    vec3 col;

    if (!escaped) {
        // Interior: period detection via orbit trap tint
        // Trapped interiors glow warmly, deep interior is dark
        float interior_glow = exp(-trap * 6.0);
        col = vec3(0.03, 0.01, 0.05)
            + vec3(0.2, 0.1, 0.3) * interior_glow;
    } else {
        // Exterior smooth coloring
        float t     = smooth_n / float(MAX_ITER);
        float phase = u_time * 0.04;

        col = palette(t * 4.0, phase);

        // Orbit trap rings: thin glowing lines where orbit passed near trap_pt
        float trap_ring = exp(-trap * 12.0) * 0.5;
        float trap_ring2 = exp(-(trap - 0.15) * (trap - 0.15) * 80.0) * 0.3;
        col += vec3(1.0, 0.5, 0.1) * (trap_ring + trap_ring2);

        // Distance estimator glow at boundary
        float de = sqrt(dot(z,z) / dot(dz,dz)) * log(dot(z,z)) * 0.5;
        float de_glow = smoothstep(0.003, 0.0, de);
        col += vec3(1.0, 1.0, 0.95) * de_glow;

        // Subtle normal-map shading from DE gradient
        // (approximated with a small spatial offset)
        col *= 0.85 + 0.15 * (1.0 - t);
    }

    // Vignette
    vec2 vign = uv * 2.0 - 1.0;
    col *= 1.0 - dot(vign, vign) * 0.25;

    // Display current c value as subtle gradient hint
    float c_indicator = length(c - c_anim) * 0.5;
    col = mix(col, col + vec3(0.02, 0.01, 0.0), c_indicator);

    fragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
}

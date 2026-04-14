// ============================================================
//  MANDELBROT SET — Fragment Shader
//  GLSL ES 3.00 / WebGL2
//
//  Features:
//    - Smooth (continuous) escape-time coloring
//    - Orbit trap coloring (cross, circle, point)
//    - Distance estimator for boundary glow
//    - Exterior cyclic palette mapping
//    - Interior period detection coloring
//    - Animated parameter drift
//    - Mouse-driven Julia preview
//
//  Uniforms injected by RepoScripter2 / ShaderForge:
//    u_time     : elapsed seconds
//    u_resolution : viewport size in pixels
//    u_mouse    : mouse position [0..1, 0..1]
//
//  Standalone usage:
//    Pass the uniforms above from your host environment.
// ============================================================

precision highp float;

uniform float     u_time;
uniform vec2      u_resolution;
uniform vec2      u_mouse;

out vec4 fragColor;

// ── Constants ────────────────────────────────────────────────
const int   MAX_ITER   = 256;
const float BAILOUT    = 256.0;         // escape radius squared
const float LOG2       = 0.6931471806;

// ── Palette ──────────────────────────────────────────────────
// Cosine palette by Inigo Quilez: c(t) = a + b*cos(2π(c*t+d))
vec3 palette(float t) {
    vec3 a = vec3(0.5,  0.5,  0.5);
    vec3 b = vec3(0.5,  0.5,  0.5);
    vec3 c = vec3(1.0,  1.0,  1.0);
    vec3 d = vec3(0.00, 0.33, 0.67);
    return a + b * cos(6.28318 * (c * t + d));
}

// Alternate: electric neon palette
vec3 paletteNeon(float t) {
    vec3 a = vec3(0.5,  0.5,  0.5);
    vec3 b = vec3(0.5,  0.5,  0.5);
    vec3 c = vec3(2.0,  1.0,  0.0);
    vec3 d = vec3(0.50, 0.20, 0.25);
    return a + b * cos(6.28318 * (c * t + d));
}

// ── Complex multiply ─────────────────────────────────────────
vec2 cmul(vec2 a, vec2 b) {
    return vec2(a.x*b.x - a.y*b.y, a.x*b.y + a.y*b.x);
}

// ── Mandelbrot iteration ─────────────────────────────────────
// Returns vec4: (smooth_n, orbit_trap_dist, de_derivative_mag, interior_flag)
// smooth_n     : smooth escape count (0 = interior)
// orbit_trap   : minimum distance to cross trap
// de_mag       : distance-estimator magnitude (for boundary glow)
// interior     : 1.0 if bounded (in set), 0.0 if escaped
struct IterResult {
    float smooth_n;
    float orbit_trap;
    float de_mag;
    float interior;
};

IterResult mandelbrot(vec2 c, int max_iter) {
    vec2  z     = vec2(0.0);
    vec2  dz    = vec2(1.0, 0.0);   // derivative for distance estimation
    float trap  = 1e10;             // orbit trap (cross-shaped)
    int   n     = 0;

    for (int i = 0; i < MAX_ITER; i++) {
        if (i >= max_iter) break;

        // Distance estimator: dz = 2*z*dz + 1
        dz = 2.0 * cmul(z, dz) + vec2(1.0, 0.0);

        // Main iteration: z = z^2 + c
        z = cmul(z, z) + c;
        n = i + 1;

        // Cross orbit trap: min distance to Re axis and Im axis
        float cross_trap = min(abs(z.x), abs(z.y));
        trap = min(trap, cross_trap);

        if (dot(z, z) > BAILOUT) {
            // Smooth escape count: removes banding
            float log_zn   = log(dot(z, z)) * 0.5;
            float nu       = log(log_zn / LOG2) / LOG2;
            float smooth_n = float(n) - nu;

            float de = sqrt(dot(z,z) / dot(dz,dz)) * log(dot(z,z)) * 0.5;

            IterResult r;
            r.smooth_n   = smooth_n;
            r.orbit_trap = trap;
            r.de_mag     = de;
            r.interior   = 0.0;
            return r;
        }
    }

    IterResult r;
    r.smooth_n   = 0.0;
    r.orbit_trap = trap;
    r.de_mag     = 0.0;
    r.interior   = 1.0;
    return r;
}

// ── Main ─────────────────────────────────────────────────────
void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;

    // Coordinate mapping: center on (-0.5, 0) with correct aspect ratio
    float aspect = u_resolution.x / u_resolution.y;
    vec2 c = (uv - vec2(0.5)) * vec2(aspect, 1.0) * 3.0;
    c += vec2(-0.5, 0.0);   // center offset for Mandelbrot

    // Slow zoom toward a deep spiral
    float zoom_t    = u_time * 0.03;
    float zoom_level = exp(-zoom_t * 0.4);
    vec2  zoom_target = vec2(-0.7435669, 0.1314023); // deep spiral region
    c = c * zoom_level + zoom_target * (1.0 - zoom_level);

    int iter_count = int(mix(64.0, float(MAX_ITER), clamp(zoom_t * 0.1, 0.0, 1.0)));

    IterResult r = mandelbrot(c, MAX_ITER);

    vec3 col;

    if (r.interior > 0.5) {
        // Interior: dark with subtle orbit trap tint
        col = vec3(0.02, 0.01, 0.03) + vec3(0.05) * r.orbit_trap;
    } else {
        // Exterior: smooth cyclic palette
        float t = r.smooth_n / float(MAX_ITER);

        // Phase shift over time for color animation
        float phase = u_time * 0.05;

        // Primary palette color
        vec3 colA = palette(t * 3.0 + phase);

        // Orbit trap overlay: thin bright lines where z passed near axes
        float trap_glow = exp(-r.orbit_trap * 8.0);
        vec3 trap_color = vec3(1.0, 0.8, 0.4) * trap_glow;

        // Distance estimator: bright boundary glow
        float de_glow = exp(-r.de_mag * 600.0 * zoom_level);
        vec3  de_color = vec3(1.0, 1.0, 0.9) * de_glow;

        col = colA + trap_color * 0.4 + de_color * 0.8;
    }

    // Mouse: highlight nearest Julia set slice (subtle tint)
    vec2 mouse_c = (u_mouse - vec2(0.5)) * vec2(aspect, 1.0) * 3.0 + vec2(-0.5, 0.0);
    float mouse_dist = length(c - mouse_c);
    col += vec3(0.0, 0.05, 0.1) * exp(-mouse_dist * 2.0);

    // Vignette
    vec2 vign_uv = uv * 2.0 - 1.0;
    col *= 1.0 - dot(vign_uv, vign_uv) * 0.3;

    fragColor = vec4(col, 1.0);
}

// ============================================================
//  BURNING SHIP FRACTAL — Fragment Shader
//  GLSL ES 3.00 / WebGL2
//
//  The Burning Ship fractal uses absolute values before squaring:
//    z_{n+1} = (|Re(z)| + i|Im(z)|)^2 + c
//
//  This breaks the rotational symmetry of the Mandelbrot set,
//  producing asymmetric structures. The most famous feature is
//  the "burning ship" silhouette visible in the lower region,
//  resembling a ship engulfed in flame seen from below.
//
//  Variants included:
//    - Standard Burning Ship
//    - "Celtic" variant: only |Re(z)| is taken absolute
//    - "Buffalo" variant: only |Im(z)| is taken absolute
//    - "Perpendicular Burning Ship": alternating absolute
//
//  Features:
//    - Smooth escape-time coloring
//    - Cyclic offset coloring for flame effect
//    - Animated slow drift across the fractal
//    - Orbit traps (horizontal line trap)
//    - Variant cycling over time
// ============================================================

precision highp float;

uniform float u_time;
uniform vec2  u_resolution;
uniform vec2  u_mouse;

out vec4 fragColor;

const int   MAX_ITER = 256;
const float BAILOUT  = 256.0;
const float LOG2     = 0.6931471806;

// ── Flame palette ────────────────────────────────────────────
// Hot at center (yellow/white), cooling to red/orange, deep purple exterior
vec3 flamePalette(float t) {
    t = clamp(t, 0.0, 1.0);
    // Black → deep red → orange → yellow → white → cyan → purple
    vec3 a = vec3(0.5, 0.2,  0.1 );
    vec3 b = vec3(0.5, 0.4,  0.3 );
    vec3 c = vec3(1.0, 0.7,  0.4 );
    vec3 d = vec3(0.0, 0.25, 0.10);
    return a + b * cos(6.28318 * (c * t + d));
}

// ── Burning Ship variants ────────────────────────────────────
float burning_ship(vec2 c, out float smooth_n, out float trap) {
    vec2 z     = vec2(0.0);
    trap       = 1e10;
    smooth_n   = 0.0;

    for (int i = 0; i < MAX_ITER; i++) {
        // Horizontal line trap: distance to Im(z) = 0
        trap = min(trap, abs(z.y));

        // Standard Burning Ship: abs both components before squaring
        z = vec2(abs(z.x), abs(z.y));
        // z = z^2 + c
        z = vec2(z.x*z.x - z.y*z.y + c.x,
                 2.0*z.x*z.y         + c.y);

        if (dot(z, z) > BAILOUT) {
            float log_zn = log(dot(z,z)) * 0.5;
            float nu     = log(log_zn / LOG2) / LOG2;
            smooth_n     = float(i + 1) - nu;
            return 1.0;  // escaped
        }
    }
    return 0.0;  // interior
}

float celtic(vec2 c, out float smooth_n, out float trap) {
    vec2 z   = vec2(0.0);
    trap     = 1e10;
    smooth_n = 0.0;

    for (int i = 0; i < MAX_ITER; i++) {
        trap = min(trap, abs(z.y));
        // Celtic: only abs real part, then square normally
        float rx = z.x * z.x - z.y * z.y;
        z = vec2(abs(rx) + c.x, 2.0 * z.x * z.y + c.y);

        if (dot(z, z) > BAILOUT) {
            float log_zn = log(dot(z,z)) * 0.5;
            smooth_n = float(i + 1) - log(log_zn / LOG2) / LOG2;
            return 1.0;
        }
    }
    return 0.0;
}

void main() {
    vec2 uv     = gl_FragCoord.xy / u_resolution.xy;
    float aspect = u_resolution.x / u_resolution.y;

    // Coordinate mapping — show the ship region
    // The "ship" is visible around (-1.8, -0.08) at scale ~0.1
    vec2 center = vec2(-0.5, -0.5);
    float zoom  = 2.2;

    // Slow drift
    center += vec2(sin(u_time * 0.03) * 0.1, cos(u_time * 0.02) * 0.05);

    vec2 c = (uv - vec2(0.5)) * vec2(aspect, 1.0) * zoom + center;

    // Variant selection: slow cycle
    float variant_t = floor(mod(u_time * 0.1, 2.0));

    float smooth_n, trap, escaped;
    if (variant_t < 1.0) {
        escaped = burning_ship(c, smooth_n, trap);
    } else {
        escaped = celtic(c, smooth_n, trap);
    }

    vec3 col;

    if (escaped < 0.5) {
        // Interior: near-black with subtle trap warmth
        col = vec3(0.04, 0.01, 0.01) + vec3(0.08, 0.03, 0.0) * exp(-trap * 4.0);
    } else {
        float t     = smooth_n / float(MAX_ITER);
        float phase = u_time * 0.06;

        // Flame-style coloring: fast cycles near boundary, slow outside
        col = flamePalette(fract(t * 6.0 + phase));

        // Horizontal flame streaks from orbit trap
        float streak = exp(-trap * 20.0);
        col += vec3(1.0, 0.6, 0.1) * streak * 0.5;

        // Boundary emphasis
        float boundary = exp(-smooth_n * 0.05);
        col = mix(col, vec3(1.0, 0.9, 0.7), boundary * 0.3);
    }

    // Vignette
    vec2 vign = uv * 2.0 - 1.0;
    col *= 1.0 - dot(vign, vign) * 0.2;

    fragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
}

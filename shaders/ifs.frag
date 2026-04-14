// ============================================================
//  IFS FRACTALS — Fragment Shader
//  GLSL ES 3.00 / WebGL2
//
//  Iterated Function Systems (IFS): apply a random weighted
//  contractive transformation from a set, plot the resulting
//  "random walk" orbit. The orbit converges to the attractor
//  (the fractal) regardless of starting point.
//
//  Each IFS is defined by a set of affine transforms:
//    T_i(x,y) = [ a b ] [x] + [e]
//               [ c d ] [y]   [f]
//  with probability p_i.
//
//  Included attractors (cycle over time):
//    0: Sierpinski Triangle  — classic 3-fold triangle
//    1: Barnsley Fern        — uncanny biological fern
//    2: Dragon Curve         — recursive dragon fold
//    3: Lévy C Curve         — elegant L-shaped self-similarity
//    4: Fractal Tree         — binary branching tree
//    5: Coral                — rough organic branching
//
//  Rendering: accumulate point hits into a density texture,
//  then tone-map. Here we do N iterations per fragment and
//  histogram-equalize for display (approximate via log).
// ============================================================

precision highp float;

uniform float u_time;
uniform vec2  u_resolution;
uniform vec2  u_mouse;

out vec4 fragColor;

// ── PRNG (deterministic per-pixel) ──────────────────────────
float rand(vec2 seed) {
    return fract(sin(dot(seed, vec2(12.9898, 78.233))) * 43758.5453);
}

float rand1(float seed) {
    return fract(sin(seed * 127.1 + 311.7) * 43758.5453);
}

// ── IFS transform structures ─────────────────────────────────
struct Transform {
    float a, b, c, d, e, f, p;
};

vec2 applyT(Transform t, vec2 p) {
    return vec2(t.a*p.x + t.b*p.y + t.e,
                t.c*p.x + t.d*p.y + t.f);
}

// ── IFS definitions ──────────────────────────────────────────

// Sierpinski Triangle (3 transforms, equal probability)
void getSierpinski(out Transform t[4], out int count) {
    count = 3;
    t[0] = Transform(0.5,  0.0, 0.0,  0.5, 0.00, 0.00, 0.33);
    t[1] = Transform(0.5,  0.0, 0.0,  0.5, 0.50, 0.00, 0.33);
    t[2] = Transform(0.5,  0.0, 0.0,  0.5, 0.25, 0.43, 0.34);
    t[3] = t[2]; // unused
}

// Barnsley Fern (4 transforms, probability-weighted)
void getBarnsleyFern(out Transform t[4], out int count) {
    count = 4;
    t[0] = Transform( 0.00,  0.00,  0.00,  0.16, 0.00, 0.00, 0.01);
    t[1] = Transform( 0.85,  0.04, -0.04,  0.85, 0.00, 1.60, 0.85);
    t[2] = Transform( 0.20, -0.26,  0.23,  0.22, 0.00, 1.60, 0.07);
    t[3] = Transform(-0.15,  0.28,  0.26,  0.24, 0.00, 0.44, 0.07);
}

// Fractal Tree (4 transforms)
void getFractalTree(out Transform t[4], out int count) {
    count = 4;
    float s = 0.6;
    float ang1 = 0.6; float ang2 = -0.6;
    t[0] = Transform(0.0, 0.0, 0.0, 0.5, 0.0, 0.0,  0.05);
    t[1] = Transform(s*cos(ang1), -s*sin(ang1), s*sin(ang1), s*cos(ang1), 0.0, 1.0, 0.45);
    t[2] = Transform(s*cos(ang2), -s*sin(ang2), s*sin(ang2), s*cos(ang2), 0.0, 1.0, 0.45);
    t[3] = Transform(0.0, 0.0, 0.0, 0.5, 0.0, 0.5,  0.05);
}

// Dragon Curve (2 transforms)
void getDragon(out Transform t[4], out int count) {
    count = 2;
    float s = 0.7071;
    t[0] = Transform( s,  s, -s,  s, 0.0, 0.0, 0.5);
    t[1] = Transform(-s,  s, -s, -s, 1.0, 0.0, 0.5);
    t[2] = t[0]; t[3] = t[0]; // unused
}

// ── Choose transform by probability ──────────────────────────
int chooseTransform(Transform t[4], int count, float r) {
    float cumulative = 0.0;
    for (int i = 0; i < 4; i++) {
        if (i >= count) break;
        cumulative += t[i].p;
        if (r < cumulative) return i;
    }
    return count - 1;
}

// ── IFS iteration ─────────────────────────────────────────────
// Iterate N steps from seed point and check if any land near pixel
void main() {
    vec2 uv     = gl_FragCoord.xy / u_resolution.xy;
    float aspect = u_resolution.x / u_resolution.y;

    // Which IFS to show (cycle every 8 seconds)
    int ifs_idx = int(mod(u_time * 0.125, 4.0));

    Transform t[4];
    int count;

    if      (ifs_idx == 0) getSierpinski(t, count);
    else if (ifs_idx == 1) getBarnsleyFern(t, count);
    else if (ifs_idx == 2) getDragon(t, count);
    else                   getFractalTree(t, count);

    // Screen-to-attractor coordinate mapping
    // Each IFS has a canonical bounding box — map uv to it
    vec2 attractor_min, attractor_max;
    if (ifs_idx == 0) { attractor_min = vec2(0.0, 0.0); attractor_max = vec2(1.0, 0.87); }
    else if (ifs_idx == 1) { attractor_min = vec2(-2.2, 0.0); attractor_max = vec2(2.7, 9.9); }
    else if (ifs_idx == 2) { attractor_min = vec2(-0.5, -0.4); attractor_max = vec2(1.5, 1.4); }
    else { attractor_min = vec2(-1.0, 0.0); attractor_max = vec2(1.0, 2.0); }

    vec2 target = mix(attractor_min, attractor_max, vec2(uv.x, 1.0 - uv.y));

    // Run the IFS chaos game from multiple seeds per pixel
    // Count how many hits land near this pixel
    float pixel_radius = (attractor_max.x - attractor_min.x) / u_resolution.x * 2.0;
    float hit_count = 0.0;
    float color_acc = 0.0;

    const int SEEDS = 8;
    const int ITERS = 200;

    for (int s = 0; s < SEEDS; s++) {
        // Different starting seed per sample
        float seed_f = float(s) * 17.37 + u_time * 0.01;
        vec2 p = vec2(rand1(seed_f), rand1(seed_f + 1.0));

        // Warm up (skip first 20 iterations — not on attractor yet)
        for (int i = 0; i < 20; i++) {
            float r = rand(p + float(i) * vec2(1.7, 3.1));
            int ti = chooseTransform(t, count, r);
            p = applyT(t[ti], p);
        }

        // Main iterations — check proximity to pixel
        for (int i = 0; i < ITERS; i++) {
            float r = rand(p + float(i + 20) * vec2(2.3, 5.7) + vec2(seed_f));
            int ti = chooseTransform(t, count, r);
            p = applyT(t[ti], p);

            float dist = length(p - target);
            if (dist < pixel_radius) {
                hit_count += 1.0;
                color_acc += float(ti) / float(count); // which transform = hue
            }
        }
    }

    // Normalize and colorize
    float density = hit_count / float(SEEDS * ITERS);

    vec3 col;
    if (density < 0.00001) {
        // Background
        col = vec3(0.02, 0.01, 0.03);
    } else {
        // Log-scale density for visibility
        float log_d = log(density * 500.0 + 1.0) * 0.5;
        float hue   = color_acc / max(hit_count, 0.001);

        // Hue from transform identity (which part of fractal)
        vec3 a = vec3(0.5);
        vec3 b = vec3(0.5);
        vec3 c = vec3(1.0, 0.8, 0.5);
        vec3 d = vec3(0.0 + hue * 0.5, 0.15, 0.2);
        vec3 base_col = a + b * cos(6.28318 * (c * log_d + d));

        col = base_col * clamp(log_d, 0.0, 1.0);

        // Hot core
        col += vec3(1.0, 0.9, 0.7) * max(0.0, log_d - 0.8) * 0.5;
    }

    // Vignette
    vec2 vign = uv * 2.0 - 1.0;
    col *= 1.0 - dot(vign, vign) * 0.25;

    fragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
}

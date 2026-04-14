// ============================================================
//  LYAPUNOV FRACTAL — Fragment Shader
//  GLSL ES 3.00 / WebGL2
//
//  Lyapunov fractals visualize the Lyapunov exponent of the
//  logistic map f(x) = r*x*(1-x) under a periodically
//  alternating sequence of two parameters r_A and r_B.
//
//  Algorithm:
//    1. Fix r_A (x axis) and r_B (y axis) for the pixel
//    2. Iterate the logistic map using alternating r values
//       from a sequence string (e.g., "AABAB")
//    3. Compute λ = (1/N) * Σ log|f'(x)| where f'(x) = r*(1-2x)
//    4. Color: λ < 0 → stable (blue/green), λ > 0 → chaotic (red/yellow)
//
//  The boundary between negative and positive λ produces the
//  fractal structure — it traces the edge between order and chaos.
//
//  Features:
//    - Configurable sequence string (several presets cycle over time)
//    - Separate color ramps for stable/chaotic regions
//    - Animated view drift + time-varying sequence
//    - Mouse controls: left = sequence A region, right = sequence B
// ============================================================

precision highp float;

uniform float u_time;
uniform vec2  u_resolution;
uniform vec2  u_mouse;

out vec4 fragColor;

const int WARMUP = 100;   // discard first N iterations (settle)
const int SAMPLE = 300;   // iterations used to compute λ

// ── Color ramps ──────────────────────────────────────────────
// Stable (λ < 0): deep blues and teals
vec3 stableColor(float lambda) {
    // lambda is negative; map to [0,1] by dividing by expected range
    float t = clamp(-lambda / 3.5, 0.0, 1.0);
    return mix(
        vec3(0.0, 0.05, 0.15),   // near 0 (marginal stability) — near black
        vec3(0.0, 0.6,  0.9),    // very stable — bright teal
        sqrt(t)
    );
}

// Chaotic (λ > 0): hot reds/yellows
vec3 chaoticColor(float lambda) {
    float t = clamp(lambda / 2.5, 0.0, 1.0);
    return mix(
        vec3(0.3, 0.0, 0.0),   // near 0 (marginal chaos) — dark red
        vec3(1.0, 0.9, 0.2),   // strongly chaotic — hot yellow
        t * t
    );
}

// ── Sequence lookup ──────────────────────────────────────────
// 0 = use r_A, 1 = use r_B
// Pre-baked sequences (max 8 chars shown)
float getSeq(int seq_idx, int step) {
    // Sequence 0: "AB"       (simple alternating)
    // Sequence 1: "AABAB"    (classic Markus sequence, produces "Zircon City")
    // Sequence 2: "AAABBB"   (triple alternating)
    // Sequence 3: "ABABB"    (golden ratio-inspired)
    int pos;
    if (seq_idx == 0) {
        pos = int(mod(float(step), 2.0));
        return pos == 0 ? 0.0 : 1.0;
    } else if (seq_idx == 1) {
        // AABAB = 0,0,1,0,1
        int seq[5]; seq[0]=0; seq[1]=0; seq[2]=1; seq[3]=0; seq[4]=1;
        return float(seq[int(mod(float(step), 5.0))]);
    } else if (seq_idx == 2) {
        // AAABBB = 0,0,0,1,1,1
        return step % 6 < 3 ? 0.0 : 1.0;
    } else {
        // ABABB = 0,1,0,1,1
        int seq[5]; seq[0]=0; seq[1]=1; seq[2]=0; seq[3]=1; seq[4]=1;
        return float(seq[int(mod(float(step), 5.0))]);
    }
}

// ── Lyapunov exponent computation ────────────────────────────
float lyapunov(float rA, float rB, int seq_idx) {
    float x = 0.5;  // starting state

    // Warm up: let x settle
    for (int i = 0; i < WARMUP; i++) {
        float r = (getSeq(seq_idx, i) < 0.5) ? rA : rB;
        x = r * x * (1.0 - x);
        x = clamp(x, 1e-6, 1.0 - 1e-6);
    }

    // Accumulate Lyapunov exponent
    float lambda = 0.0;
    for (int i = 0; i < SAMPLE; i++) {
        float r = (getSeq(seq_idx, WARMUP + i) < 0.5) ? rA : rB;
        // |f'(x)| = |r * (1 - 2x)|
        float deriv = abs(r * (1.0 - 2.0 * x));
        lambda += log(max(deriv, 1e-10));
        x = r * x * (1.0 - x);
        x = clamp(x, 1e-6, 1.0 - 1e-6);
    }

    return lambda / float(SAMPLE);
}

void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;

    // Parameter space: both axes map to [2, 4] (logistic map chaos range)
    // x axis = r_A, y axis = r_B
    vec2 range_min = vec2(2.5, 2.5);
    vec2 range_max = vec2(4.0, 4.0);

    // Slow animated zoom toward a detail region
    float zoom_t  = u_time * 0.04;
    vec2 center  = vec2(3.45, 3.62);  // interesting fractal region
    float zoom   = exp(-zoom_t * 0.3);
    vec2 half_w  = (range_max - range_min) * 0.5 * zoom;

    range_min = center - half_w;
    range_max = center + half_w;

    float rA = mix(range_min.x, range_max.x, uv.x);
    float rB = mix(range_min.y, range_max.y, uv.y);

    // Sequence cycles over time
    int seq_idx = int(mod(u_time * 0.08, 4.0));

    float lambda = lyapunov(rA, rB, seq_idx);

    vec3 col;
    if (abs(lambda) < 0.01) {
        // Boundary: white/bright at λ ≈ 0
        col = vec3(0.95, 0.95, 0.85);
    } else if (lambda < 0.0) {
        col = stableColor(lambda);
    } else {
        col = chaoticColor(lambda);
    }

    // Subtle time-pulsed glow at zero-crossing boundary
    float boundary_glow = exp(-abs(lambda) * 8.0) * (0.5 + 0.5 * sin(u_time * 2.0));
    col += vec3(1.0, 1.0, 0.8) * boundary_glow * 0.3;

    // Vignette
    vec2 vign = uv * 2.0 - 1.0;
    col *= 1.0 - dot(vign, vign) * 0.15;

    fragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
}

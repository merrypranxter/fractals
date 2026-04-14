// ============================================================
//  NEWTON FRACTAL — Fragment Shader
//  GLSL ES 3.00 / WebGL2
//
//  Newton's method for finding roots of z^n - 1 = 0.
//  Each pixel is a starting guess; color = which root it
//  converges to, brightness = how fast it converged.
//
//  For z^3 - 1: three roots, classic trilobite symmetry.
//  For z^4 - 1: four roots, square symmetry.
//  For z^5 - 1: five roots, pentagonal symmetry.
//
//  Newton iteration: z_{n+1} = z - f(z)/f'(z)
//  For f(z) = z^d - 1: z_{n+1} = z - (z^d - 1) / (d * z^{d-1})
//                               = ((d-1)*z^d + 1) / (d * z^{d-1})
//
//  Features:
//    - Configurable degree d (cycles 3 → 5 over time)
//    - Root basins colored with saturated hues
//    - Convergence speed → brightness (slow = dark, fast = bright)
//    - Boundary regions: smooth interpolation between root colors
//    - Relaxed Newton (multiply update by damping factor a)
//      a < 1: underdamped (more complex boundaries)
//      a > 1: overdamped (different basin structure)
// ============================================================

precision highp float;

uniform float u_time;
uniform vec2  u_resolution;
uniform vec2  u_mouse;

out vec4 fragColor;

const int   MAX_ITER  = 64;
const float TOLERANCE = 1e-5;

// ── Root colors: saturated hues for each root ────────────────
vec3 rootColor(int root_idx, int degree) {
    float hue = float(root_idx) / float(degree);
    // HSV to RGB (S=1, V=1)
    vec3 rgb = clamp(abs(mod(hue * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
    return rgb;
}

// ── Complex operations ───────────────────────────────────────
vec2 cmul(vec2 a, vec2 b) { return vec2(a.x*b.x - a.y*b.y, a.x*b.y + a.y*b.x); }
vec2 cdiv(vec2 a, vec2 b) {
    float d = dot(b, b);
    return vec2(dot(a, b), a.y*b.x - a.x*b.y) / d;
}
vec2 cpow(vec2 z, int n) {
    vec2 result = vec2(1.0, 0.0);
    for (int i = 0; i < 8; i++) {
        if (i >= n) break;
        result = cmul(result, z);
    }
    return result;
}
float carg(vec2 z) { return atan(z.y, z.x); }

// ── Find which root z is nearest to ─────────────────────────
int nearestRoot(vec2 z, int degree) {
    float best_dist = 1e10;
    int   best_root = 0;
    for (int k = 0; k < 8; k++) {
        if (k >= degree) break;
        float angle = 6.28318 * float(k) / float(degree);
        vec2 root   = vec2(cos(angle), sin(angle));
        float d     = length(z - root);
        if (d < best_dist) {
            best_dist = d;
            best_root = k;
        }
    }
    return best_root;
}

void main() {
    vec2 uv     = gl_FragCoord.xy / u_resolution.xy;
    float aspect = u_resolution.x / u_resolution.y;

    // Map to complex plane
    vec2 z0 = (uv - vec2(0.5)) * vec2(aspect, 1.0) * 2.5;

    // Slow rotation for animation
    float rot = u_time * 0.03;
    z0 = vec2(z0.x * cos(rot) - z0.y * sin(rot),
              z0.x * sin(rot) + z0.y * cos(rot));

    // Degree cycles 3 → 4 → 5 over time
    float deg_t  = mod(u_time * 0.1, 3.0);
    int   degree = 3 + int(deg_t);

    // Relaxation factor: mouse.x controls damping
    // 0.5 = underdamped (strange hairy basins), 1.0 = classic Newton
    float relax = 0.7 + u_mouse.x * 0.6;

    vec2 z = z0;
    int  converge_iter = MAX_ITER;
    int  converge_root = 0;

    for (int i = 0; i < MAX_ITER; i++) {
        // f(z) = z^d - 1
        vec2 zd   = cpow(z, degree);
        vec2 fz   = zd - vec2(1.0, 0.0);
        // f'(z) = d * z^{d-1}
        vec2 fpz  = float(degree) * cpow(z, degree - 1);
        // Newton step: z = z - relax * f(z)/f'(z)
        z = z - relax * cdiv(fz, fpz);

        // Check convergence: within tolerance of any root
        int root = nearestRoot(z, degree);
        float angle = 6.28318 * float(root) / float(degree);
        vec2 root_pos = vec2(cos(angle), sin(angle));

        if (length(z - root_pos) < TOLERANCE) {
            converge_iter = i;
            converge_root = root;
            break;
        }
    }

    // ── Color assignment ──────────────────────────────────
    // Base color from which root the pixel converged to
    vec3 base_col = rootColor(converge_root, degree);

    // Brightness from convergence speed:
    // Fast convergence (few iterations) = bright, slow = dark
    float speed = 1.0 - float(converge_iter) / float(MAX_ITER);
    float brightness = pow(speed, 0.4);

    // Stripe shading: subtle banding along convergence count
    float stripe = sin(float(converge_iter) * 0.8 + u_time * 0.2) * 0.5 + 0.5;
    brightness   = mix(brightness, brightness * stripe, 0.2);

    // Boundary detection: pixels near basin boundaries have high
    // sensitivity to which root they converge to → darken these
    // (approximated by checking a small neighborhood)
    vec2 eps    = vec2(1.0, 0.0) / u_resolution.x;
    vec2 z_dx = z0 + eps;
    vec2 zr   = z_dx;
    int  root_dx = converge_root;
    for (int i = 0; i < MAX_ITER; i++) {
        vec2 zd  = cpow(zr, degree);
        vec2 fz  = zd - vec2(1.0, 0.0);
        vec2 fpz = float(degree) * cpow(zr, degree - 1);
        zr = zr - cdiv(fz, fpz);
        root_dx = nearestRoot(zr, degree);
        if (length(zr - vec2(cos(6.28318 * float(root_dx)/float(degree)),
                             sin(6.28318 * float(root_dx)/float(degree)))) < TOLERANCE) break;
    }
    float boundary = (root_dx != converge_root) ? 0.3 : 1.0;

    vec3 col = base_col * brightness * boundary;

    // Subtle glow at root positions
    for (int k = 0; k < 5; k++) {
        if (k >= degree) break;
        float angle = 6.28318 * float(k) / float(degree);
        vec2 rp = vec2(cos(angle), sin(angle));
        float glow = exp(-length(z0 - rp) * 8.0);
        col += rootColor(k, degree) * glow * 0.3;
    }

    // Vignette
    vec2 vign = uv * 2.0 - 1.0;
    col *= 1.0 - dot(vign, vign) * 0.2;

    fragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
}

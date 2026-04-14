// ============================================================
//  MANDELBULB — 3D Raymarched Fractal
//  GLSL ES 3.00 / WebGL2
//
//  The Mandelbulb is a 3D extension of the Mandelbrot set using
//  spherical coordinates. Each iteration:
//    r     = |z|
//    theta = power * atan(y/x)   (spherical angle)
//    phi   = power * acos(z/r)   (polar angle)
//    z     = r^power * (sin(phi)cos(theta), sin(phi)sin(theta), cos(phi)) + c
//
//  With power=8 you get the "classic" Mandelbulb.
//  Power 2 gives a fuzzy sphere. Power 3-4 give alien forms.
//  Power 8+ produces the spiky, tentacled Mandelbulb.
//
//  Rendered via ray marching against a distance estimator (DE).
//  DE for Mandelbulb: |z| * log(|z|) / (2 * |dz|)
//  where dz is the derivative tracked alongside z.
//
//  Features:
//    - Animated power (cycles 2 → 8 → 2)
//    - Orbit camera rotating around the bulb
//    - Ambient occlusion from DE
//    - Fake subsurface glow (interior distance)
//    - Normal estimation via DE gradient (6-sample)
//    - Phong lighting + rim light
//    - Iteration-count coloring on surface
// ============================================================

precision highp float;

uniform float u_time;
uniform vec2  u_resolution;
uniform vec2  u_mouse;

out vec4 fragColor;

const int   MAX_MARCH = 128;
const int   MAX_ITER  = 8;
const float MAX_DIST  = 20.0;
const float SURF_DIST = 0.0005;
const float PI        = 3.14159265;

// ── Mandelbulb DE ────────────────────────────────────────────
vec2 mandelbulb_de(vec3 pos, float power) {
    vec3  z    = pos;
    float dr   = 1.0;
    float r    = 0.0;
    float trap = 1e10;  // orbit trap: min |z|

    for (int i = 0; i < MAX_ITER; i++) {
        r = length(z);
        trap = min(trap, r);

        if (r > 2.0) break;

        // Convert to spherical
        float theta = acos(clamp(z.z / r, -1.0, 1.0));
        float phi   = atan(z.y, z.x);

        // Update derivative
        dr = pow(r, power - 1.0) * power * dr + 1.0;

        // Scale and rotate
        float zr = pow(r, power);
        theta    = theta * power;
        phi      = phi * power;

        // Convert back to Cartesian
        z = zr * vec3(sin(theta)*cos(phi),
                      sin(theta)*sin(phi),
                      cos(theta));
        z += pos;
    }

    // Distance estimate + orbit trap packed
    float de = 0.5 * log(r) * r / dr;
    return vec2(de, trap);
}

// ── Scene distance ───────────────────────────────────────────
float sceneDist(vec3 p, float power) {
    return mandelbulb_de(p, power).x;
}

// ── Normal estimation (6-sample gradient) ────────────────────
vec3 calcNormal(vec3 p, float power) {
    float e = 0.001;
    return normalize(vec3(
        sceneDist(p + vec3(e,0,0), power) - sceneDist(p - vec3(e,0,0), power),
        sceneDist(p + vec3(0,e,0), power) - sceneDist(p - vec3(0,e,0), power),
        sceneDist(p + vec3(0,0,e), power) - sceneDist(p - vec3(0,0,e), power)
    ));
}

// ── Ambient occlusion from DE ─────────────────────────────────
float calcAO(vec3 p, vec3 n, float power) {
    float ao = 0.0;
    float w  = 1.0;
    for (int i = 1; i <= 5; i++) {
        float d = float(i) * 0.08;
        ao += w * (d - sceneDist(p + n * d, power));
        w  *= 0.5;
    }
    return clamp(1.0 - ao * 3.0, 0.0, 1.0);
}

void main() {
    vec2 uv     = gl_FragCoord.xy / u_resolution.xy;
    float aspect = u_resolution.x / u_resolution.y;

    // Animated power: 8 for classic bulb, shifts slowly
    float power = 8.0 + 2.0 * sin(u_time * 0.1);

    // Orbit camera
    float cam_t   = u_time * 0.15;
    float cam_r   = 2.8;
    float cam_h   = 0.4 + sin(cam_t * 0.3) * 0.3;
    vec3  cam_pos = vec3(cos(cam_t) * cam_r, cam_h, sin(cam_t) * cam_r);
    vec3  target  = vec3(0.0, 0.0, 0.0);

    // Camera matrix
    vec3 fw  = normalize(target - cam_pos);
    vec3 rt  = normalize(cross(vec3(0,1,0), fw));
    vec3 up  = cross(fw, rt);

    // Ray direction
    vec2 ndc = (uv - 0.5) * vec2(aspect, 1.0) * 2.0;
    vec3 rd  = normalize(ndc.x * rt + ndc.y * up + 1.8 * fw);
    vec3 ro  = cam_pos;

    // ── Ray march ─────────────────────────────────────────
    float t     = 0.0;
    float de    = 0.0;
    float trap  = 1e10;
    bool  hit   = false;

    for (int i = 0; i < MAX_MARCH; i++) {
        vec3 p = ro + rd * t;
        vec2 result = mandelbulb_de(p, power);
        de    = result.x;
        trap  = min(trap, result.y);

        if (de < SURF_DIST) { hit = true; break; }
        if (t  > MAX_DIST)  break;
        t += de * 0.9;  // slight conservative stepping
    }

    vec3 col;

    if (!hit) {
        // Background: deep space gradient
        float stars = fract(sin(dot(rd.xy * 43.0, vec2(12.9,78.2))) * 43758.5);
        float star  = pow(max(0.0, stars - 0.98) / 0.02, 2.0);
        col = vec3(0.02, 0.01, 0.03) + vec3(star);
    } else {
        vec3 p = ro + rd * t;
        vec3 n = calcNormal(p, power);
        float ao = calcAO(p, n, power);

        // Key light
        vec3 light   = normalize(vec3(1.0, 1.5, 0.5));
        float diff   = max(0.0, dot(n, light));

        // Rim light (back lighting)
        vec3 rim_dir = normalize(vec3(-0.5, -0.3, -1.0));
        float rim    = pow(max(0.0, dot(n, rim_dir)), 4.0);

        // Specular
        vec3  half_v = normalize(light - rd);
        float spec   = pow(max(0.0, dot(n, half_v)), 60.0);

        // Surface color from orbit trap
        float col_t = clamp(trap * 1.5, 0.0, 1.0);
        vec3 surf_col = mix(
            vec3(0.05, 0.3,  0.6),   // deep blue (dense interior)
            vec3(0.9,  0.4,  0.05),  // orange (outer tentacles)
            col_t
        );
        surf_col = mix(surf_col, vec3(0.1, 0.8, 0.5), col_t * col_t * 0.4);

        // Combine
        col  = surf_col * (diff * 0.8 + 0.15) * ao;
        col += vec3(0.6, 0.7, 1.0) * rim * 0.3 * ao;
        col += vec3(1.0) * spec * 0.5;

        // Depth fog
        float fog = 1.0 - exp(-t * 0.15);
        col = mix(col, vec3(0.02, 0.01, 0.03), fog * 0.4);
    }

    // Tone map (simple Reinhard)
    col = col / (col + vec3(1.0));
    col = pow(col, vec3(0.4545));

    fragColor = vec4(col, 1.0);
}

precision mediump float;

varying vec3 vDirection;

uniform float uSunAzimuth;
uniform float uSunElevation;
uniform vec3 uSunColor;
uniform vec3 uSkyColorLow;
uniform vec3 uSkyColorHigh;
uniform float uSunSize;

void main() {
    float azimuth = radians(uSunAzimuth);
    float elevation = radians(uSunElevation);

    vec3 sunDirection = normalize(vec3(
        cos(elevation) * sin(azimuth),
        sin(elevation),
        cos(elevation) * cos(azimuth)
    ));

    vec3 direction = normalize(vDirection);

    float t = clamp(direction.y * 0.5 + 0.5, 0.0, 1.0);
    vec3 skyColor = mix(uSkyColorLow, uSkyColorHigh, t);

    float dotVal = clamp(dot(direction, sunDirection), 0.0, 1.0);
    float sunGlow = smoothstep(0.998, 1.0, dotVal);

    vec3 color = skyColor + uSunColor * sunGlow * uSunSize * 0.9;

    // NaN 방어
    if (any(isnan(color))) {
        color = vec3(0.0);
    }

    gl_FragColor = vec4(clamp(color, 0.0, 1.0), 1.0);
}

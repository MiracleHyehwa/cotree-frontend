precision mediump float;

varying vec3 vPosition;

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

    vec3 direction = normalize(vPosition);

    float t = clamp(direction.y * 0.5 + 0.5, 0.0, 1.0);
    vec3 skyColor = mix(uSkyColorLow, uSkyColorHigh, t);

    float dotVal = clamp(dot(direction, sunDirection), 0.0, 1.0);

    // 부드러운 태양 디스크 (점광 느낌)
    float sunGlow = smoothstep(0.995, 1.0, dotVal);

    // sunSize로 영향력 조절 가능
    vec3 color = skyColor + uSunColor * sunGlow * uSunSize * 0.1;

    gl_FragColor = vec4(clamp(color, 0.0, 1.0), 1.0);
}

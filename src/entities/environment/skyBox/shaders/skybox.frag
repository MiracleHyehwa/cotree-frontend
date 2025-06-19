// skybox.frag
precision mediump float;

varying vec3 vPosition;

uniform float uSunAzimuth;      // 방위각 (0~360도)
uniform float uSunElevation;    // 고도각 (0~90도)
uniform vec3 uSunColor;
uniform vec3 uSkyColorLow;
uniform vec3 uSkyColorHigh;
uniform float uSunSize;         // 2.0 ~ 6.0 권장

void main() {
    // 방위각/고도각 → 라디안 변환
    float azimuth = radians(uSunAzimuth);
    float elevation = radians(uSunElevation);

    // 태양 방향 벡터 계산
    vec3 sunDirection = normalize(vec3(
        cos(elevation) * sin(azimuth),
        sin(elevation),
        cos(elevation) * cos(azimuth)
    ));

    // 현재 픽셀 방향 벡터
    vec3 direction = normalize(vPosition);

    // 하늘 색상 그라데이션 (지평선 기준)
    float t = clamp(direction.y * 0.5 + 0.5, 0.0, 1.0);
    vec3 skyColor = mix(uSkyColorLow, uSkyColorHigh, t);

    // 태양 디스크 연산
    float dotVal = clamp(dot(direction, sunDirection), 0.0, 1.0);
    float sunGlow = smoothstep(0.975, 1.0, dotVal); // 더 넓고 부드러운 glow

    // 색상 조합 (강도 조절 포함)
    vec3 color = skyColor + uSunColor * sunGlow * 1.0;

    // 혹시 모를 NaN 방지
    if (any(isnan(color))) {
        color = vec3(0.0);
    }

    gl_FragColor = vec4(clamp(color, 0.0, 1.0), 1.0);
}

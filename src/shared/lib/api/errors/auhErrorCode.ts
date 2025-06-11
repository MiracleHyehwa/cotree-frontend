export const AuthError = {
  AU000: {
    code: "AU000",
    devMessage: "로그인 실패: 사용자 정보 불일치 또는 인증 실패",
    message: "로그인에 실패했습니다.",
  },
  AU001: {
    code: "AU001",
    devMessage: "액세스 토큰 만료: 토큰 유효기간 초과",
    message: "로그인 세션이 만료되었습니다. 다시 로그인해주세요.",
  },
  AU002: {
    code: "AU002",
    devMessage: "유효하지 않은 액세스 토큰: 서명 오류 또는 위조 가능성",
    message: "인증 정보가 유효하지 않습니다.",
  },
  AU003: {
    code: "AU003",
    devMessage: "리프레시 토큰 오류: 토큰이 존재하지 않거나 무효화됨",
    message: "자동 로그인에 실패했습니다. 다시 로그인해주세요.",
  },
} as const;

export type AuthErrorCode = keyof typeof AuthError;

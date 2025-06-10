export const AuthError = {
  AU000: { code: "AU000", message: "로그인에 실패했습니다." },
  AU001: { code: "AU001", message: "액세스 토큰이 만료되었습니다." },
  AU002: { code: "AU002", message: "유효하지 않은 액세스 토큰입니다." },
  AU003: { code: "AU003", message: "리프레시 토큰 오류가 발생했습니다." },
} as const;

export type AuthErrorCode = keyof typeof AuthError;

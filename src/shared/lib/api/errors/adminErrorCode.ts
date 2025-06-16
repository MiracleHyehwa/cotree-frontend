export const AdminError = {
  AD001: {
    code: "AD001",
    devMessage: "지원하지 않는 range",
    message: "잘못된 요청입니다.",
  },
  AD002: {
    code: "AD002",
    devMessage: "로그인 실패 - 아이디 혹은 비밀번호 불일치",
    message: "아이디 또는 비밀번호가 올바르지 않습니다.",
  },
} as const;

export type AdminErrorCode = keyof typeof AdminError;

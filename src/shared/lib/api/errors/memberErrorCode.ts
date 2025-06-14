export const MemberError = {
  AU000: {
    code: "AU000",
    devMessage: "회원가입 실패",
    message: "회원가입에 실패했습니다.",
  },
  AU002: {
    code: "AU002",
    devMessage: "사용자 정보를 찾을 수 없음",
    message: "사용자 정보를 찾을 수 없습니다.",
  },
  AU004: {
    code: "AU004",
    devMessage: "회원 정보 업데이트 실패",
    message: "회원 정보 수정에 실패했습니다.",
  },
} as const;

export type MemberErrorCode = keyof typeof MemberError;

export const EnvironmentError = {
  TR001: {
    code: "TR001",
    devMessage: "트리를 찾을 수 없습니다.",
    message: "내 나무 정보를 찾을 수 없습니다.",
  },
  TR002: {
    code: "TR002",
    devMessage: "트리 생성 실패 - DB 저장 오류",
    message: "나무 생성에 실패했습니다.",
  },
  TR003: {
    code: "TR003",
    devMessage: "트리 경험치 업데이트 실패 - update 쿼리 실패",
    message: "경험치 업데이트에 실패했습니다.",
  },
  TR004: {
    code: "TR004",
    devMessage: "잘못된 경험치 값 - 음수 혹은 null",
    message: "잘못된 경험치 값입니다.",
  },
} as const;

export type EnvironmentErrorCode = keyof typeof EnvironmentError;

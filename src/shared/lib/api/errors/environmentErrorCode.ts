export const EnvironmentError = {
  TR001: {
    code: "TR001",
    devMessage: "트리를 찾을 수 없습니다.",
    message: "내 나무 정보를 찾을 수 없습니다.",
  },
  TR002: {
    code: "TR002",
    devMessage: "트리 경험치 업데이트 실패 - update 쿼리 실패",
    message: "경험치 업데이트에 실패했습니다.",
  },
  TR003: {
    code: "TR003",
    devMessage: "잘못된 경험치 값 - 음수 혹은 null",
    message: "잘못된 경험치 값입니다.",
  },
  TR004: {
    code: "TR004",
    devMessage: "잘못된 액션 - 존재하지 않는 명령",
    message: "유효하지 않은 요청입니다.",
  },
  TR005: {
    code: "TR005",
    devMessage: "트리 최대 경험치 도달",
    message: "더 이상 성장할 수 없습니다.",
  },
  TR006: {
    code: "TR006",
    devMessage: "로그인 하지 않은상태에서 내 기여도 오픈",
    message: "로그인이 필요합니다.",
  },
} as const;

export type EnvironmentErrorCode = keyof typeof EnvironmentError;

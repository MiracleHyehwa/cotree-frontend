import ky from "ky";
import { AdminApiError, AdminError, AdminErrorCode } from "./errors";

const ADMIN_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const adminApi = ky.create({
  prefixUrl: ADMIN_API_BASE_URL,
  retry: 0,
  hooks: {
    beforeRequest: [
      (request) => {
        const token = localStorage.getItem("token");
        if (token) {
          request.headers.set("Authorization", `Bearer ${token}`);
        }
      },
    ],
    afterResponse: [
      async (_request, _options, response) => {
        const cloned = response.clone();
        const data = await cloned.json().catch(() => null);
        const status = cloned.status;

        if (!response.ok && data.code) {
          const code = data.code as string;

          if (code in AdminError) {
            throw new AdminApiError(code as AdminErrorCode, status);
          }

          throw new Error("알 수 없는 에러가 발생했습니다.");
        }
      },
    ],
  },
});

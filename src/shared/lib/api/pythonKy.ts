import ky from "ky";
import { refreshAccessToken } from "./auth";
import { AuthApiError, AuthErrorCode } from "./errors";

function redirectToLogin() {
  window.location.href = "/login";
}

export const pythonApi = ky.create({
  prefixUrl: import.meta.env.VITE_PYTHON_API_BASE_URL,
  credentials: "include",
  retry: 0,

  hooks: {
    afterResponse: [
      async (request, options, response) => {
        const cloned = response.clone();
        const data = await cloned.json().catch(() => null);
        const status = cloned.status;

        if (!response.ok && data?.code) {
          const code = data.code as string;

          if (code === "AU001") {
            const success = await refreshAccessToken();

            if (success) {
              return ky(request, options);
            } else {
              redirectToLogin();
              throw new AuthApiError(code as AuthErrorCode, status);
            }
          }

          if (["AU000", "AU002", "AU003"].includes(code)) {
            redirectToLogin();
            throw new AuthApiError(code as AuthErrorCode, status);
          }
        }

        return response;
      },
    ],
  },
});

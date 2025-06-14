import ky from "ky";
import {
  AuthApiError,
  AuthErrorCode,
  CartApiError,
  CartError,
  CartErrorCode,
  EnvironmentApiError,
  EnvironmentError,
  EnvironmentErrorCode,
  GreenPointApiError,
  GreenPointError,
  GreenPointErrorCode,
  OrderApiError,
  OrderError,
  OrderErrorCode,
  MemberApiError,
  MemberError,
  MemberErrorCode,
  ValidationApiError,
  ValidationError,
  ValidationErrorCode,
} from "@/shared/lib/api/errors";
import { refreshAccessToken } from "@/shared/lib/api/auth";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function redirectToLogin() {
  window.location.href = "/login";
}

export const api = ky.create({
  prefixUrl: API_BASE_URL,
  credentials: "include",
  retry: 0,

  hooks: {
    afterResponse: [
      async (request, options, response) => {
        const cloned = response.clone();
        const data = await cloned.json().catch(() => null);
        const status = cloned.status;

        if (!response.ok && data.code) {
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

          if (code === "AU000" || code === "AU002" || code === "AU003") {
            redirectToLogin();
            throw new AuthApiError(code as AuthErrorCode, status);
          }

          if (code in CartError) {
            throw new CartApiError(code as CartErrorCode, status);
          }

          if (code in EnvironmentError) {
            throw new EnvironmentApiError(code as EnvironmentErrorCode, status);
          }

          if (code in GreenPointError) {
            throw new GreenPointApiError(code as GreenPointErrorCode, status);
          }

          if (code in OrderError) {
            throw new OrderApiError(code as OrderErrorCode, status);
          }

          if (code in MemberError) {
            throw new MemberApiError(code as MemberErrorCode, status);
          }
          if (code in ValidationError) {
            throw new ValidationApiError(code as ValidationErrorCode, status);
          }

          throw new Error("알 수 없는 에러가 발생했습니다.");
        }
      },
    ],
  },
});

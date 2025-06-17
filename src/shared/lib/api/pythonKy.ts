import ky from "ky";

export const pythonApi = ky.create({
  prefixUrl: import.meta.env.VITE_PYTHON_API_BASE_URL,
  retry: 0,
});

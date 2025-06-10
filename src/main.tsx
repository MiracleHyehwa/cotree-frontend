import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "@/shared/components/ui/sonner.tsx";
import { QueryCache, QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./index.css";
import App from "./App.tsx";
import { BaseApiError } from "./shared/lib/api/errors/baseApiError.ts";
import { toast } from "sonner";

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error: unknown, query) => {
      if (!(error instanceof BaseApiError)) return;
      const mode = query.meta?.displayMode;

      switch (mode) {
        case "toast":
          toast.error(error.message);
          return;
        case "fallback":
        default:
          return;
      }
    },
  }),
  defaultOptions: {
    queries: {
      throwOnError: true,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
      <Toaster />
    </>
  </StrictMode>
);

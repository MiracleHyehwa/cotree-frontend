import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "@/shared/components/ui/sonner.tsx";
import { MutationCache, QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./index.css";
import App from "./App.tsx";
import { BaseApiError } from "./shared/lib/api/errors/baseApiError.ts";
import { toast } from "sonner";

const queryClient = new QueryClient({
  mutationCache: new MutationCache({
    onError: (error, _variables, _context, mutation) => {
      if (error instanceof BaseApiError) {
        const mode = mutation.meta?.displayMode;
        if (mode === "toast") {
          toast.error(error.message);
        }
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

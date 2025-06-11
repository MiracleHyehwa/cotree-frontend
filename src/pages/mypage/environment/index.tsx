import { EnvironmentLayout } from "@/shared/layout";
import { ErrorFallback } from "@/shared/components";
import { ErrorBoundary } from "react-error-boundary";
import EnvironmentView from "./environmentView";

export default function EnvironmentPage() {
  return (
    <EnvironmentLayout>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <EnvironmentView />
      </ErrorBoundary>
    </EnvironmentLayout>
  );
}

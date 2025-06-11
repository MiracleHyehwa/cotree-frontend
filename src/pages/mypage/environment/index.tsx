import { Suspense } from "react";
import { useMyTree } from "@/entities/environment/api/hooks";
import { EnvironmentProvider } from "@/features/environment/context";
import { EnvironmentCanvas } from "@/features/environment/ui";
import { TreeActionBar } from "@/features/environment/ui/treeActionBar";
import { EnvironmentLayout } from "@/shared/layout";
import { useEnvironmentContext } from "@/features/environment/hooks";
import { ErrorFallback } from "@/shared/components";
import { ErrorBoundary } from "react-error-boundary";
import LoadingOverlay from "@/features/environment/ui/loadingOverlay";

function EnvironmentContainer() {
  const {
    data: { exp },
  } = useMyTree();

  return (
    <EnvironmentProvider initialExp={exp}>
      <CanvasWithUI />
    </EnvironmentProvider>
  );
}

function CanvasWithUI() {
  const { isReady } = useEnvironmentContext();

  return (
    <>
      <EnvironmentCanvas />
      {isReady && (
        <TreeActionBar>
          {({ visible }) => (
            <>
              <TreeActionBar.Level />
              <TreeActionBar.Progress />
              <TreeActionBar.Buttons visible={visible}>
                <TreeActionBar.GiveWater />
              </TreeActionBar.Buttons>
            </>
          )}
        </TreeActionBar>
      )}
      <LoadingOverlay>
        <LoadingOverlay.WhenLoading>
          <LoadingOverlay.Loading />
        </LoadingOverlay.WhenLoading>
      </LoadingOverlay>
    </>
  );
}

export default function EnvironmentPage() {
  return (
    <EnvironmentLayout>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense
          fallback={
            <LoadingOverlay>
              <div className="w-full max-w-limit mx-auto fixed inset-0 z-50 bg-background/30 backdrop-blur-xs flex items-center justify-center transition-opacity duration-700">
                <LoadingOverlay.Loading />
              </div>
            </LoadingOverlay>
          }
        >
          <EnvironmentContainer />
        </Suspense>
      </ErrorBoundary>
    </EnvironmentLayout>
  );
}

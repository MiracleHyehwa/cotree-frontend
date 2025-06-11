import { useMyTree } from "@/entities/environment/api/hooks";
import { EnvironmentProvider } from "@/features/environment/context";
import { EnvironmentCanvas } from "@/features/environment/ui";
import { TreeActionBar } from "@/features/environment/ui/treeActionBar";
import { EnvironmentLayout } from "@/shared/layout";
import LoadingOverlay from "@/features/environment/ui/loadingOverlay";

export default function EnvironmentView() {
  const { data, isLoading } = useMyTree();

  console.log(data);
  if (isLoading || !data) {
    return (
      <EnvironmentLayout>
        <LoadingOverlay>
          <div className="w-full max-w-limit mx-auto fixed inset-0 z-50 bg-background/30 backdrop-blur-xs flex items-center justify-center transition-opacity duration-700">
            <LoadingOverlay.Loading />
          </div>
        </LoadingOverlay>
      </EnvironmentLayout>
    );
  }

  return (
    <EnvironmentProvider initialExp={data.exp} initialRemainingWaterUnit={data.remainingWaterUnit}>
      <EnvironmentCanvas />

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

      <LoadingOverlay>
        <LoadingOverlay.WhenLoading>
          <LoadingOverlay.Loading />
        </LoadingOverlay.WhenLoading>
      </LoadingOverlay>
    </EnvironmentProvider>
  );
}

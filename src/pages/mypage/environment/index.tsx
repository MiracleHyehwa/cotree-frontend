import { EnvironmentProvider } from "@/features/environment/context";
import { EnvironmentCanvas, LoadingOverlay } from "@/features/environment/ui";
import { TreeActionBar } from "@/features/environment/ui/treeActionBar";
import { EnvironmentLayout } from "@/shared/layout/";

export default function EnvironmentPage() {
  const exp = 0;

  return (
    <EnvironmentProvider initialExp={exp}>
      <EnvironmentLayout>
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
      </EnvironmentLayout>
    </EnvironmentProvider>
  );
}

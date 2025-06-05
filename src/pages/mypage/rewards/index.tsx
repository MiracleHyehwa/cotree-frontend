import { RewardOverlayProvider } from "@/features/rewardOverlay/context";
import { RewardCardSelector, RewardOverlay } from "@/features/rewardOverlay/ui";
import { OnlyHeaderBackLayout } from "@/shared/layout";

export default function RewardHistoryPage() {
  return (
    <OnlyHeaderBackLayout title="리워드">
      <RewardOverlayProvider>
        <RewardCardSelector />
        <RewardOverlay>
          <RewardOverlay.CardStack />
          <RewardOverlay.AutoCardAnimation />
          <RewardOverlay.Close />
        </RewardOverlay>
      </RewardOverlayProvider>
    </OnlyHeaderBackLayout>
  );
}

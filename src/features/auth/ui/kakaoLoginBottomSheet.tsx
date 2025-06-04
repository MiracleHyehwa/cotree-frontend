import { Button } from "@/shared/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/shared/components/ui/drawer";

interface KakaoLoginBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
}

export default function KakaoLoginBottomSheet({ isOpen, onClose, onLogin }: KakaoLoginBottomSheetProps) {
  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent className="w-full max-w-limit mx-auto bg-background z-50" tabIndex={-1}>
        <DrawerHeader>
          <DrawerTitle className="text-xl text-foreground">로그인</DrawerTitle>
          <DrawerDescription className="text-sm text-muted-foreground">
            로그인하여 더 많은 기능을 이용해보세요.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <div className="flex flex-col gap-4 p-4">
            <Button
              className="relative w-full flex items-center justify-center p-4 border border-transparent text-base font-bold rounded-md text-black bg-[#FEE500] hover:bg-[#FEE500]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FEE500]"
              size="lg"
              onClick={onLogin}
            >
              <img src="/kakao-icon.svg" alt="카카오 로고" className="w-5 h-5 mr-2" width={20} height={20} />
              카카오로 로그인하기
            </Button>
            <Button className="w-full px-4 py-3 text-gray-900 bg-gray-100 rounded-md hover:bg-gray-200" size="lg">
              게스트 계정으로 로그인하기
            </Button>
            <Button
              className="w-full px-4 py-3 text-gray-900 bg-gray-100 rounded-md hover:bg-gray-200"
              size="lg"
              onClick={onClose}
            >
              나중에 하기
            </Button>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

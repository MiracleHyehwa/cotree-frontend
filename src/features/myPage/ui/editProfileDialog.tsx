import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/shared/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/shared/components/ui/drawer";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/ui/avatar";
import { Camera } from "lucide-react";
import { useIsCompact } from "../hooks";
import { cn } from "@/shared/lib/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { editProfileSchema, EditProfileFormValues } from "../model/schema";
import { useRef, useState } from "react";
import { useUpdateProfile } from "@/entities/member/api/hooks";
import { ageOptions, genderOptions } from "@/shared/constants";
import { SpinnerIcon } from "@/shared/components/ui/spinner";
import { useQueryClient } from "@tanstack/react-query";
import { memberKeys } from "@/entities/member/api/queryOptions";

interface EditProfileDialogProps {
  open: boolean;
  setOpen: (v: boolean) => void;
  defaultValues: EditProfileFormValues;
}

export default function EditProfileDialog({ open, setOpen, defaultValues }: EditProfileDialogProps) {
  const queryClient = useQueryClient();
  const isCompact = useIsCompact();
  const { mutate: updateProfile, isPending } = useUpdateProfile();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { isValid },
  } = useForm<EditProfileFormValues>({
    resolver: zodResolver(editProfileSchema),
    defaultValues,
    mode: "onChange",
  });

  const profileImage = watch("profileImage");
  const gender = watch("gender");
  const age = watch("age");
  const name = watch("name");

  const [imageFile, setImageFile] = useState<File | null>(null);
  const initialImage = useRef(defaultValues.profileImage);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("profileImage", URL.createObjectURL(file), { shouldValidate: true });
      setImageFile(file);
    }
  };

  const isUnchanged = () => {
    return (
      name === defaultValues.name &&
      gender === defaultValues.gender &&
      age === defaultValues.age &&
      (imageFile === null || profileImage === initialImage.current)
    );
  };

  const onSubmit = async (data: EditProfileFormValues) => {
    if (isUnchanged()) {
      setOpen(false);
      return;
    }

    const formData = new FormData();
    formData.append("nickname", data.name);
    formData.append("gender", data.gender);
    formData.append("ageRange", data.age);
    if (imageFile instanceof File) {
      formData.append("profileImage", imageFile);
    }

    updateProfile(formData, {
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: memberKeys.getMemberDashboard(),
        });
        setOpen(false);
      },
    });
  };

  const Form = (
    <form
      id="edit-profile-form"
      onSubmit={handleSubmit(onSubmit)}
      className="flex-1 overflow-y-auto grid gap-6 w-full max-w-limit mx-auto"
    >
      <div className="flex justify-center">
        <div className="relative w-24 h-24 mb-2">
          <Avatar className="w-24 h-24">
            <AvatarImage src={profileImage || "/placeholder.png"} alt="프로필 이미지" />
            <AvatarFallback>프로필</AvatarFallback>
          </Avatar>
          <Label
            htmlFor="profileImage"
            className="absolute bottom-0 right-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center cursor-pointer shadow"
          >
            <Input type="file" accept="image/*" id="profileImage" onChange={handleImageChange} className="hidden" />
            <Camera className="w-4 h-4 text-primary-foreground" />
          </Label>
        </div>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="name">이름</Label>
        <Input id="name" placeholder="홍길동" {...register("name")} />
      </div>

      <div className="space-y-2">
        <Label>성별</Label>
        <div className="grid grid-cols-2 gap-3">
          {genderOptions.map(({ value, label }) => (
            <Button
              key={value}
              type="button"
              variant="outline"
              onClick={() => setValue("gender", value, { shouldValidate: true })}
              className={cn("cursor-pointer h-10", gender === value && "border-primary text-primary")}
            >
              {label}
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label>연령대</Label>
        <div className="grid grid-cols-3 gap-3">
          {ageOptions.map(({ value, label }) => (
            <Button
              key={value}
              type="button"
              variant="outline"
              onClick={() => setValue("age", value, { shouldValidate: true })}
              className={cn("cursor-pointer h-10", age === value && "border-primary text-primary")}
            >
              {label}
            </Button>
          ))}
        </div>
      </div>
    </form>
  );

  if (isCompact) {
    return (
      <Drawer
        open={open}
        onOpenChange={(v) => {
          if (!isPending) setOpen(v);
        }}
      >
        <DrawerContent className="flex flex-col max-h-[100dvh]">
          <DrawerHeader>
            <DrawerTitle>회원정보 수정</DrawerTitle>
            <DrawerDescription className="sr-only">기본 정보를 수정할 수 있어요.</DrawerDescription>
          </DrawerHeader>
          <div className="flex-1 overflow-y-auto px-4 pb-4">{Form}</div>
          <DrawerFooter className="pt-2 flex gap-2">
            <Button type="submit" form="edit-profile-form" disabled={!isValid || isPending} className="flex-1">
              {isPending ? <SpinnerIcon className="border-muted border-t-primary" /> : "저장하기"}
            </Button>
            <DrawerClose asChild>
              <Button type="button" variant="outline" className="flex-1">
                취소
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        if (!isPending) setOpen(v);
      }}
    >
      <DialogContent className="w-full !max-w-[425px] mx-auto">
        <DialogHeader>
          <DialogTitle>회원정보 수정</DialogTitle>
          <DialogDescription className="sr-only">기본 정보를 수정할 수 있어요.</DialogDescription>
        </DialogHeader>
        {Form}
        <Button type="submit" form="edit-profile-form" disabled={!isValid || isPending} className="w-full mt-6">
          {isPending ? <SpinnerIcon className="border-muted border-t-primary" /> : "저장하기"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}

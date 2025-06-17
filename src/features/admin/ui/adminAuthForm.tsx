import { useAdminLogin } from "@/entities/admin/api/hooks";
import { AdminLoginFormValues, adminLoginSchema } from "@/entities/admin/model/schema";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { SpinnerIcon } from "@/shared/components/ui/spinner";
import { cn } from "@/shared/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function AdminAuthForm() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AdminLoginFormValues>({
    resolver: zodResolver(adminLoginSchema),
  });

  const { mutateAsync: login } = useAdminLogin();

  const onSubmit = async (form: AdminLoginFormValues) => {
    const { token } = await login(form);
    localStorage.setItem("token", token);
    navigate("/admin/dashboard");
  };

  return (
    <div className={cn("grid gap-6")}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4">
          <div className="grid gap-1">
            <Label htmlFor="loginId">아이디</Label>
            <Input
              id="loginId"
              placeholder="admin"
              {...register("loginId")}
              disabled={isSubmitting}
              autoComplete="current-password"
            />
            {errors.loginId && <p className="text-sm text-destructive">{errors.loginId.message}</p>}
          </div>

          <div className="grid gap-1">
            <Label htmlFor="password">비밀번호</Label>
            <Input
              id="password"
              type="password"
              placeholder="비밀번호"
              autoComplete="username"
              {...register("password")}
              disabled={isSubmitting}
            />
            {errors.password && <p className="text-sm text-destructive">{errors.password.message}</p>}
          </div>

          <Button type="submit" disabled={isSubmitting} className="cursor-pointer">
            {isSubmitting && <SpinnerIcon />}
            로그인
          </Button>
        </div>
      </form>
    </div>
  );
}

import { z } from "zod";

export const adminLoginSchema = z.object({
  loginId: z.string().min(1, { message: "아이디를 입력하세요" }),
  password: z.string().min(1, { message: "비밀번호를 입력하세요" }),
});

export type AdminLoginFormValues = z.infer<typeof adminLoginSchema>;

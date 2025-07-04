import * as z from "zod";

export const editProfileSchema = z.object({
  name: z.string().min(1, "이름은 필수입니다."),
  gender: z.enum(["M", "F"], { required_error: "성별을 선택해주세요." }),
  age: z.enum(["10s", "20s", "30s", "40s", "50s", "60s"], { required_error: "연령대를 선택해주세요." }),
  profileImage: z.string().nullable().optional(),
});

export type EditProfileFormValues = z.infer<typeof editProfileSchema>;

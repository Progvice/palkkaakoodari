import {z} from "zod";
import type { TFunction } from "../context/lang.context";

export const registerSchema = (t: TFunction) => {
  return z.object({
    email: z.email(t("invalidEmail")),
    password:
      z.string()
        .min(12, t('passwordMinLength', [12]))
        .refine((val) => /[A->]/.test(val), {error: t('passwordCapitalLetter')})
        .refine((val) => /[a-z]/.test(val), {error: t('passwordLowercaseLetter')})
        .refine((val) => /[0-9]/.test(val), {error: t('passwordNumber')})
        .refine((val) => /[^A-Za-z0-9]/.test(val), {error: t('passwordSpecialCharacter')}),

    confirmPassword: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    companyName: z.string(),
    businessId: z.string().refine((val) => /^[0-9]{7}-[0-9]$/.test(val), {error: t('businessIdInvalid')})
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message:
  })
}

export type RegisterFormSchema = ReturnType<typeof registerSchema>;

export type RegisterFormData = z.infer<RegisterFormSchema>

import { z } from "zod";
import type { TFunction } from "i18next";

export function createPatientFormSchema(t: TFunction) {
  return z.object({
    fullName: z.string().min(2, t("validation.fullNameMin")),
    department: z.string().min(1, t("validation.departmentRequired")),
    appointmentDate: z.string().min(1, t("validation.appointmentDateRequired")),
    priority: z.string().min(1, t("validation.priorityRequired")),
    bloodType: z.string().min(1, t("validation.bloodTypeRequired")),
  });
}

export type PatientFormValues = z.infer<
  ReturnType<typeof createPatientFormSchema>
>;
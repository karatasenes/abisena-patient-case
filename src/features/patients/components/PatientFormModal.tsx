import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import type { PatientRecord } from "../types/patient.types";
import { DEPARTMENTS } from "../constants/departments";
import { PRIORITIES } from "../constants/priorities";
import {
  createPatientFormSchema,
  type PatientFormValues,
} from "../schemas/patientForm.schema";
import { BLOOD_TYPES } from "../constants/bloodTypes";

type PatientFormModalProps = {
  patient?: PatientRecord | null;
  onClose: () => void;
  onSubmit: (patient: PatientRecord) => void;
};

export function PatientFormModal({
  patient,
  onClose,
  onSubmit,
}: PatientFormModalProps) {
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PatientFormValues>({
    resolver: zodResolver(createPatientFormSchema(t)),
    defaultValues: {
      fullName: patient?.fullName ?? "",
      department: patient?.department ?? DEPARTMENTS[0],
      appointmentDate: patient?.appointmentDate?.split("T")[0] ?? "",
      priority: patient?.priority ?? PRIORITIES[1],
      bloodType: patient?.bloodType ?? BLOOD_TYPES[0]
    },
  });

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  function handleFormSubmit(values: PatientFormValues) {
    const nextPatient: PatientRecord = {
      ...(patient ?? {}),
      id: patient?.id ?? "",
      fullName: values.fullName,
      department: values.department,
      appointmentDate: values.appointmentDate,
      priority: values.priority,
      birthDate: patient?.birthDate ?? "",
      createdAt: patient?.createdAt ?? new Date().toISOString(),
      status: patient?.status ?? "waiting",
      bloodType: values.bloodType,
      score: patient?.score ?? 0,
      note_tr: patient?.note_tr ?? "",
      note_en: patient?.note_en ?? "",
      diagnosis_tr: patient?.diagnosis_tr ?? "",
      diagnosis_en: patient?.diagnosis_en ?? "",
      isInsured: patient?.isInsured ?? false,
      isFollowUp: patient?.isFollowUp ?? false,
      isVaccinated: patient?.isVaccinated ?? false,
      tags: patient?.tags ?? [],
      notes: patient?.notes ?? "",
    };

    onSubmit(nextPatient);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 px-4"
      onMouseDown={onClose}
    >
      <div
        className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900">
            {patient ? t("patients.edit") : t("patients.add")}
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-2 py-1 text-slate-500 hover:bg-slate-100 hover:text-slate-700"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              {t("patients.fullName")}
            </label>
            <input
              type="text"
              {...register("fullName")}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500"
            />
            {errors.fullName && (
              <p className="mt-1 text-sm text-red-600">
                {errors.fullName.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              {t("patients.department")}
            </label>
            <select
              {...register("department")}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500"
            >
              {DEPARTMENTS.map((department) => (
                <option
                  key={department}
                  value={department}
                >
                  {t(
                    `departments.${department}`,
                    department
                  )}
                </option>
              ))}
            </select>
            {errors.department && (
              <p className="mt-1 text-sm text-red-600">
                {errors.department.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              {t("patients.appointmentDate")}
            </label>
            <input
              type="date"
              {...register("appointmentDate")}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500"
            />
            {errors.appointmentDate && (
              <p className="mt-1 text-sm text-red-600">
                {errors.appointmentDate.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              {t("patients.priority")}
            </label>
            <select
              {...register("priority")}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500"
            >
              {PRIORITIES.map((priority) => (
                <option key={priority} value={priority}>
                  {t(`patients.priorityValues.${priority}`)}
                </option>
              ))}
            </select>
            {errors.priority && (
              <p className="mt-1 text-sm text-red-600">
                {errors.priority.message}
              </p>
            )}
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              {t("patients.bloodType")}
            </label>

            <select
              {...register("bloodType")}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500"
            >
              {BLOOD_TYPES.map((bloodType) => (
                <option key={bloodType} value={bloodType}>
                  {bloodType}
                </option>
              ))}
            </select>

            {errors.bloodType && (
              <p className="mt-1 text-sm text-red-600">
                {errors.bloodType.message}
              </p>
            )}
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-slate-300 px-4 py-2 font-medium text-slate-700 hover:bg-slate-50"
            >
              {t("patients.cancel")}
            </button>

            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
            >
              {patient ? t("patients.update") : t("patients.save")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
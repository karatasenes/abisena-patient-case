import { useTranslation } from "react-i18next";
import {
  PatientFilters,
  type PatientFiltersProps,
} from "./PatientFilters";

type PatientsToolbarProps = PatientFiltersProps & {
  onAddPatient: () => void;
};

export function PatientsToolbar({
  onAddPatient,
  ...filterProps
}: PatientsToolbarProps) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-4 rounded-2xl bg-white p-6 shadow-sm lg:flex-row lg:items-center lg:justify-between">
      <button
        type="button"
        onClick={onAddPatient}
        className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700"
      >
        {t("patients.add")}
      </button>

      <PatientFilters {...filterProps} />
    </div>
  );
}
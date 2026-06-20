import { useTranslation } from "react-i18next";
import { DEPARTMENTS } from "../constants/departments";

export type PatientFiltersProps = {
  search: string;
  department: string;
  sortBy: string;
  onSearchChange: (value: string) => void;
  onDepartmentChange: (value: string) => void;
  onSortByChange: (value: string) => void;
};

export function PatientFilters({
  search,
  department,
  sortBy,
  onSearchChange,
  onDepartmentChange,
  onSortByChange,
}: PatientFiltersProps) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-3 lg:flex-row">
      <input
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder={t("patients.search")}
        className="rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500"
      />

      <select
        value={department}
        onChange={(e) => onDepartmentChange(e.target.value)}
        className="rounded-lg border border-slate-300 px-3 py-2"
      >
        <option value="">
          {t("patients.allDepartments")}
        </option>

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

      <select
        value={sortBy}
        onChange={(e) => onSortByChange(e.target.value)}
        className="rounded-lg border border-slate-300 px-3 py-2"
      >
        <option value="createdAt-desc">
          {t("patients.sort.newest")}
        </option>

        <option value="appointmentDate-asc">
          {t("patients.sort.appointment")}
        </option>

        <option value="score-desc">
          {t("patients.sort.score")}
        </option>
      </select>
    </div>
  );
}
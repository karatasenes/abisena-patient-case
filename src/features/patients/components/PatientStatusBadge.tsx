import { useTranslation } from "react-i18next";

type PatientStatusBadgeProps = {
  status: string;
};

export function PatientStatusBadge({ status }: PatientStatusBadgeProps) {
  const { t } = useTranslation();

  const className =
    status === "Tamamlandı"
      ? "bg-green-100 text-green-700"
      : status === "İptal"
        ? "bg-red-100 text-red-700"
        : status === "Muayenede"
          ? "bg-blue-100 text-blue-700"
          : "bg-yellow-100 text-yellow-700";

  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${className}`}
    >
      {t(`patients.statusValues.${status}`, {
        defaultValue: status,
      })}
    </span>
  );
}
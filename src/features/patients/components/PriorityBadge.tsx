import { useTranslation } from "react-i18next";

type PriorityBadgeProps = {
  priority: string;
};

export function PriorityBadge({ priority }: PriorityBadgeProps) {
  const { t } = useTranslation();

  const className =
    priority === "acil"
      ? "bg-red-100 text-red-700"
      : "bg-green-100 text-green-700";

  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${className}`}
    >
      {t(`patients.priorityValues.${priority}`, {
        defaultValue: priority,
      })}
    </span>
  );
}
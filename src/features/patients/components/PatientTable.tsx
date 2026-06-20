import { useTranslation } from "react-i18next";
import type { PatientRecord } from "../types/patient.types";
import { PatientStatusBadge } from "./PatientStatusBadge";
import { PriorityBadge } from "./PriorityBadge";
import { formatDate } from "../../../shared/utils/date.utils";
import { Pencil, Trash2 } from "lucide-react";
type PatientTableProps = {
    patients: PatientRecord[];
    onDeletePatient: (id: PatientRecord["id"]) => void;
    onEditPatient: (patient: PatientRecord) => void;
};

export function PatientTable({
    patients,
    onDeletePatient,
    onEditPatient,
}: PatientTableProps) {
    const { t } = useTranslation();

    return (
        <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200">
                    <thead className="bg-slate-50">
                        <tr>
                            <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-500">
                                {t("patients.fullName")}
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-500">
                                {t("patients.department")}
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-500">
                                {t("patients.appointmentDate")}
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-500">
                                {t("patients.status")}
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-500">
                                {t("patients.priority")}
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-500">
                                {t("patients.bloodType")}
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-500">
                                {t("patients.score")}
                            </th>
                            <th className="px-4 py-3 text-right text-xs font-semibold uppercase text-slate-500">
                                {t("patients.actions")}
                            </th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-100 bg-white">
                        {patients.map((patient) => (
                            <tr key={patient.id} className="hover:bg-slate-50">
                                <td className="px-4 py-4 text-sm font-medium text-slate-900">
                                    {patient.fullName}
                                </td>
                                <td className="px-4 py-4 text-sm text-slate-600">
                                    {t(
                                        `departments.${patient.department}`,
                                        patient.department
                                    )}
                                </td>
                                <td className="px-4 py-4 text-sm text-slate-600">
                                    {formatDate(patient.appointmentDate)}
                                </td>
                                <td className="px-4 py-4 text-sm text-slate-600">
                                    <PatientStatusBadge status={patient.status} />
                                </td>
                                <td className="px-4 py-4 text-sm text-slate-600">
                                    <PriorityBadge priority={patient.priority} />
                                </td>
                                <td className="px-4 py-4 text-sm text-slate-600">
                                    {patient.bloodType}
                                </td>
                                <td className="px-4 py-4 text-sm text-slate-600">
                                    {patient.score}
                                </td>
                                <td className="whitespace-nowrap px-4 py-4 text-right text-sm">
                                    <div className="flex items-center justify-end gap-2">
                                        <button
                                            type="button"
                                            onClick={() => onEditPatient(patient)}
                                            className="rounded-lg bg-blue-50 p-2 text-blue-600 transition hover:bg-blue-100"
                                            title={t("patients.edit")}
                                        >
                                            <Pencil size={16} />
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => onDeletePatient(patient.id)}
                                            className="rounded-lg bg-red-50 p-2 text-red-600 transition hover:bg-red-100"
                                            title={t("patients.delete")}
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
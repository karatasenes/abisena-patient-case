import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { EmptyState } from "../../../shared/components/EmptyState";
import { ErrorState } from "../../../shared/components/ErrorState";
import { LanguageSwitcher } from "../../../shared/components/LanguageSwitcher";
import { LoadingState } from "../../../shared/components/LoadingState";
import { PatientFormModal } from "../components/PatientFormModal";
import { PatientTable } from "../components/PatientTable";
import { PatientsToolbar } from "../components/PatientsToolbar";
import { usePatients } from "../hooks/usePatients";
import type { PatientRecord } from "../types/patient.types";
import { getFilteredPatients } from "../utils/patientList.utils";
import toast from "react-hot-toast";
export function PatientsPage() {
  const { t } = useTranslation();
  const PAGE_SIZE = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const { patients, isLoading, error, savePatient, deletePatient } =
    usePatients(t);

  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("");
  const [sortBy, setSortBy] = useState("createdAt-desc");

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] =
    useState<PatientRecord | null>(null);

  const filteredPatients = useMemo(
    () =>
      getFilteredPatients({
        patients,
        search,
        department,
        sortBy,
      }),
    [patients, search, department, sortBy]
  );

  const totalPages = Math.ceil(filteredPatients.length / PAGE_SIZE);

  const paginatedPatients = filteredPatients.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );
  function handleOpenAddModal() {
    setSelectedPatient(null);
    setIsFormOpen(true);
  }

  function handleEditPatient(patient: PatientRecord) {
    setSelectedPatient(patient);
    setIsFormOpen(true);
  }

  function handleSavePatient(patient: PatientRecord) {
    const isEdit = Boolean(selectedPatient);

    savePatient(patient, selectedPatient);

    toast.success(
      isEdit
        ? t("patients.notifications.updated")
        : t("patients.notifications.created")
    );

    setSelectedPatient(null);
    setIsFormOpen(false);
  }

  function handleDeletePatient(id: PatientRecord["id"]) {
    const confirmed = window.confirm(t("patients.confirmDelete"));

    if (!confirmed) return;

    deletePatient(id);
    toast.success(t("patients.notifications.deleted"));
  }

  function handleCloseForm() {
    setSelectedPatient(null);
    setIsFormOpen(false);
  }
  useEffect(() => {
    setCurrentPage(1);
  }, [search, department, sortBy]);
  if (isLoading) {
    return <LoadingState message={t("common.loading")} />;
  }

  if (error) {
    return <ErrorState message={error} />;
  }



  return (
    <main className="min-h-screen bg-slate-100 px-6 py-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <header className="flex items-start justify-between gap-4 rounded-2xl bg-white p-6 shadow-sm">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              {t("patients.title")}
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              {t("patients.subtitle")}
            </p>

            <p className="mt-3 text-sm font-medium text-slate-700">
              {t("patients.shownCount", {
                count: filteredPatients.length,
              })}
            </p>
          </div>

          <LanguageSwitcher />
        </header>

        <PatientsToolbar
          search={search}
          department={department}
          sortBy={sortBy}
          onSearchChange={setSearch}
          onDepartmentChange={setDepartment}
          onSortByChange={setSortBy}
          onAddPatient={handleOpenAddModal}
        />

        {filteredPatients.length > 0 ? (
          <>
            <PatientTable
              patients={paginatedPatients}
              onEditPatient={handleEditPatient}
              onDeletePatient={handleDeletePatient}
            />

            <div className="flex items-center justify-between rounded-2xl bg-white p-4 shadow-sm">
              <button
                type="button"
                onClick={() =>
                  setCurrentPage((page) => Math.max(page - 1, 1))
                }
                disabled={currentPage === 1}
                className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {t("pagination.previous")}
              </button>

              <span className="text-sm font-medium text-slate-600">
                {t("pagination.pageInfo", {
                  current: currentPage,
                  total: totalPages,
                })}
              </span>

              <button
                type="button"
                onClick={() =>
                  setCurrentPage((page) =>
                    Math.min(page + 1, totalPages)
                  )
                }
                disabled={currentPage === totalPages}
                className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {t("pagination.next")}
              </button>
            </div>
          </>
        ) : (
          <EmptyState message={t("patients.empty")} />
        )}

        {isFormOpen && (
          <PatientFormModal
            patient={selectedPatient}
            onClose={handleCloseForm}
            onSubmit={handleSavePatient}
          />
        )}
      </div>
    </main>
  );
}
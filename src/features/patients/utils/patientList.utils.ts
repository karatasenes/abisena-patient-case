import type { PatientRecord } from "../types/patient.types";

type GetFilteredPatientsParams = {
  patients: PatientRecord[];
  search: string;
  department: string;
  sortBy: string;
};

export function getFilteredPatients({
  patients,
  search,
  department,
  sortBy,
}: GetFilteredPatientsParams) {
  return patients
    .filter((patient) => {
      const searchValue = search.toLowerCase();

      const matchesSearch =
        patient.fullName.toLowerCase().includes(searchValue) ||
        patient.department.toLowerCase().includes(searchValue) ||
        patient.status.toLowerCase().includes(searchValue);

      const matchesDepartment = department
        ? patient.department === department
        : true;

      return matchesSearch && matchesDepartment;
    })
    .sort((a, b) => {
      if (sortBy === "createdAt-desc") {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }

      if (sortBy === "appointmentDate-asc") {
        return (
          new Date(a.appointmentDate).getTime() -
          new Date(b.appointmentDate).getTime()
        );
      }

      if (sortBy === "score-desc") {
        return b.score - a.score;
      }

      return 0;
    });
}
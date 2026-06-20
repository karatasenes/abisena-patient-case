import type { PatientRecord } from "../types/patient.types";

export function generatePatientId(patients: PatientRecord[]) {
  const maxNumber = patients.reduce((max, patient) => {
    if (typeof patient.id !== "string") return max;

    const match = patient.id.match(/^pat-(\d+)$/);
    if (!match) return max;

    return Math.max(max, Number(match[1]));
  }, 0);

  return `pat-${String(maxNumber + 1).padStart(3, "0")}`;
}
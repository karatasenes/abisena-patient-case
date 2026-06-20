import { useEffect, useState } from "react";
import type { TFunction } from "i18next";

import { getPatients } from "../services/patientApi";
import type { PatientRecord } from "../types/patient.types";
import { generatePatientId } from "../utils/patientId.utils";

const PATIENTS_CHANGES_STORAGE_KEY = "patients-local-changes";

type PatientLocalChanges = {
  created: PatientRecord[];
  updated: PatientRecord[];
  deletedIds: PatientRecord["id"][];
};

const initialChanges: PatientLocalChanges = {
  created: [],
  updated: [],
  deletedIds: [],
};

function getStoredChanges(): PatientLocalChanges {
  const storedChanges = localStorage.getItem(PATIENTS_CHANGES_STORAGE_KEY);

  if (!storedChanges) {
    return initialChanges;
  }

  try {
    return JSON.parse(storedChanges) as PatientLocalChanges;
  } catch {
    return initialChanges;
  }
}

function saveStoredChanges(changes: PatientLocalChanges) {
  localStorage.setItem(
    PATIENTS_CHANGES_STORAGE_KEY,
    JSON.stringify(changes)
  );
}

function applyLocalChanges(
  apiPatients: PatientRecord[],
  changes: PatientLocalChanges
): PatientRecord[] {
  const filteredApiPatients = apiPatients.filter(
    (patient) => !changes.deletedIds.includes(patient.id)
  );

  const updatedApiPatients = filteredApiPatients.map((patient) => {
    const updatedPatient = changes.updated.find(
      (item) => item.id === patient.id
    );

    return updatedPatient ?? patient;
  });

  return [...changes.created, ...updatedApiPatients];
}

export function usePatients(t: TFunction) {
  const [apiPatients, setApiPatients] = useState<PatientRecord[]>([]);
  const [patients, setPatients] = useState<PatientRecord[]>([]);
  const [changes, setChanges] = useState<PatientLocalChanges>(initialChanges);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  function updateChanges(nextChanges: PatientLocalChanges) {
    setChanges(nextChanges);
    saveStoredChanges(nextChanges);

    const nextPatients = applyLocalChanges(apiPatients, nextChanges);
    setPatients(nextPatients);
  }

  useEffect(() => {
    async function fetchPatients() {
      try {
        setIsLoading(true);

        const storedChanges = getStoredChanges();
        const data = await getPatients();

        setApiPatients(data);
        setChanges(storedChanges);
        setPatients(applyLocalChanges(data, storedChanges));
      } catch {
        setError(t("patients.fetchError"));
      } finally {
        setIsLoading(false);
      }
    }

    fetchPatients();
  }, [t]);

  function savePatient(
    patient: PatientRecord,
    selectedPatient: PatientRecord | null
  ) {
    if (selectedPatient) {
      const isCreatedPatient = changes.created.some(
        (item) => item.id === patient.id
      );

      const nextChanges: PatientLocalChanges = isCreatedPatient
        ? {
            ...changes,
            created: changes.created.map((item) =>
              item.id === patient.id ? patient : item
            ),
          }
        : {
            ...changes,
            updated: [
              ...changes.updated.filter((item) => item.id !== patient.id),
              patient,
            ],
          };

      updateChanges(nextChanges);
      return;
    }

    const newPatient: PatientRecord = {
      ...patient,
      id: generatePatientId([...apiPatients, ...changes.created]),
    };

    const nextChanges: PatientLocalChanges = {
      ...changes,
      created: [newPatient, ...changes.created],
    };

    updateChanges(nextChanges);
  }

  function deletePatient(id: PatientRecord["id"]) {
    const isCreatedPatient = changes.created.some((item) => item.id === id);

    const nextChanges: PatientLocalChanges = isCreatedPatient
      ? {
          ...changes,
          created: changes.created.filter((patient) => patient.id !== id),
        }
      : {
          created: changes.created,
          updated: changes.updated.filter((patient) => patient.id !== id),
          deletedIds: [...new Set([...changes.deletedIds, id])],
        };

    updateChanges(nextChanges);
  }

  return {
    patients,
    isLoading,
    error,
    savePatient,
    deletePatient,
  };
}
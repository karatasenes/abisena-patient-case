import axios from "axios";

import { API_URL } from "../../../shared/constants/api.constants";
import type { PatientRecord } from "../types/patient.types";

export async function getPatients(): Promise<PatientRecord[]> {
  const response = await axios.get<PatientRecord[]>(API_URL);
  return response.data;
}
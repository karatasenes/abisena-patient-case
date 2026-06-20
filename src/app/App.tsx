import { Toaster } from "react-hot-toast";
import { PatientsPage } from "../features/patients/pages/PatientsPage";

function App() {
  return (
    <>
      <PatientsPage />
      <Toaster position="top-right" />
    </>
  );
}

export default App;
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Appointment from "./pages/Appointment";
import DashboardLayout from "./dashboard";
import Diseases from "./pages/Diseases";
import DoctorAppointment from "./pages/DoctorAppointment";
import PatientLogin from "./pages/PatientLogin";
import SetAppointment from "./pages/SetAppointment";
import SignUp from "./pages/SignUp";
import ThemeProvider from "./theme";
import drNavConfig from "../config-navigation-doctor";
import navConfig from "../config-navigation";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PatientLogin />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/dashboard/patient"
            element={<DashboardLayout navConfig={navConfig} />}
          >
            <Route path="/dashboard/patient" element={<Diseases />} />
            <Route path="randevu" element={<Appointment />} />
            <Route path=":doctorId/randevu-al" element={<SetAppointment />} />
          </Route>
          <Route
            path="/dashboard/doctor"
            element={<DashboardLayout navConfig={drNavConfig} />}
          >
            <Route path="/dashboard/doctor" element={<DoctorAppointment />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;


import { BrowserRouter, Route, Routes } from "react-router-dom";

import AdminMain from "./pages/AdminMain";
import Appointment from "./pages/Appointment";
import DashboardLayout from "./dashboard";
import Diagnosis from "./pages/Diagnosis";
import DoctorAppointment from "./pages/DoctorAppointment";
import Doctors from "./pages/Doctors";
import PatientAppointment from "./pages/PatientAppointment";
import PatientLogin from "./pages/PatientLogin";
import Patinets from "./pages/Patients";
import SetAppointment from "./pages/SetAppointment";
import SignUp from "./pages/SignUp";
import ThemeProvider from "./theme";
import adminNavConfig from "../config-navigation-admin";
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
            <Route path="/dashboard/patient" element={<PatientAppointment />} />
            <Route path="randevu" element={<Appointment />} />
            <Route path=":doctorId/randevu-al" element={<SetAppointment />} />
          </Route>
          <Route
            path="/dashboard/doctor"
            element={<DashboardLayout navConfig={drNavConfig} />}
          >
            <Route path="/dashboard/doctor" element={<DoctorAppointment />} />
            <Route
              path="/dashboard/doctor/diagnostics"
              element={<Diagnosis />}
            />
          </Route>
          <Route
            path="/dashboard/admin"
            element={<DashboardLayout navConfig={adminNavConfig} />}
          >
            <Route path="/dashboard/admin" element={<AdminMain />} />
            <Route path="/dashboard/admin/patients" element={<Patinets />} />
            <Route path="/dashboard/admin/doctors" element={<Doctors />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;


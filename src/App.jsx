import { BrowserRouter, Route, Routes } from "react-router-dom";

import PatientLogin from "./pages/PatientLogin";
import SignUp from "./pages/SignUp";
import ThemeProvider from "./theme";
import DashboardLayout from "./dashboard";
import Appointment from "./pages/Appointment";
import Diseases from "./pages/Diseases";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<PatientLogin />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route path="/dashboard/hastaliklarim" element={<Diseases />} />
            <Route path="/dashboard/randevu" element={<Appointment />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;


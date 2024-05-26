import DoctorsAppointmentWidget from "../widgets/DoctorsAppointmentWidget";
import { Stack } from "@mui/material";

function DoctorAppointment() {
  return (
    <Stack spacing={2}>
      <h1>Randevularınız</h1>
      <DoctorsAppointmentWidget />
    </Stack>
  );
}

export default DoctorAppointment;


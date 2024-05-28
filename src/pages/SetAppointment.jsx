import { Button, Skeleton, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import Calendar from "../components/Calendar";
import SymptomSelect from "../components/SymptomSelect";
import useAppiontment from "../hooks/useAppointment";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import useSymptom from "../hooks/useSymptom";

function SetAppointment() {
  const [appointment, setAppointment] = useState(null);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [step, setStep] = useState(0);
  const { createAppointment, getAppointmentByDoctorId } = useAppiontment();
  const { getSymptoms } = useSymptom();
  const { doctorId } = useParams();
  const { symptoms } = getSymptoms();
  const { appointments, isLoading, mutate } =
    getAppointmentByDoctorId(doctorId);
  const navigate = useNavigate();

  if (isLoading) {
    return <Skeleton variant="rectangular" width="100%" height="100vh" />;
  }

  const clickButton = async () => {
    if (step === 0) {
      setStep(step + 1);
    }
    if (step === 1) {
      const patientId = localStorage.getItem("patientId");
      const ids = selectedSymptoms.map((symptom) => symptom.id).join(",");
      const names = selectedSymptoms.map((symptom) => symptom.name).join(",");

      const symptomsString = `${ids}-${names}`;

      const response = await createAppointment(
        patientId,
        doctorId,
        appointment,
        symptomsString
      );
      mutate();
      setStep(step + 1);
    }
  };
  return (
    <Stack spacing={3}>
      <Typography variant="h3">Randevu Al</Typography>
      {step === 0 && appointments && (
        <Calendar
          appointments={appointments}
          appointment={appointment}
          setAppointment={setAppointment}
        />
      )}
      {step === 1 && symptoms && (
        <SymptomSelect
          symptoms={symptoms}
          selectedSymptoms={selectedSymptoms}
          setSelectedSymptoms={setSelectedSymptoms}
        />
      )}
      {step === 2 && appointment !== null && (
        <Typography>
          {(() => {
            const appointmentDate = new Date(appointment);
            appointmentDate.setHours(appointmentDate.getHours() - 3);
            const formattedDate = appointmentDate.toLocaleDateString();
            const formattedTime = appointmentDate.toLocaleTimeString();
            return `${formattedDate} tarihli randevunuz saat ${formattedTime}'a başarıyla oluşturmuştur. Sağlıklı günler dileriz.`;
          })()}
        </Typography>
      )}
      <Button
        variant="contained"
        color="primary"
        onClick={() =>
          step === 2 ? navigate("/dashboard/patient") : clickButton()
        }
      >
        {step === 2 ? "Anasayfaya Dön" : "Devam"}
      </Button>
    </Stack>
  );
}
export default SetAppointment;


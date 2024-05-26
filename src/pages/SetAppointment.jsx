import { Button, Stack, Typography } from "@mui/material";

import Calendar from "../components/Calendar";
import SymptomSelect from "../components/SymptomSelect";
import useAppiontment from "../hooks/useAppointment";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState } from "react";
import useSymptom from "../hooks/useSymptom";

function SetAppointment() {
  const [appointment, setAppointment] = useState(null);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [step, setStep] = useState(0);
  const { createAppointment } = useAppiontment();
  const { getSymptoms } = useSymptom();
  const { doctorId } = useParams();
  const { symptoms } = getSymptoms();
  const navigate = useNavigate();

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

      setStep(step + 1);
    }
  };
  return (
    <Stack spacing={3}>
      <Typography variant="h3">Randevu Al</Typography>
      {step === 0 && (
        <Calendar appointment={appointment} setAppointment={setAppointment} />
      )}
      {step === 1 && symptoms && (
        <SymptomSelect
          symptoms={symptoms}
          selectedSymptoms={selectedSymptoms}
          setSelectedSymptoms={setSelectedSymptoms}
        />
      )}
      {step === 2 && (
        <Typography>
          Randevunuzu başarıyla oluşturmuştur. Sağlıklı günler dileriz.
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


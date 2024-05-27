import { Grid, Typography } from "@mui/material";

import DiagnosisCard from "../components/DiagnosisCard";
import React from "react";
import useAppointment from "../hooks/useAppointment";
import useDoctor from "../hooks/useDoctor";

function PatientAppointment() {
  const { getAppointmentByPatientId } = useAppointment();
  const { getDoctors } = useDoctor();
  const patientId = localStorage.getItem("patientId");
  const { doctors, isLoading: load } = getDoctors();
  const { appointments, isLoading, isError } =
    getAppointmentByPatientId(patientId);

  if (isLoading && load) {
    return <div>Loading...</div>;
  }

  if (appointments && doctors) {
    appointments.forEach((appointment) => {
      const [symptomIds, symptomNames] = appointment.reason?.split("-");

      const ids = symptomIds?.split(",");
      const names = symptomNames?.split(",");

      appointment.symptoms = names;
      appointment.symptomIds = ids;

      const doctor = doctors.find(
        (patient) => patient.id === appointment.doctorId
      );
      appointment.doctor = doctor;
    });
  }

  return (
    <>
      <Grid container spacing={2}>
        {appointments ? (
          appointments.map((appointment) => (
            <Grid item key={appointment.id} xs={12} sm={6} md={4}>
              <DiagnosisCard appointment={appointment} />
            </Grid>
          ))
        ) : (
          <Typography variant="h6">
            Kayıtlı Randevunuz Bulunmamaktadır.
          </Typography>
        )}
      </Grid>
    </>
  );
}

export default PatientAppointment;


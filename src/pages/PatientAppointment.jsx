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
      console.log(doctor);
      appointment.doctor = doctor;
    });
  }

  return (
    <>
      <Grid container>
        <Grid item xs={12} sm={6} md={3}>
          {appointments ? (
            appointments.map((appointment) => (
              <DiagnosisCard key={appointment.id} appointment={appointment} />
            ))
          ) : (
            <Typography variant="h6">
              Kayıtlı Hastalığınız Bulunmamaktadır.
            </Typography>
          )}
        </Grid>
      </Grid>
    </>
  );
}

export default PatientAppointment;


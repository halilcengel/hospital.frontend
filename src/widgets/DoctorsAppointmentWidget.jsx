import Grid from "@mui/material/Grid";
import PatientCard from "../components/PatientCard";
import useAppointment from "../hooks/useAppointment";
import usePatient from "../hooks/usePatient";

function DoctorsAppointmentWidget() {
  const { getPatients } = usePatient();
  const { getAppointmentByDoctorId } = useAppointment();

  const doctorId = localStorage.getItem("doctorId");
  const { appointments, isLoading } = getAppointmentByDoctorId(doctorId);
  const { patients, isLoading: patientLoding } = getPatients();

  if (isLoading && patientLoding) return <div>Loading...</div>;
  console.log(appointments);
  if (appointments && patients) {
    appointments.forEach((appointment) => {
      const [symptomIds, symptomNames] = appointment.reason?.split("-");

      const ids = symptomIds?.split(",");
      const names = symptomNames?.split(",");

      appointment.symptoms = names;
      appointment.symptomIds = ids;

      const patient = patients.find(
        (patient) => patient.id === appointment.patientId
      );
      appointment.patient = patient;
    });
  }

  return (
    <Grid container spacing={2}>
      {appointments &&
        appointments.map((appointment) => (
          <Grid item key={appointment.id} xs={6} md={6}>
            <PatientCard key={appointment.id} appointment={appointment} />
          </Grid>
        ))}
    </Grid>
  );
}

export default DoctorsAppointmentWidget;


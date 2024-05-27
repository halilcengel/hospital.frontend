import { Container, Grid, Skeleton, Typography } from "@mui/material";

import Iconify from "../components/Iconfiy";
import Summary from "../components/Summary";
import SystemChart from "../components/SystemChart";
import useAppointment from "../hooks/useAppointment";
import useDiagnosis from "../hooks/useDiagnosis";
import useDoctor from "../hooks/useDoctor";
import usePatient from "../hooks/usePatient";
import useSymptom from "../hooks/useSymptom";

function AdminMain() {
  const { getAppointments } = useAppointment();
  const { getPatients } = usePatient();
  const { getDiagnostics } = useDiagnosis();
  const { getDoctors } = useDoctor();
  const { getSymptoms } = useSymptom();
  const { appointments, appointmentsLoading } = getAppointments();
  const { patients, loading: patientLoading } = getPatients();
  const { diagnostics, isLoading: diagnosticsLoading } = getDiagnostics();
  const { doctors, isLoading: doctorLoading } = getDoctors();
  const { symptoms, isLoading: symptomLoading } = getSymptoms();

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Admin Paneli
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          {patientLoading ? (
            <Skeleton variant="rounded" width="100%" height={100} />
          ) : (
            <Summary
              title="Hastalar"
              total={patients?.length || 0}
              color="success"
              icon={
                <Iconify
                  icon="fluent:person-pill-20-regular"
                  sx={{ color: "#1877f2", width: "4rem", height: "4rem" }}
                />
              }
            />
          )}
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          {doctorLoading ? (
            <Skeleton variant="rounded" width="100%" height={100} />
          ) : (
            <Summary
              title="Doktor"
              total={doctors?.length || 0}
              color="success"
              icon={
                <Iconify
                  icon="hugeicons:doctor-01"
                  sx={{ color: "#1877f2", width: "4rem", height: "4rem" }}
                />
              }
            />
          )}
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Summary
            title="Admin"
            total={1}
            color="success"
            icon={
              <Iconify
                icon="eos-icons:admin"
                sx={{ color: "#1877f2", width: "4rem", height: "4rem" }}
              />
            }
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          {appointmentsLoading ? (
            <Skeleton variant="rounded" width="100%" height={100} />
          ) : (
            <Summary
              title="Randevu"
              total={appointments?.length || 0}
              color="success"
              icon={
                <Iconify
                  icon="lets-icons:date-range-duotone"
                  sx={{ color: "#1877f2", width: "4rem", height: "4rem" }}
                />
              }
            />
          )}
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          {diagnosticsLoading ? (
            <Skeleton variant="rounded" width="100%" height={100} />
          ) : (
            <Summary
              title="Teşhis"
              total={diagnostics?.length || 0}
              color="success"
              icon={
                <Iconify
                  icon="streamline:medical-search-diagnosis"
                  sx={{ color: "#1877f2", width: "4rem", height: "4rem" }}
                />
              }
            />
          )}
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          {symptomLoading ? (
            <Skeleton variant="rounded" width="100%" height={100} />
          ) : (
            <Summary
              title="Semptom"
              total={symptoms?.length || 0}
              color="success"
              icon={
                <Iconify
                  icon="material-symbols-light:diagnosis-rounded"
                  sx={{ color: "#1877f2", width: "4rem", height: "4rem" }}
                />
              }
            />
          )}
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <SystemChart
            title="Sistem Önerililerinin Teşhislerde Kullanımı"
            chart={{
              series: [
                { label: "Kullanıldı", value: 70 },
                { label: "Kullanılmadı", value: 30 },
              ],
            }}
          />
        </Grid>
      </Grid>
    </Container>
  );
}

export default AdminMain;


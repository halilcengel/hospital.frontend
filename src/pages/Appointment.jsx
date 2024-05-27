import { Badge, Grid, Stack } from "@mui/material";

import DoctorCard from "../components/DoctorCard";
import useDoctor from "../hooks/useDoctor";

function Appointment() {
  const { getDoctors } = useDoctor();
  const { doctors } = getDoctors();

  return (
    <Stack direction={"column"}>
      <Grid container spacing={2}>
        {doctors?.map((doctor) => (
          <Grid item key={doctor.id} xs={12} sm={6} md={4}>
            <DoctorCard
              name={doctor.firstName + " " +doctor.lastName}
              specialty={doctor.specialization}
            />
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
}

export default Appointment;


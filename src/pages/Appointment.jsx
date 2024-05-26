import { Badge, Grid, Stack } from "@mui/material";

import DoctorCard from "../components/DoctorCard";
import useDoctor from "../hooks/useDoctor";

function Appointment() {
  const { getDoctors } = useDoctor();
  const { doctors } = getDoctors();

  return (
    <Stack direction={"column"}>
      <Grid spacing={2} container>
        {doctors?.map((doctor) => (
          <Grid key={doctor.id} item xs={12} sm={6} md={4}>
            <DoctorCard
              name={doctor.firstName + doctor.lastName}
              specialty={doctor.specialization}
            />
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
}

export default Appointment;


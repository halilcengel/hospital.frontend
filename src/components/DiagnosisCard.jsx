import {
  Card,
  CardContent,
  CardHeader,
  Stack,
  Typography,
} from "@mui/material";

import { Chip } from "@mui/material";

function DiagnosisCard({ appointment }) {
  const { appointmentOn, reason, patientId, patient, symptomIds } = appointment;

  const appointmentOnDate = new Date(appointmentOn);
  const formattedDate = `${appointmentOnDate.getDate()}/${
    appointmentOnDate.getMonth() + 1
  }/${appointmentOnDate.getFullYear()}`;

  const hours = appointmentOnDate.getHours();
  const minutes = appointmentOnDate.getMinutes();
  const formattedTime = `${hours}:${minutes < 10 ? "0" : ""}${minutes}`;
  return (
    <Card>
      <CardHeader
        titleTypographyProps={{ variant: "h5", color: "primary" }}
        subheaderTypographyProps={{ color: "InfoText" }}
        title={
          appointment?.doctor?.firstName + " " + appointment?.doctor?.lastName
        }
        subheader={appointment?.doctor?.specialization}
      />
      <CardContent>
        <Stack direction="column" spacing={1}>
          {appointment?.symptoms?.map((reason, index) => (
            <Chip
              sx={{ width: 100 }}
              key={index}
              label={reason.trim()}
              color="info"
              variant="outlined"
            />
          ))}
          <Typography variant="body" color="textSecondary">
            {formattedDate + " " + formattedTime}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default DiagnosisCard;


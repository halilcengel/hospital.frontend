import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CircularProgress,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { MoreVertOutlined } from "@mui/icons-material";
import PsychologyIcon from "@mui/icons-material/Psychology";
import http from "../http";
import { useState } from "react";

function PatientCardAction() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton onClick={handleClick}>
        <MoreVertOutlined />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Teşhisi Kullan</MenuItem>
        <MenuItem onClick={handleClose}>Teşhisi Değiştir</MenuItem>
      </Menu>
    </>
  );
}

function PatientCard({ appointment }) {
  const { appointmentOn, reason, patientId, patient, symptomIds } = appointment;
  const [loading, setloading] = useState(false);
  const [systemDiagnosisSuggestion, setSystemDiagnosisSuggestion] =
    useState(null);

  const appointmentOnDate = new Date(appointmentOn);
  const formattedDate = `${appointmentOnDate.getDate()}/${
    appointmentOnDate.getMonth() + 1
  }/${appointmentOnDate.getFullYear()}`;

  const hours = appointmentOnDate.getHours();
  const minutes = appointmentOnDate.getMinutes();
  const formattedTime = `${hours}:${minutes < 10 ? "0" : ""}${minutes}`;

  const handleSistemDene = async () => {
    setloading(true);
    const symptomQuery = symptomIds?.map((id) => `SymptomIds=${id}`).join("&");
    console.log(symptomQuery);
    const response = await http.get(`diagnosis/query?${symptomQuery}`);
    if (response.data.length === 0) {
      setSystemDiagnosisSuggestion("Sistemde öneri bulunamadı.");
      setloading(false);
      return;
    }
    setSystemDiagnosisSuggestion(response.data[0].name);
    setloading(false);
  };

  return (
    <Card>
      <CardHeader
        title={`${patient?.firstName} ${patient?.lastName}`}
        subheader={`Randevu: ${formattedDate} ${formattedTime}`}
        avatar={<AccountCircleIcon fontSize="large" />}
        action={PatientCardAction()}
      />

      <CardContent>
        <Typography>Kan Grubu: {patient?.bloodType}</Typography>
        <Typography variant="h5">Şikayetler:</Typography>
        {appointment?.symptoms?.map((reason, index) => (
          <Typography key={index} variant="body1">
            - {reason.trim()}
          </Typography>
        ))}
      </CardContent>
      <CardActions>
        {loading ? (
          <CircularProgress />
        ) : systemDiagnosisSuggestion === null ? (
          <Button
            size="large"
            color="primary"
            startIcon={<PsychologyIcon />}
            onClick={() => {
              handleSistemDene();
            }}
          >
            Sisteme Danış
          </Button>
        ) : (
          <Typography>{systemDiagnosisSuggestion}</Typography>
        )}
      </CardActions>
    </Card>
  );
}

export default PatientCard;


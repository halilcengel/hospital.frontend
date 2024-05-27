import {
  Badge,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Menu,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { MoreVertOutlined } from "@mui/icons-material";
import PsychologyIcon from "@mui/icons-material/Psychology";
import http from "../http";
import { useState } from "react";

function PatientCard({ appointment }) {
  const { appointmentOn, reason, patientId, patient, symptomIds } = appointment;
  const [loading, setloading] = useState(false);
  const [systemDiagnosisSuggestion, setSystemDiagnosisSuggestion] =
    useState(null);
  const [selectedDiagnosticId, setSelectedDiagnosticId] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [diagnosis, setDiagnosis] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleUseSuggestedDiagnosis = async () => {
    const { symptoms, symptomIds, patient, ...rest } = appointment;
    const response = await http.put(`appointment/${appointment?.id}`, {
      ...rest,
      outComeDiagnosisId: selectedDiagnosticId,
    });

    handleClose();
    setOpen(false);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChangeSuggestedDiagnosis = async () => {
    const response = await http.get(`diagnosis/query`);
    setDiagnosis(response.data);
    setOpen(true);
  };

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
    setSelectedDiagnosticId(response.data[0].id);
    setloading(false);
  };

  return (
    <>
      <Card>
        <CardHeader
          titleTypographyProps={{ variant: "h5", color: "primary" }}
          subheaderTypographyProps={{ color: "InfoText" }}
          title={`${patient?.firstName} ${patient?.lastName}`}
          subheader={`Randevu: ${formattedDate} ${formattedTime}`}
          avatar={<AccountCircleIcon fontSize="large" />}
          action={
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
                <MenuItem onClick={handleUseSuggestedDiagnosis}>
                  Teşhisi Kullan
                </MenuItem>
                <MenuItem onClick={handleChangeSuggestedDiagnosis}>
                  Teşhisi Değiştir
                </MenuItem>
              </Menu>
            </>
          }
        />

        <CardContent>
          <Typography margin={2}>Kan Grubu: {patient?.bloodType}</Typography>

          {appointment?.symptoms?.map((reason, index) => (
            <Chip
              key={index}
              label={reason.trim()}
              color="info"
              variant="outlined"
            />
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
            <Chip
              label={systemDiagnosisSuggestion}
              color="success"
              variant="outlined"
            />
          )}
        </CardActions>
      </Card>
      <Dialog
        sx={{ padding: 20 }}
        open={open}
        maxWidth="xl"
        onClose={() => {
          setOpen(false);
        }}
      >
        <DialogTitle>Teşhisi Değiştir</DialogTitle>
        <DialogContent>
          <Stack spacing={2}>
            <Select
              value={systemDiagnosisSuggestion}
              onChange={(e) => {
                setSelectedDiagnosticId(e.target.value.id);
                setSystemDiagnosisSuggestion(e.target.value.name);
              }}
            >
              {diagnosis?.map((option) => (
                <MenuItem key={option.id} value={option}>
                  {option.name}
                </MenuItem>
              ))}
            </Select>
          </Stack>
        </DialogContent>

        <Button onClick={handleUseSuggestedDiagnosis}>Kaydet</Button>
      </Dialog>
    </>
  );
}

export default PatientCard;


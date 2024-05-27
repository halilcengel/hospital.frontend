import {
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

import { Autocomplete } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import http from "../http";
import useDiagnosis from "../hooks/useDiagnosis";
import useSmymptom from "../hooks/useSymptom";
import { useState } from "react";

function Diagnosis() {
  const { getSymptoms } = useSmymptom();
  const { getDiagnostics } = useDiagnosis();
  const [open, setOpen] = useState(false);
  const [newDiagnosis, setNewDiagnosis] = useState("");
  const { diagnostics, isLoading, isError, mutate } = getDiagnostics();
  const { symptoms } = getSymptoms();
  const [selectedSymptom, setSelectedSymptom] = useState(null);
  console.log(symptoms);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    const response = await http.post("/Diagnosis", { name: newDiagnosis });
    if (selectedSymptom) {
      console.log(selectedSymptom);
      selectedSymptom.map(async (symptom) => {
        await http.post(
          `/Diagnosis/${response.data.id}/symptom/${symptom.id}`
        );
      });
    }
    setNewDiagnosis("");
    mutate();
    handleClose();
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Hastalık Adı", width: 130 },
  ];

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Hastalıklar</h1>
      <Button
        variant="outlined"
        color="primary"
        onClick={handleClickOpen}
        sx={{ marginBottom: 2 }}
      >
        Hastalık Ekle
      </Button>
      <DataGrid rows={diagnostics} columns={columns} pageSize={5} />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Hastalık Ekle</DialogTitle>
        <DialogContent>
          <DialogContentText>Lütfen Adını Giriniz</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Diagnosis Name"
            type="text"
            fullWidth
            value={newDiagnosis}
            onChange={(e) => setNewDiagnosis(e.target.value)}
          />
          <Autocomplete
            multiple={true}
            options={symptoms}
            getOptionLabel={(option) => option.name}
            style={{ width: 300 }}
            onChange={(event, newValue) => {
              setSelectedSymptom(newValue);
            }}
            renderInput={(params) => (
              <TextField {...params} label="Symptom" variant="outlined" />
            )}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Vazgeç
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Onayla
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Diagnosis;


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

import http from "../http";
import useDiagnosis from "../hooks/useDiagnosis";
import { useState } from "react";

function Diagnosis() {
  const { getDiagnostics } = useDiagnosis();
  const [open, setOpen] = useState(false);
  const [newDiagnosis, setNewDiagnosis] = useState("");
  const { diagnostics, isLoading, isError } = getDiagnostics();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    const response = await http.post("/Diagnosis", { name: newDiagnosis });
    console.log(response);
    setNewDiagnosis("");
    handleClose();
  };
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
      <Grid container spacing={2}>
        {diagnostics.map((diagnosis, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="h2">
                  {diagnosis.name}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

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


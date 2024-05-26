import { Grid, Typography } from "@mui/material";

import DiagnosisCard from "../components/DiagnosisCard";
import React from "react";
import useDiagnosis from "../hooks/useDiagnosis";

function Diseases() {
  const { getDiagnosisByPatientId } = useDiagnosis();
  const userId = localStorage.getItem("userId");
  const { diagnosis, isLoading, isError } = getDiagnosisByPatientId(userId);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Grid container>
        <Grid item xs={12} sm={6} md={3}>
          {diagnosis ? (
            diagnosis.map((diagnosis) => (
              <DiagnosisCard key={diagnosis.id} diagnosis={diagnosis} />
            ))
          ) : (
            <Typography variant="h6">Kayıtlı Hastalığınız Bulunmamaktadır.</Typography>
          )}
        </Grid>
      </Grid>
    </>
  );
}

export default Diseases;


import { Card, CardContent, CardHeader } from "@mui/material";

import SemptomChip from "./SemptomChip";

function DiagnosisCard({ diagnosis}) {
  return (
    <Card>
      <CardHeader title={diagnosis?.name} />
      <CardContent>
        <SemptomChip />
      </CardContent>
    </Card>
  );
}

export default DiagnosisCard;


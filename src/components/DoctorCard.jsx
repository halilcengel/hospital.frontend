import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
} from "@mui/material";

import Calendar from "./Calendar";
import Iconify from "./Iconfiy";
import SymptomSelect from "./SymptomSelect";
import { useNavigate } from "react-router-dom";

function DoctorCard({ name, specialty }) {
  const navigate = useNavigate();

  return (
    <Card>
      <CardHeader
        titleTypographyProps={{ variant: "h6" }}
        title={name}
        subheader={specialty}
        avatar={
          <Iconify
            icon="ep:avatar"
            sx={{ color: "#1877f2", width: "2rem", height: "2rem" }}
          />
        }
      />
      <CardActions sx={{ alignItems: "end", justifyContent: "end" }}>
        <Button
          size="medium"
          color={"primary"}
          variant="outlined"
          onClick={() => {
            navigate("/dashboard/patient/2/randevu-al");
          }}
        >
          Randevu Al
        </Button>
      </CardActions>
    </Card>
  );
}

export default DoctorCard;


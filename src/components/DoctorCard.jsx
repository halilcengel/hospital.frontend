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
        title={name}
        subheader={specialty}
        avatar={<Iconify icon="icon-park-solid:people" />}
      />
      <CardActions sx={{ alignItems: "center", justifyContent: "center" }}>
        <Button
          size="medium"
          color={"primary"}
          variant="contained"
          sx={{ width: "100%" }}
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


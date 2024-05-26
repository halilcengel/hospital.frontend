import { Chip } from "@mui/material";
import Iconify from "./Iconfiy";

function SemptomChip(semptom) {
  return <Chip icon={<Iconify icon="uil:head-side-cough" />} label={"hastalık"} variant="outlined" />;
}

export default SemptomChip;


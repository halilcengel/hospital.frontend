import { Stack, Typography } from "@mui/material";

import { DataGrid } from "@mui/x-data-grid";
import Iconify from "../components/Iconfiy";
import useDoctor from "../hooks/useDoctor";

function Doctors() {
  const { getDoctors } = useDoctor();
  const { doctors, isLoading } = getDoctors();
  console.log(isLoading);

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "firstName", headerName: "Ad", width: 130 },
    { field: "lastName", headerName: "Soyad", width: 130 },
    { field: "specialization", headerName: "Uzmanlık", width: 160 },
    { field: "availability", headerName: "Durum", width: 110 },
  ];
  if (isLoading) return <div>Loading...</div>;

  return (
    <Stack style={{ height: 700, width: "100%" }}>
      <Stack direction={"row"} sx={{ display: "flex", mb: 5 }}>
        <Iconify icon="hugeicons:doctor-01" sx={{ width: 35, height: 35, mr: 2 }} />
        <Typography variant="h4">Doktorlar</Typography>
      </Stack>

      <DataGrid rows={doctors} columns={columns} pageSize={5} />
    </Stack>
  );
}

export default Doctors;


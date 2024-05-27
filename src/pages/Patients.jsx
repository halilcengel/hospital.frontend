import { Stack, Typography } from "@mui/material";

import { DataGrid } from "@mui/x-data-grid";
import Iconify from "../components/Iconfiy";
import usePatient from "../hooks/usePatient";

function Patients() {
  const { getPatients } = usePatient();
  const { patients, loading } = getPatients();
  console.log(loading);
  if (loading) return <div>Loading...</div>;

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "firstName", headerName: "Ad", width: 130 },
    { field: "lastName", headerName: "Soyad", width: 130 },
    { field: "userId", headerName: "Kullanıcı ID", width: 90 },
    { field: "phoneNumber", headerName: "Telefon", width: 110 },
    { field: "emailAddress", headerName: "Mail", width: 160 },
    { field: "address", headerName: "Addres", width: 160 },
    { field: "bloodType", headerName: "Kan Grubu", width: 110 },
    { field: "gender", headerName: "Cinsiyeti", width: 90 },
    { field: "dateOfBirth", headerName: "Doğum Tarihi", width: 110 },
  ];

  return (
    <Stack style={{ height: 700, width: "100%" }}>
      <Stack direction={"row"} sx={{ display: "flex", mb: 5 }}>
        <Iconify
          icon="fluent:person-pill-20-regular"
          sx={{ width: 35, height: 35, mr: 2 }}
        />
        <Typography variant="h4">Hastalar</Typography>
      </Stack>
      <DataGrid rows={patients} columns={columns} pageSize={5} />
    </Stack>
  );
}

export default Patients;


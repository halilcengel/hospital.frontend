import { Button, Stack, TextField, Typography } from "@mui/material";

import SelectType from "./SelectType";
import http from "../http";
import { useNavigate } from "react-router-dom";
import useSWR from "swr";
import { useState } from "react";

function Login() {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState(null);
  const [loginError, setLoginError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await http.get(
      `user/Query?Filter=x=> x.emailAddress == "${mail}" && x.password == "${password}"`
    );

    if (response.data) {
      if (response.data.length > 0) {
        setLoginError(false);
        let typeId;
        const doctorQueryResponse = await http.get(
          `doctor/Query?Filter=x=> x.userId == ${response.data[0].id}`
        );
        const patientQueryResponse = await http.get(
          `patient/Query?Filter=x=> x.userId == ${response.data[0].id}`
        );

        /* const adminQueryResponse = await http.get(
          `user/role/Query?Filter=x=> x.userId == ${response.data[0].id} && x.roleId == 2`
        );
        */

        if (doctorQueryResponse.data.length > 0) {
          typeId = doctorQueryResponse.data[0].id;
          setType("doctor");
        }
        if (patientQueryResponse.data.length > 0) {
          typeId = patientQueryResponse.data[0].id;
          setType("patient");
        }
        /*    if (adminQueryResponse.data.length > 0) {
          setType("admin");
        }
        */

        if (type !== null) {
          localStorage.setItem("userId", response.data[0].id);
          localStorage.setItem(`${type}Id`, typeId);

          navigate(`/dashboard/${type}`);
        }
      } else {
        console.log("Kullanıcı Bulunamadı");
        setLoginError(true);
      }
    } else {
      console.log("Kullanıcı Bulunamadı");
      setLoginError(true);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={3}>
        <TextField
          name="email"
          label="Mail Adresi"
          onChange={(e) => setMail(e.target.value)}
        />
        <TextField
          name="password"
          label="Şifre"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </Stack>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
        sx={{ my: 3 }}
      />
      {loginError && (
        <Typography variant="body2" color="error">
          Yanlış mail veya şifre girdiniz
        </Typography>
      )}
      <Button
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
      >
        Giriş Yap
      </Button>
    </form>
  );
}

export default Login;


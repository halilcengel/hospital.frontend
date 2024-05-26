import { Button, Stack, TextField, Typography } from "@mui/material";

import SelectType from "./SelectType";
import http from "../http";
import { useNavigate } from "react-router-dom";
import useSWR from "swr";
import { useState } from "react";

function Login() {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [query, setQuery] = useState(null);
  const [type, setType] = useState(null);
  const [loginError, setLoginError] = useState(false);
  const { data, error } = useSWR(query, http.get);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    setQuery(
      `user/Query?Filter=x=> x.emailAddress == "${mail}" && x.password == "${password}"`
    );

    if (data) {
      if (data.data.length > 0) {
        setLoginError(false);
        //TODO DETERMINE TYPE
        localStorage.setItem(`${type}Id`, data.data[0].id);
        navigate(`/dashboard/${type}`);
      } else {
        console.log("Kullanıcı Bulunamadı");
        setLoginError(true);
      }
    } else if (error) {
      console.log(error);
      setLoginError(true);
    }
  };

  return type === null ? (
    <SelectType type={type} setType={setType} />
  ) : (
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


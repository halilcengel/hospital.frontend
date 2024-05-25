import { Button, Stack, TextField } from "@mui/material";
import { useEffect, useState } from "react";

import http from "../http";
import useSWR from "swr";

function Login() {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [query, setQuery] = useState(null);

  const { data, error } = useSWR(query, http.get);

  useEffect(() => {
    if (data || error) {
      console.log(data, error);
    }
  }, [data, error]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setQuery(
      `user/Query?Filter=x=>x.emailAddress =="${mail}" && x.password === "${password}"`
    );
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


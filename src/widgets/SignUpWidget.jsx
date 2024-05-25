import { Button, MenuItem, Select, Stack, TextField } from "@mui/material";

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import useUser from "../hooks/useUser";

export default function SignUpWidget({ type }) {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [birthday, setBirthday] = useState("");
  const [gender, setGender] = useState("");
  const [step, setStep] = useState(0);
  const [bloodType, setBloodType] = useState("");
  const { createUser } = useUser();
  const navigate = useNavigate();

 

  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log(step);
    if (step === 0) {
      handleUserSubmit();
    } else if (step === 1) {
      handleSecondFormSubmit();
    }
  };

  const handleUserSubmit = async () => {
      const response = await createUser(mail, password);
   console.log(response);
    setStep(step + 1);
  };

  const handleSecondFormSubmit = () => {
    console.log(name, surname, phone, address, birthday, gender, bloodType);
    //TODO: CREATE DOCTOR OR PATIENT BY TYPE PROP

    localStorage.setItem("userId", "1");
    navigate(`${type}/dashboard`);
  };

  const userForm = () => {
    return (
      <>
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
      </>
    );
  };

  const secondForm = () => {
    return (
      <>
        <TextField
          name="name"
          label="İsim"
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          name="surname"
          label="Soyisim"
          onChange={(e) => setSurname(e.target.value)}
        />
        <TextField
          name="phone"
          label="Telefon"
          type="phone"
          onChange={(e) => setPhone(e.target.value)}
        />
        <TextField
          name="address"
          label="Adres"
          type="address"
          onChange={(e) => setAddress(e.target.value)}
        />
        <TextField
          name="birthday"
          label="Doğum Tarihi"
          type="date"
          onChange={(e) => setBirthday(e.target.value)}
        />
        <Select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          name="gender"
          label="Cinsiyet"
        >
          <MenuItem value={"male"}>Erkek</MenuItem>
          <MenuItem value={"female"}>Kadın</MenuItem>
        </Select>
        <Select
          value={bloodType}
          onChange={(e) => setBloodType(e.target.value)}
          name="bloodType"
          label="Kan Grubu"
        >
          <MenuItem value={"A+"}>A+</MenuItem>
          <MenuItem value={"A-"}>A-</MenuItem>
          <MenuItem value={"B+"}>B+</MenuItem>
          <MenuItem value={"B-"}>B-</MenuItem>
          <MenuItem value={"AB+"}>AB+</MenuItem>
          <MenuItem value={"AB-"}>AB-</MenuItem>
          <MenuItem value={"O+"}>O+</MenuItem>
          <MenuItem value={"O-"}>O-</MenuItem>
        </Select>
      </>
    );
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <Stack spacing={3}>
        {step === 0 && userForm()}
        {step === 1 && secondForm()}
      </Stack>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
        sx={{ my: 3 }}
      />
      <Stack direction={"row"} spacing={2}>
        <Button
          fullWidth
          size="large"
          variant="contained"
          color="inherit"
          type="submit"
        >
          {step === 0 ? "İlerle" : "Kayıt Ol"}
        </Button>
      </Stack>
    </form>
  );
}


import { Button, MenuItem, Select, Stack, TextField } from "@mui/material";

import http from "../http";
import useDoctor from "../hooks/useDoctor";
import { useNavigate } from "react-router-dom";
import usePatient from "../hooks/usePatient";
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
  const [specialty, setSpecialty] = useState("");
  const [step, setStep] = useState(0);
  const [bloodType, setBloodType] = useState("");
  const { createUser } = useUser();
  const { createDoctor } = useDoctor();
  const { createPatient } = usePatient();
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

  const handleSecondFormSubmit = async () => {
    const userId = localStorage.getItem("userId");

    if (type === "patient") {
      const response = await createPatient(
        name,
        surname,
        phone,
        address,
        gender,
        birthday,
        bloodType,
        mail,
        userId
      );
      localStorage.setItem("patientId", response.data.id);
    } else if (type === "doctor") {
      const response = await createDoctor(name, surname, specialty, userId);
      const putResponse = await http.put(`doctor/${response.data.id}`, {
        firstName: name,
        lastName: surname,
        specialization: specialty,
        availability: "available",
        userId,
      });
      localStorage.setItem("doctorId", response.data.id);
    }
    navigate(`/dashboard/${type}`);
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

  const thirdForm = () => {
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
          label="Uzmanlık Alanı"
          type="phone"
          onChange={(e) => setSpecialty(e.target.value)}
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
          onChange={(e) => {
            const date = new Date(e.target.value);
            setBirthday(date.toISOString());
          }}
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
        {step === 1 &&
          (type === "patient"
            ? secondForm()
            : type === "doctor"
            ? thirdForm()
            : null)}
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


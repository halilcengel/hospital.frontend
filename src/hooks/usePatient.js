import http from "../http";
import useSWR from "swr";
function usePatient() {
  const fetcher = (url) => http.get(url).then((res) => res.data);
  const createPatient = async (
    firstName,
    lastName,
    phoneNumber,
    address,
    gender,
    dateOfBirth,
    bloodType,
    emailAddress,
    userId
  ) => {
    const response = await http.post("patient", {
      firstName: firstName,
      lastName: lastName,
      phoneNumber: phoneNumber,
      emailAddress: emailAddress,
      address: address,
      bloodType: bloodType,
      gender: gender,
      dateOfBirth: dateOfBirth,
    });

    const responsePatient = await http.put(`patient/${response.data.id}`, {
      firstName: firstName,
      lastName: lastName,
      phoneNumber: phoneNumber,
      emailAddress: emailAddress,
      address: address,
      bloodType: bloodType,
      gender: gender,
      dateOfBirth: dateOfBirth,
      userId: userId,
    });
    console.log(responsePatient);
    return response;
  };

  const getPatients = () => {
    const { data, error } = useSWR("patient/query", fetcher);
    return { patients: data, error, loading: !error && !data };
  };

  const getPatientById = async (id) => {
    //eslint-disable-next-line
    const { data, error } = useSWR(`patient/${id}`, fetcher);
    console.log(data);
    return { patient: data, error, loading: !error && !data };
  };

  return { createPatient, getPatientById, getPatients };
}

export default usePatient;


import http from "../http";
import useSWR from "swr";
function useAppointment() {
  const fetcher = (url) => http.get(url).then((res) => res.data);
  const createAppointment = async (
    patientId,
    doctorId,
    appointmentOn,
    symptomsString
  ) => {
    const response = await http.post("appointment", {
      patientId: patientId,
      doctorId: doctorId,
      appointmentOn: appointmentOn,
      reason: symptomsString,
      duration: "00:30:18",
    });

    return response;
  };

  const getAppointmentByDoctorId = (doctorId) => {
    //eslint-disable-next-line
    const { data, error, mutate } = useSWR(
      `/appointment/query?filter=x=>x.doctorId==${doctorId}`,
      fetcher
    );

    return {
      appointments: data,
      isLoading: !error && !data,
      isError: error,
      mutate,
    };
  };

  const getAppointments = () => {
    //eslint-disable-next-line
    const { data, error } = useSWR(`/appointment/query`, fetcher);

    return {
      appointments: data,
      appointmentsLoading: !error && !data,
      isError: error,
    };
  };

  const getAppointmentByPatientId = (patientId) => {
    const { data, error } = useSWR(
      `/appointment/query?filter=x=>x.patientId==${patientId}`,
      fetcher
    );

    return {
      appointments: data,
      isLoading: !error && !data,
      isError: error,
    };
  };

  return {
    createAppointment,
    getAppointmentByDoctorId,
    getAppointments,
    getAppointmentByPatientId,
  };
}

export default useAppointment;


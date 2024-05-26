import http from "../http";
import useSWR from "swr";

function useSymptom() {
  const fetcher = (url) => http.get(url).then((res) => res.data);

  const createSymptom = async (name) => {
    const response = await http.post("symptom", { name });
    return response;
  };

  const assignSymptom = async (symptomId, appointmentId) => {
    const response = await http.post("symptom/assign", {
      symptomId,
      appointmentId,
    });
    return response;
  };

  const getSymptoms = () => {
    //eslint-disable-next-line
    const { data, error } = useSWR("symptom/query", fetcher);
    console.log(data);
    return {
      symptoms: data,
      isLoading: !error && !data,
      isError: error,
    };
  };

  return { getSymptoms, createSymptom, assignSymptom };
}

export default useSymptom;


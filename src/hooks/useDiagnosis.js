import http from "../http";
import useSWR from "swr";
function useDiagnosis() {
  const fetcher = (url) => http.get(url).then((res) => res.data);
  const getDiagnosisByPatientId = async (patientId) => {
    const response = await http.get(
      `/Appointment/query?filter=x=>x.patientId == ${patientId}`
    );
    let diagnosisIds = [];

    response.data.map((appointment) => {
      diagnosisIds.push(appointment.outComeDiagnosisId);
    });

    let diagnoses = [];
    for (let diagnosisId of diagnosisIds) {
      const diagnosisResponse = await http.get(`/Diagnosis/${diagnosisId}`);
      diagnoses.push(diagnosisResponse.data);
    }

    return {
      diagnosis: diagnoses,
      isLoading: diagnoses.length === 0,
      isError: diagnoses.length === 0,
    };
  };
  return { getDiagnosisByPatientId };
}

export default useDiagnosis;


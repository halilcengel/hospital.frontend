import http from "../http";
import useSWR from "swr";

function useDoctor() {
  const fetcher = (url) => http.get(url).then((res) => res.data);

  const createDoctor = async (firstName, lastName, specialization, userId) => {
    const response = await http.post("doctor", {
      firstName: firstName,
      lastName: lastName,
      specialization: specialization,
      availability: "available",
      userId: userId,
    });
    return response;
  };

  const getDoctors = () => {
    //eslint-disable-next-line
    const { data, error } = useSWR("doctor/query", fetcher);

    return {
      doctors: data,
      isLoading: !error && !data,
      isError: error,
    };
  };

  return { createDoctor, getDoctors };
}
export default useDoctor;


import http from "../http";

function useUser() {
  const createUser = async (email, password) => {
    const response = await http.post("user", {
      emailAddres: email,
      password: password,
    });
    return response;
  };

  const getUser = async (email, password) => {
    const response = await http.get(
      `user/Query?Filter=x=>x.emailAddress =="${email}" && x.password === "${password}"`
    );
    return response;
  };

  return { createUser, getUser };
}

export default useUser;


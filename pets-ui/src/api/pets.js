import instance from "./axios";

export const getAllPets = (token) => {
  return instance
    .get("/pet/", { headers: { Authorization: `Berear ${token}` } })
    .then((res) => res)
    .catch((err) => err.response);
};

import instance from "./axios";
export const signinUser = (data) => {
  return instance
    .post("/user/connect/", data)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response;
    });
};

export const signupUser = (data) => {
  return instance
    .post("/user/", data)
    .then((res) => res)
    .catch((err) => err.response);
};

export const updateUser = (token, data) => {
  return instance
    .put("/user/", data, { headers: { Authorization: `Berear ${token}` } })
    .then((res) => res)
    .catch((err) => err.response);
};

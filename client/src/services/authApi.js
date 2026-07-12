import api from "./api";

export const signup = async (userData) => {
  const response = await api.post(
    "/user/signup",
    userData
  );

  return response.data;
};

export const login = async (userData) => {
  const response = await api.post(
    "/user/login",
    userData
  );

  return response.data;
};

export const getCurrentUser = async (
  token
) => {
  const response = await api.get(
    "/user/me",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
import httpService from "./httpServices";
import { jwtDecode } from "jwt-decode";

export const login = async (email_password) => {
  const response = await httpService.post(
    "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/login/",
    email_password
  );
  localStorage.setItem("token", response.data);
};

export const signUp = async (userObject) => {
  const response = await httpService.post(
    "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users",
    userObject
  );
};

export const getJwt = () => {
  return localStorage.getItem("token");
};

export const getUser = () => {
  try {
    return jwtDecode(getJwt());
  } catch {
    return null;
  }
};

export const logout = () => {
  if (!getUser()) {
    return;
  }

  localStorage.setItem("token", "");
};

export const getUserById = async (id) => {
  const response =
    await httpService.get(`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/${id}
  `);
  return response;
};

export const getUserObject = async () => {
  const id = await getUser()._id;

  const userObJ = await getUserById(id);

  return userObJ.data;
};

export const updateUser = (id, user) => {
  httpService.put(
    `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/${id} `,
    user
  );
};
const userServices = {
  login,
  signUp,
  getUser,
  logout,
  getJwt,
  getUserById,
  getUserObject,
  updateUser,
};
export default userServices;

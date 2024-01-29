// Login.js
import axiosClient from "./axiosClient";

const END_POINT = {
  TaiKhoan: "TaiKhoan",
};

// export const getTaiKhoan = () => {
//   return axiosClient.get(`${END_POINT.TaiKhoan}`);
// };

export const getTaiKhoanByUsername = (username) => {
  return axiosClient.get(`${END_POINT.TaiKhoan}/${username}`);
};

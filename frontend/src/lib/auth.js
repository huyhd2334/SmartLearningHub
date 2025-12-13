import axios from "axios";

const BASE_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:8386/api"
    : "/api";
    
const authApi = axios.create({
  baseURL: BASE_URL,
  withCredentials: true
});

export const getNewAccessToken = async () => {
  try {
    const res = await authApi.post("/refresh-token");
    localStorage.setItem("accessToken", res.data.accessToken);
    return res.data.accessToken;
  } catch (err) {
    window.location.href = "/login";
  }
};

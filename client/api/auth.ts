import api from "./api";
import axios from "axios";

export async function signup(data: any) {
  try {
    const res = await api.post("/auth/signup", data);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        success: false,
        message: error.response?.data?.message || "Signup failed",
      };
    }
    return { success: false, message: "Unknown error" };
  }
}

export async function login(data: any) {
  try {
    const res = await api.post("/auth/login", data);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        success: false,
        message: error.response?.data?.message || "Login failed",
      };
    }
    return { success: false, message: "Unknown error" };
  }
}

export async function createPassword(data: any) {
  try {
    const res = await api.patch("/auth/create-password", data);
    console.log(res)
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        success: false,
        message: error.response?.data?.message || "Create Password failed",
      };
    }
    return { success: false, message: "Unknown error" };
  }
}

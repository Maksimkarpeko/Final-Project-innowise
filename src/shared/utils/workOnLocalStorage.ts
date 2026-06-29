import { UserRole } from "../types";

export const safeRefreshAccessToken = (
  userId: string,
  role: string,
  refreshToken: string,
  accessToken: string,
) => {
  try {
    localStorage.setItem("userId", userId);
    localStorage.setItem("role", role);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("accessToken", accessToken);
  } catch (error) {
    console.error("Error saving refresh access token to localStorage:", error);
  }
};

export const getToken = (token: "accessToken" | "refreshToken") => {
  try {
    return localStorage.getItem(token);
  } catch (error) {
    console.error(`Error getting ${token} from localStorage:`, error);
    return null;
  }
};

export const getUserId = (): string => {
  try {
    if (typeof window === "undefined") return "";

    return localStorage.getItem("userId") || "";
  } catch (error) {
    console.error("Error getting id from localStorage:", error);
    return "";
  }
};

export const getUserRole = (): UserRole | "" => {
  try {
    if (typeof window === "undefined") return "";

    return (localStorage.getItem("role") as UserRole) || "";
  } catch (error) {
    console.error("Error getting id from localStorage:", error);
    return "";
  }
};

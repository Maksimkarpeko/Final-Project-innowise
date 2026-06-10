export const safeRefreshAccessToken = (
  refreshToken: string,
  accessToken: string,
) => {
  try {
    localStorage.setItem("refreshAccessToken", refreshToken);
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

import { gql } from "@apollo/client";
import { getToken } from "../utils";
import { print } from "graphql";

const uploadToken = gql`
  mutation UploadToken {
    updateToken {
      access_token
      refresh_token
    }
  }
`;

export const getRefreshToken = async () => {
  try {
    const currentRefreshToken = getToken("refreshToken");
    const response = await fetch("http://localhost:3001/api/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${currentRefreshToken}`,
      },

      body: JSON.stringify({
        query: print(uploadToken),
      }),
    });
    const result = await response.json();

    if (result.errors) {
      throw new Error(result.errors[0].message);
    }

    const { access_token, refresh_token } = result.data?.updateToken || {};
    if (access_token && refresh_token) {
      localStorage.setItem("accessToken", access_token);
      localStorage.setItem("refreshToken", refresh_token);
      return access_token;
    }
    return null;
  } catch (error) {
    console.error("Error getting refresh token:", error);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    window.location.href = "/login";
    throw error;
  }
};

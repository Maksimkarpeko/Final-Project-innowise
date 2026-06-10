import { gql } from "@apollo/client";
import { ApolloClient } from "@apollo/client-integration-nextjs";
import { AuthResponse } from "../types";

const uploadToken = gql`
  mutation UploadToken{
    updateToken{
      accessToken
      refreshToken
    }
  }
`;

export const getRefreshToken = async (client: ApolloClient) => {
  try {
    const { data } = await client.mutate<AuthResponse<undefined>>({
      mutation: uploadToken,
    });

    const { access_token, refresh_token } = data || {};

    if (access_token && refresh_token) {
      localStorage.setItem("accessToken", access_token);
      localStorage.setItem("refreshToken", refresh_token);
    }

    return access_token;
  } catch (error) {
    console.error("Error getting refresh token:", error);
    throw error;
  }
};

import { getToken } from "@/src/shared";
import { SetContextLink } from "@apollo/client/link/context";

export const authLink = new SetContextLink((previousContext) => {
  const access_token = getToken("accessToken");
  return {
    headers: {
      ...previousContext.headers,
      Authorization: `Bearer ${access_token}`,
    },
  };
});

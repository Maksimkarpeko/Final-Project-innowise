import { gql } from "@apollo/client";

export const getProfile = gql`
  query profile($userId: ID!) {
    profile(userId: $userId) {
      id
      first_name
      last_name
      full_name
      avatar
    }
  }
`;

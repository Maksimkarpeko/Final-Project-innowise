import { gql } from "@apollo/client";

export const getProfile = gql`
  query Profile($userId: ID!) {
    profile(userId: $userId) {
      id
      first_name
      last_name
      full_name
      avatar
    }
  }
`;

export const getUsers = gql`
  query Users {
    users {
      id
      email
      profile {
        first_name
        last_name
        avatar
      }
      department_name
      position_name
    }
  }
`;

export const getUserById = gql`
  query User($id: ID!) {
    user(userId: $id) {
      id
      email
      profile {
        first_name
        last_name
        avatar
      }
      department {
        name
      }
      position {
        name
      }
      role
    }
  }
`;

export const updateProfileUser = gql`
  mutation UpdateProfile($profile: UpdateProfileInput!) {
    updateProfile(profile: $profile) {
      id
      first_name
      last_name
    }
  }
`;

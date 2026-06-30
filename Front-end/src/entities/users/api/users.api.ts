import { gql } from "@apollo/client";

export const getProfile = gql`
  query Profile($userId: ID!) {
    profile(userId: $userId) {
      id
      first_name
      last_name
      full_name
      avatar
      skills {
        name
        categoryId
        mastery
      }
      languages {
        name
        proficiency
      }
    }
  }
`;

export const getUsers = gql`
  query Users {
    users {
      id
      email
      profile {
        id
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
        id
        first_name
        last_name
        full_name
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

export const updateUser = gql`
  mutation UpdateUser($user: UpdateUserInput!) {
    updateUser(user: $user) {
      id
    }
  }
`;

import { gql } from "@apollo/client";

export const GetUserProfile = gql`
  query User($userId: ID!) {
    user(userId: $userId) {
      id
      created_at
      email
      role
      department {
        id
        name
      }
      position {
        id
        name
      }
      profile {
        id
        created_at
        first_name
        last_name
        full_name
        avatar
      }
    }
  }
`;

export const GetDepartments = gql`
  query Departments {
    departments {
      id
      name
    }
  }
`;

export const GetPositions = gql`
  query Positions {
    positions {
      id
      name
    }
  }
`;

export const UpdateUser = gql`
  mutation UpdateUser($user: UpdateUserInput!) {
    updateUser(user: $user) {
      id
      department {
        id
        name
      }
      position {
        id
        name
      }
    }
  }
`;

export const UpdateProfile = gql`
  mutation UpdateProfile($profile: UpdateProfileInput!) {
    updateProfile(profile: $profile) {
      id
      created_at
      first_name
      last_name
      full_name
      avatar
    }
  }
`;

export const UploadAvatar = gql`
  mutation UploadAvatar($avatar: UploadAvatarInput!) {
    uploadAvatar(avatar: $avatar)
  }
`;
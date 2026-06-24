import { gql } from "@apollo/client";

export const GET_USER_CVS = gql`
  query GetUserCVS($userId: ID!) {
    user(userId: $userId) {
      id
      cvs {
        id
        created_at
        name
        education
        description
      }
    }
  }
`;

export const GET_CV_DETAILS = gql`
  query GetCVDetails($cvId: ID!) {
    cv(cvId: $cvId) {
      id
      name
      education
      description
    }
  }
`;

export const UPDATE_CV_DETAILS = gql`
  mutation UpdateCVDetails($cv: UpdateCvInput!) {
    updateCv(cv: $cv) {
      id
      name
      education
      description
    }
  }
`;
import { gql } from "@apollo/client";

export const SignUp = gql`
  mutation Signup($email: String!, $password: String!) {
    signup(auth: { email: $email, password: $password }) {
      user {
        id
        email
      }
      access_token
      refresh_token
    }
  }
`;

export const Login = gql`
  query Login($email: String!, $password: String!) {
    login(auth: { email: $email, password: $password }) {
      user {
        id
        email
      }
      access_token
      refresh_token
    }
  }
`;

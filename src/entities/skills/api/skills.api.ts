import { gql } from "@apollo/client";

export const getDepartments = gql`
  query Skills {
    skills {
      id
      name
    }
  }
`;

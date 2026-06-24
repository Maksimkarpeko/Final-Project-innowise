import { gql } from "@apollo/client";

export const getDepartments = gql`
  query Departments {
    departments {
      id
      name
    }
  }
`;

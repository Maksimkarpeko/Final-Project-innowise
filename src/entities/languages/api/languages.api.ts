import { gql } from '@apollo/client';

export const getLanguages = gql`
  query Languages {
    languages {
      id
      name
    }
  }
`;
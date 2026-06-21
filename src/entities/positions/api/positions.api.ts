import { gql } from '@apollo/client';

export const getPositions = gql`
  query Positions {
    positions {
      id
      name
    }
  }
`
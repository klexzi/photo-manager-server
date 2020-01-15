import { gql } from 'apollo-server-express';

export default gql`
  type Venue {
    id: Int!
    name: String!
    location: String!
  }
`;

import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    me: Admin
  }

  extend type Mutation {
    signIn(email: String!, password: String!): Token!
    verifyToken(token: String!): Boolean!
  }

  type Token {
    token: String!
  }

  type Admin {
    id: Int!
    email: String!
    venue: Venue!
  }
`;

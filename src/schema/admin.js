import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    me: Admin
  }

  extend type Mutation {
    signIn(email: String!, password: String!): Token!
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

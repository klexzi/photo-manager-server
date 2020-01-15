import { gql } from 'apollo-server-express';

import adminSchema from './admin';
import photoSchema from './photo';
import venueSchema from './venue';

const linkSchema = gql`
  scalar Date

  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }

  type Subscription {
    _: Boolean
  }
`;

export default [linkSchema, adminSchema, photoSchema, venueSchema];

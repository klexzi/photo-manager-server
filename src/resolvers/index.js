import { GraphQLDateTime } from 'graphql-iso-date';

import adminResolvers from './admin';
// import messageResolvers from './message';
import photoResolvers from './photo';

const customScalarResolver = {
  Date: GraphQLDateTime,
};

export default [customScalarResolver, adminResolvers, photoResolvers];

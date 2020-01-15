import { ForbiddenError } from 'apollo-server';
import { combineResolvers, skip } from 'graphql-resolvers';

export const isAuthenticated = (parent, args, { me }) =>
  me ? skip : new ForbiddenError('Not authenticated as admin.');

export const isVenueAdmin = combineResolvers(
  isAuthenticated,
  (parent, { venueId }, { models, me }) => {
    console.log('venueId', venueId);
    console.log('me.VenueId', me.VenueId);
    if (venueId !== me.VenueId) {
      throw new ForbiddenError('Not authorized to access resource.');
    }

    return skip;
  }
);

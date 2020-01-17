import jwt from 'jsonwebtoken';
import { combineResolvers } from 'graphql-resolvers';
import { AuthenticationError, UserInputError } from 'apollo-server';

import { isAdmin, isAuthenticated } from './authorization';

const createToken = async (user, secret, expiresIn) => {
  const { id, email, name, VenueId } = user;
  return await jwt.sign({ id, email, name, VenueId }, secret, {
    expiresIn,
  });
};

export default {
  Query: {
    me: combineResolvers(
      isAuthenticated,
      async (parent, args, { models, me }) => {
        if (!me) {
          return null;
        }

        return await models.Admin.findById(me.id);
      }
    ),
  },

  Mutation: {
    signIn: async (
      parent,
      { email, password },
      { models, secret }
    ) => {
      const user = await models.Admin.findByEmail(email);

      if (!user) {
        throw new AuthenticationError('Invalid email and password');
      }

      const isValid = await user.validatePassword(password);

      if (!isValid) {
        throw new AuthenticationError('Invalid email and password.');
      }
      return { token: createToken(user, secret, '5d') };
    },
    verifyToken: async (parent, { token }, { secret }) => {
      try {
        await jwt.verify(token, secret);
        return true;
      } catch (error) {
        return false;
      }
    },
  },

  Admin: {
    venue: async (user, args, { models }) => {
      return await models.Venue.findOne({
        where: {
          id: user.VenueId,
        },
      });
    },
  },
};

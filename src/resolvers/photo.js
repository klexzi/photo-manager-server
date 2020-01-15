import { combineResolvers } from 'graphql-resolvers';
import { isAuthenticated, isVenueAdmin } from './authorization';
export default {
  Query: {
    photos: combineResolvers(
      isAuthenticated,
      async (parent, { cursor, limit = 20 }, { models, me }) => {
        const photos = await models.Photo.findAll({
          where: { VenueId: me.VenueId },
          order: [['createdAt', 'DESC']],
          limit: limit + 1,
        });
        // TODO: map the photos converting the blob to binary
        return photos;
      }
    ),
    photo: combineResolvers(
      isAuthenticated,
      async (parent, { photoId }, { models, me }) => {
        return await models.Photo.findOne({
          where: { id: photoId, VenueId: me.VenueId },
        });
      }
    ),
  },

  Mutation: {
    addPhoto: combineResolvers(
      isVenueAdmin,
      async (
        parent,
        { venueId, imageUrl, category, caption },
        { models }
      ) => {
        return await models.Photo.create({
          imageUrl,
          caption,
          category,
          VenueId: venueId,
        });
      }
    ),
    editCaption: combineResolvers(
      isAuthenticated,
      async (parent, { photoId, caption }, { models, me }) => {
        const [_, Photo] = await models.Photo.update(
          {
            caption,
          },
          {
            where: {
              id: photoId,
              VenueId: me.VenueId,
            },
            returning: true,
            plain: true,
          }
        );
        return Photo.dataValues;
      }
    ),
    deletePhoto: combineResolvers(
      isAuthenticated,
      async (parent, { photoId }, { models, me }) => {
        return await models.Photo.destroy({
          where: {
            id: photoId,
            VenueId: me.VenueId,
          },
        });
      }
    ),
  },
};

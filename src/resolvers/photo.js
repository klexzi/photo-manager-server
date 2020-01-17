import { combineResolvers } from 'graphql-resolvers';
import { isAuthenticated, isVenueAdmin } from './authorization';
import {
  uploadToCloudinary,
  deleteFileFromCloudinary,
} from '../libs/utils';

export default {
  Query: {
    photos: combineResolvers(
      isAuthenticated,
      async (
        parent,
        { cursor, limit = 20, filterValue = undefined },
        { models, me }
      ) => {
        const where = { VenueId: me.VenueId };
        if (filterValue) {
          where.category = filterValue;
        }
        const photos = await models.Photo.findAll({
          where,
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
      async (parent, args, { models }) => {
        const { venueId, category, caption } = args;
        const {
          stream,
          filename,
          mimetype,
          encoding,
        } = await args.file;
        return uploadToCloudinary(stream, filename)
          .then(result => {
            const imageUrl = result.url;
            const publicId = result.public_id;
            return models.Photo.create({
              VenueId: venueId,
              imageUrl,
              category,
              publicId,
            });
          })
          .then(photo => photo)
          .catch(error => {
            console.log(error);
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
    editCategory: combineResolvers(
      isAuthenticated,
      async (parent, { photoId, category }, { models, me }) => {
        const [_, Photo] = await models.Photo.update(
          {
            category,
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
        const photo = await models.Photo.findOne({
          where: { id: photoId, VenueId: me.VenueId },
        });
        await deleteFileFromCloudinary(photo.publicId);
        await photo.destroy();
        return true;
      }
    ),
  },
};

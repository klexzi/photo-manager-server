export default {
  Query: {
    photos: async (parent, { cursor, limit = 20 }, { models }) => {
      const photos = await models.Photos.findAll({
        order: [['CreatedAt', 'DESC']],
        limit: limit + 1,
      });
      // TODO: map the photos converting the blob to binary
      return photos;
    },
    photo: async (parent, { photoId }, { models }) => {
      return await models.Photo.findById(photoId);
    },
  },

  Mutation: {
    addPhoto: async (
      parent,
      { imageUrl, category, caption },
      { models }
    ) => {
      return await models.Photo.create({
        imageUrl,
        caption,
        category,
      });
    },
    editCaption: async (parent, { photoId, caption }, { models }) => {
      return await models.Photo.update(
        {
          caption,
        },
        {
          where: {
            id: photoId,
          },
        }
      );
    },
    deletePhoto: async (parent, { photoId }, { models }) => {
      return await models.Photo.destroy({
        where: {
          id: photoId,
        },
      });
    },
  },
};

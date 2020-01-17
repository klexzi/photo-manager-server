import { gql } from 'apollo-server-express';

// Profile, Home Rental, and Planning, Social,and Backup
export default gql`
  extend type Query {
    photos(
      cursor: String
      limit: Int
      filterValue: Categories
    ): [Photo!]
    photo(photoId: Int!): Photo
  }

  extend type Mutation {
    addPhoto(
      venueId: Int!
      file: Upload!
      caption: String
      category: Categories
    ): Photo!
    editCaption(photoId: Int!, caption: String!): Photo!
    editCategory(photoId: Int!, category: Categories!): Photo!
    deletePhoto(photoId: Int!): Boolean
  }

  enum Categories {
    Profile
    Home
    Planning
    Social
    Backup
  }
  type Photo {
    id: Int!
    imageUrl: String!
    category: Categories
    caption: String
    venueId: Int!
  }
`;

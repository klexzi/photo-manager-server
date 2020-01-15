import { gql } from 'apollo-server-express';

// Profile, Home Rental, and Planning, Social,and Backup
export default gql`
  extend type Query {
    photos(cursor: String, limit: Int): [Photo!]
    photo(photoId: ID!): Photo
  }

  extend type Mutation {
    addPhoto(
      imageUrl: String!
      caption: String
      category: Categories!
    ): Photo!
    editCaption(photoId: ID!, caption: String!): Boolean!
    deletePhoto(id: ID!): Boolean
  }

  enum Categories {
    Profile
    Home
    Planning
    Social
    Backup
  }
  type Photo {
    id: ID!
    imageUrl: String!
    category: Categories!
    caption: String!
  }
`;

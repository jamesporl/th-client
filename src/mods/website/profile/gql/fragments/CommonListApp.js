import { gql } from '@apollo/client';

export default gql`
  fragment CommonListApp on App {
    _id
    name
    shortDesc
    logoImg {
      _id
      medium
    }
    tags {
      _id
      name
    }
    slug
    publishedAt
    supportsCount
    commentsCount
    isSupported
    isFeatured
  }
`;

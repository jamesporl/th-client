import { gql } from '@apollo/client';

export default gql`
  fragment CommonListApp on App {
    _id
    name
    shortDesc
    logoImg
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

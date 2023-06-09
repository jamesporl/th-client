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
      slug
    }
    websiteUrl
    slug
    supportsCount
    commentsCount
    isSupported
    isFeatured
  }
`;

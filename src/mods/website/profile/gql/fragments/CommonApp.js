import { gql } from '@apollo/client';
import CommonSocialUrls from './CommonSocialUrls';

export default gql`
  fragment CommonApp on App {
    _id
    name
    shortDesc
    htmlDesc
    logoImg {
      _id
      medium
    }
    videoUrl
    bannerImgs {
      image {
        _id
        large
        thumbnail
      }
      order
    }
    socialUrls {
      ...CommonSocialUrls
    }
    appStoreUrl
    playStoreUrl
    websiteUrl
    status {
      key
      label
    }
    tags {
      _id
      name
    }
    ownedBy {
      _id
      firstName
      lastName
      image {
        _id
        thumbnail
      }
    }
    slug
    publishedAt
    supportsCount
    commentsCount
    isSupported
    isFeatured
  }
  ${CommonSocialUrls}
`;

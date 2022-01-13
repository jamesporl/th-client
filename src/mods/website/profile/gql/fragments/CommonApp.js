import { gql } from '@apollo/client';
import CommonSocialUrls from './CommonSocialUrls';

export default gql`
  fragment CommonApp on App {
    _id
    name
    shortDesc
    desc
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
    slug
    publishedAt
    supportsCount
    commentsCount
    isSupported
    isSponsored
  }
  ${CommonSocialUrls}
`;

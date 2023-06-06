import { gql } from '@apollo/client';
import CommonSocialUrls from './CommonSocialUrls';

export default gql`
  fragment CommonApp on App {
    _id
    name
    shortDesc
    htmlDesc
    textDesc
    logoImg
    videoUrl
    bannerImgs {
      _id
      image {
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
      slug
    }
    ownedBy {
      _id
      firstName
      lastName
      image
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

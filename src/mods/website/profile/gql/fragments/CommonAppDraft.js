import { gql } from '@apollo/client';
import CommonSocialUrls from './CommonSocialUrls';

export default gql`
  fragment CommonAppDraft on AppDraft {
    _id
    appId
    name
    shortDesc
    jsonDesc
    htmlDesc
    logoImg
    tags {
      _id
      name
    }
    videoUrl
    bannerImgs {
      _id
      image {
        large
        thumbnail
      }
      order
    }
    ownedBy {
      _id
      firstName
      lastName
      image
    }
    appStoreUrl
    playStoreUrl
    websiteUrl
    status {
      key
      label
    }
    socialUrls {
      ...CommonSocialUrls
    }
    createdAt
  }
  ${CommonSocialUrls}
`;

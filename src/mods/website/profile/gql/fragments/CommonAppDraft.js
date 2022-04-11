import { gql } from '@apollo/client';
import CommonSocialUrls from './CommonSocialUrls';

export default gql`
  fragment CommonAppDraft on AppDraft {
    _id
    appId
    name
    shortDesc
    desc
    logoImg {
      _id
      thumbnail
      medium
    }
    tags {
      _id
      name
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
    ownedBy {
      _id
      firstName
      lastName
      image {
        _id
        thumbnail
      }
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

import { gql } from '@apollo/client';

export default gql`
  fragment CommonAppDraft on AppDraft {
    _id
    appId
    name
    shortDesc
    desc
    logoImg {
      _id
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
    appStoreUrl
    playStoreUrl
    websiteUrl
    status {
      key
      label
    }
  }
`;

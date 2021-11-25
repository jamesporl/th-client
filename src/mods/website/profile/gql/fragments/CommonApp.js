import { gql } from '@apollo/client';

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
    appStoreUrl
    playStoreUrl
    websiteUrl
    publishDate
    status {
      key
      label
    }
  }
`;

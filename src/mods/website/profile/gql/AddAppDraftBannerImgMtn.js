import { gql } from '@apollo/client';

export default gql`
  mutation AddAppDraftBannerImg($input: AddAppDraftBannerImgInput!) {
    addAppDraftBannerImg(input: $input) {
      _id
    }
  }
`;

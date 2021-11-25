import { gql } from '@apollo/client';

export default gql`
  mutation UpdateAppDraftBannerImg($input: UpdateAppDraftBannerImgInput!) {
    updateAppDraftBannerImg(input: $input) {
      isCompleted
    }
  }
`;

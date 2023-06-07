import { gql } from '@apollo/client';

export default gql`
  mutation DeleteAppDraftBannerImg($input: DeleteAppDraftBannerImgInput!) {
    deleteAppDraftBannerImg(input: $input) {
      isCompleted
    }
  }
`;

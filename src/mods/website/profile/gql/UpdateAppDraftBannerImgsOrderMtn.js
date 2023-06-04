import { gql } from '@apollo/client';

export default gql`
  mutation UpdateAppDraftBannerImgsOrder($input: UpdateAppDraftBannerImgsOrderInput!) {
    updateAppDraftBannerImgsOrder(input: $input) {
      isCompleted
    }
  }
`;

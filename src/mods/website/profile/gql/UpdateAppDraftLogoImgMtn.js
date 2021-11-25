import { gql } from '@apollo/client';

export default gql`
  mutation UpdateAppDraftLogoImg($input: UpdateAppDraftLogoImgInput!) {
    updateAppDraftLogoImg(input: $input) {
      isCompleted
    }
  }
`;

import { gql } from '@apollo/client';

export default gql`
  mutation DeleteAppDraftLogoImg($input: DeleteAppDraftLogoImgInput!) {
    deleteAppDraftLogoImg(input: $input) {
      isCompleted
    }
  }
`;

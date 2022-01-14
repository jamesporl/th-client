import { gql } from '@apollo/client';

export default gql`
  mutation ResetPasswordByToken($input: ResetPasswordByTokenInput!) {
    resetPasswordByToken(input: $input) {
      isCompleted
    }
  }
`;

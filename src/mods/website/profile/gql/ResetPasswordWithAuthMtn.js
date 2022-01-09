import { gql } from '@apollo/client';

export default gql`
  mutation ResetPasswordWithAuth($input: ResetPasswordWithAuthInput!) {
    resetPasswordWithAuth(input: $input) {
      isCompleted
    }
  }
`;

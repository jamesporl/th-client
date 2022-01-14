import { gql } from '@apollo/client';

export default gql`
  mutation SendPasswordResetLink($input: SendPasswordResetLinkInput!) {
    sendPasswordResetLink(input: $input) {
      isCompleted
    }
  }
`;

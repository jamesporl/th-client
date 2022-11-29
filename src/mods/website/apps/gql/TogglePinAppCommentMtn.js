import { gql } from '@apollo/client';

export default gql`
  mutation TogglePinAppComment($input: TogglePinAppCommentInput!) {
    togglePinAppComment(input: $input) {
      isCompleted
    }
  }
`;

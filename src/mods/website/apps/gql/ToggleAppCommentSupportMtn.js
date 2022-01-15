import { gql } from '@apollo/client';

export default gql`
  mutation ToggleAppCommentSupport($input: ToggleAppCommentSupportInput!) {
    toggleAppCommentSupport(input: $input) {
      isCompleted
    }
  }
`;

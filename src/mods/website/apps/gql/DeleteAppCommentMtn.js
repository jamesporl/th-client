import { gql } from '@apollo/client';

export default gql`
  mutation DeleteAppComment($input: DeleteAppCommentInput!) {
    deleteAppComment(input: $input) {
      isCompleted
    }
  }
`;

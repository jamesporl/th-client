import { gql } from '@apollo/client';

export default gql`
  mutation DeleteAppDraft($input: DeleteAppDraftInput!) {
    deleteAppDraft(input: $input) {
      isCompleted
    }
  }
`;

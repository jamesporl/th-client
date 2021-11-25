import { gql } from '@apollo/client';

export default gql`
  mutation UpdateAppDraftStatus($input: UpdateAppDraftStatusInput!) {
    updateAppDraftStatus(input: $input) {
      isCompleted
    }
  }
`;

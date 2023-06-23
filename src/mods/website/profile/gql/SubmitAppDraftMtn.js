import { gql } from '@apollo/client';

export default gql`
  mutation SubmitAppDraft($input: SubmitAppDraftInput!) {
    submitAppDraft(input: $input) {
      errors
      isSubmitted
    }
  }
`;

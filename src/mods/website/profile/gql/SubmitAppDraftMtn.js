import { gql } from '@apollo/client';
import CommonAppDraft from './fragments/CommonAppDraft';

export default gql`
  mutation SubmitAppDraft($input: SubmitAppDraftInput!) {
    submitAppDraft(input: $input) {
      ...CommonAppDraft
    }
  }
  ${CommonAppDraft}
`;

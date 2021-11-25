import { gql } from '@apollo/client';
import CommonAppDraft from './fragments/CommonAppDraft';

export default gql`
  mutation UpdateAppDraft($input: UpdateAppDraftInput!) {
    updateAppDraft(input: $input) {
      ...CommonAppDraft
    }
  }
  ${CommonAppDraft}
`;

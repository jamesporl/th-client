import { gql } from '@apollo/client';
import CommonAppDraft from './fragments/CommonAppDraft';

export default gql`
  mutation UndoSubmitAppDraft($input: UndoSubmitAppDraftInput!) {
    undoSubmitAppDraft(input: $input) {
      ...CommonAppDraft
    }
  }
  ${CommonAppDraft}
`;

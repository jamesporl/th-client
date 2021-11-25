import { gql } from '@apollo/client';
import CommonAppDraft from './fragments/CommonAppDraft';

export default gql`
  query AppDraft($_id: ID!) {
    appDraft(_id: $_id) {
      ...CommonAppDraft
    }
  }
  ${CommonAppDraft}
`;

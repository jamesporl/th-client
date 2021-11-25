import { gql } from '@apollo/client';
import CommonAppDraft from './fragments/CommonAppDraft';

export default gql`
  query MyAppDrafts {
    myAppDrafts {
      nodes {
        ...CommonAppDraft
      }
      totalCount
    }
  }
  ${CommonAppDraft}
`;

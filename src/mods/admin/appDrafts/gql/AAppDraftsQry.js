import { gql } from '@apollo/client';
import CommonAppDraft from 'mods/website/profile/gql/fragments/CommonAppDraft';

export default gql`
  query AAppDrafts {
    aAppDrafts {
      nodes {
        ...CommonAppDraft
      }
      totalCount
    }
  }
  ${CommonAppDraft}
`;

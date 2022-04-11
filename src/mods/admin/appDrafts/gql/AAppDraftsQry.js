import { gql } from '@apollo/client';
import CommonAppDraft from 'mods/website/profile/gql/fragments/CommonAppDraft';

export default gql`
  query AAppDrafts($page: Int, $pageSize: Int) {
    aAppDrafts(page: $page, pageSize: $pageSize) {
      nodes {
        ...CommonAppDraft
      }
      totalCount
    }
  }
  ${CommonAppDraft}
`;

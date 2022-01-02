import { gql } from '@apollo/client';
import CommonAppComment from './fragments/CommonAppComment';

export default gql`
  query AppComments($appId: ID!, $pageSize: Int, $page: Int) {
    appComments(appId: $appId, pageSize: $pageSize, page: $page) {
      nodes {
        ...CommonAppComment
      }
      totalCount
    }
  }
  ${CommonAppComment}
`;

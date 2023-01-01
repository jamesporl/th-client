import { gql } from '@apollo/client';
import CommonAppTag from './fragments/CommonAppTag';

export default gql`
  query AppTags($searchString: String) {
    appTags(searchString: $searchString) {
      nodes {
        ...CommonAppTag
      }
      totalCount
    }
  }
  ${CommonAppTag}
`;

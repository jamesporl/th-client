import { gql } from '@apollo/client';
import CommonAppTag from './fragments/CommonAppTag';

export default gql`
  query AppTag($slug: String!) {
    appTag(slug: $slug) {
      ...CommonAppTag
    }
  }
  ${CommonAppTag}
`;

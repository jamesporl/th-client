import { gql } from '@apollo/client';
import CommonAppComment from './fragments/CommonAppComment';

export default gql`
  mutation AddCommentApp($input: AddCommentToAppInput!) {
    addCommentToApp(input: $input) {
      ...CommonAppComment
    }
  }
  ${CommonAppComment}
`;

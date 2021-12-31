import { gql } from '@apollo/client';
import CommonApp from '../../profile/gql/fragments/CommonApp';

export default gql`
  query App($slug: String!) {
    app(slug: $slug) {
      ...CommonApp
    }
  }
  ${CommonApp}
`;

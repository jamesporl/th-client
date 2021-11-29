import { gql } from '@apollo/client';
import CommonApp from '../../profile/gql/fragments/CommonApp';

export default gql`
  query Apps {
    apps {
      nodes {
        ...CommonApp
      }
      totalCount
    }
  }
  ${CommonApp}
`;

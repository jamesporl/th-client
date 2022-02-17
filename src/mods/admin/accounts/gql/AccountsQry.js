import { gql } from '@apollo/client';
import CommonAccount from './fragments/CommonAccount';

export default gql`
  query Accounts {
    accounts {
      nodes {
        ...CommonAccount
      }
      totalCount
    }
  }
  ${CommonAccount}
`;

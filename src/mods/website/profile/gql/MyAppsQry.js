import { gql } from '@apollo/client';
import CommonApp from './fragments/CommonApp';

export default gql`
  query MyApps {
    myApps {
      nodes {
        ...CommonApp
      }
      totalCount
    }
  }
  ${CommonApp}
`;

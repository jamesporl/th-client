import { gql } from '@apollo/client';
import CommonProfile from './fragments/CommonProfile';

export default gql`
  query MyProfile {
    myProfile {
      ...CommonProfile
    }
  }
  ${CommonProfile}
`;

import { gql } from '@apollo/client';

export default gql`
  query MyProfile {
    myProfile {
      _id
      firstName
      lastName
      email
      userId
      roleId
      roles {
        key
        label
      }
    }
  }
`;

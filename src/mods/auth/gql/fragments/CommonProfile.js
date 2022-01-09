import { gql } from '@apollo/client';

export default gql`
  fragment CommonProfile on Profile {
    _id
    firstName
    lastName
    email
    shortDesc
    userId
    roleId
    roles {
      key
      label
    }
    image {
      _id
      large
      medium
      thumbnail
    }
  }
`;

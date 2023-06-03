import { gql } from '@apollo/client';

export default gql`
  fragment CommonProfile on Profile {
    _id
    firstName
    lastName
    email
    shortDesc
    image
    isAdmin
  }
`;

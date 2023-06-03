import { gql } from '@apollo/client';

export default gql`
  fragment CommonAccount on Account {
    _id
    firstName
    lastName
    email
    image
  }
`;

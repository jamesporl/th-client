import { gql } from '@apollo/client';

export default gql`
  mutation RepublishApp($input: RepublishAppInput!) {
    republishApp(input: $input) {
      isCompleted
    }
  }
`;

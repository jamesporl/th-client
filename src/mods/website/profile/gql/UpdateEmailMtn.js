import { gql } from '@apollo/client';

export default gql`
  mutation UpdateEmail($input: UpdateEmailInput!) {
    updateEmail(input: $input) {
      isCompleted
    }
  }
`;

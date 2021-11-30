import { gql } from '@apollo/client';

export default gql`
  mutation ToggleAppSupport($input: ToggleAppSupportInput!) {
    toggleAppSupport(input: $input) {
      isCompleted
    }
  }
`;

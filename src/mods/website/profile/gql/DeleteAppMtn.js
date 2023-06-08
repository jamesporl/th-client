import { gql } from '@apollo/client';

export default gql`
  mutation DeleteApp($input: DeleteAppInput!) {
    deleteApp(input: $input) {
      isCompleted
    }
  }
`;

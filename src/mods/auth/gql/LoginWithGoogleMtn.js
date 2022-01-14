import { gql } from '@apollo/client';

export default gql`
  mutation LoginWithGoogle($input: LoginWithGoogleInput!) {
    loginWithGoogle(input: $input)
  }
`;

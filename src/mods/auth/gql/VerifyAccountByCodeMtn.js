import { gql } from '@apollo/client';

export default gql`
  mutation VerifyAccountByCode($input: VerifyAccountByCodeInput!) {
    verifyAccountByCode(input: $input)
  }
`;

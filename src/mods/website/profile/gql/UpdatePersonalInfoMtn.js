import { gql } from '@apollo/client';
import CommonProfile from 'mods/auth/gql/fragments/CommonProfile';

export default gql`
  mutation UpdatePersonalInfo($input: UpdatePersonalInfoInput!) {
    updatePersonalInfo(input: $input) {
      ...CommonProfile
    }
  }
  ${CommonProfile}
`;

import { gql } from '@apollo/client';
import CommonApp from 'mods/website/profile/gql/fragments/CommonApp';

export default gql`
  mutation AddApp($input: AddAppInput!) {
    addApp(input: $input) {
      ...CommonApp
    }
  }
  ${CommonApp}
`;

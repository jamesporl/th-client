import { gql } from '@apollo/client';

export default gql`
  mutation CreateAppDraftFromPublishedApp($input: CreateAppDraftFromPublishedAppInput!) {
    createAppDraftFromPublishedApp(input: $input) {
      _id
    }
  }
`;

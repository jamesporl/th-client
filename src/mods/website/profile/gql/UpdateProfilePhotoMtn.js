import { gql } from '@apollo/client';

export default gql`
  mutation UpdateProfilePhoto($input: UpdateProfilePhotoInput!) {
    updateProfilePhoto(input: $input) {
      isCompleted
    }
  }
`;

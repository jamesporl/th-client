import { gql } from '@apollo/client';

export default gql`
  fragment CommonSocialUrls on SocialUrls {
    facebook
    instagram
    twitter
    linkedIn
    github
  }
`;

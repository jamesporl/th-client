import { gql } from '@apollo/client';

export default gql`
  fragment CommonAppTag on AppTag {
    _id
    name
    slug
    appsCount
    imgUrl
  }
`;

import { gql } from '@apollo/client';

export default gql`
  fragment CommonAppComment on AppComment {
    _id
    createdBy {
      _id
      firstName
      lastName
      image
    }
    isParent
    htmlContent
    createdAt
    isPinned
    status {
      key
      label
    }
    supportsCount
    isSupported
    comments {
      nodes {
        _id
        createdBy {
          _id
          firstName
          lastName
          image
        }
        htmlContent
        createdAt
        status {
          key
          label
        }
        supportsCount
        isSupported
      }
      totalCount
    }
  }
`;

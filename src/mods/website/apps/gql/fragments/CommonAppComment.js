import { gql } from '@apollo/client';

export default gql`
  fragment CommonAppComment on AppComment {
    _id
    createdBy {
      _id
      firstName
      lastName
    }
    content
    createdAt
    isPinned
    status {
      key
      label
    }
    comments {
      nodes {
        _id
        createdBy {
          _id
          firstName
          lastName
        }
        content
        createdAt
        status {
          key
          label
        }
      }
      totalCount
    }
  }
`;

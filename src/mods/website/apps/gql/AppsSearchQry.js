import { gql } from '@apollo/client';

export default gql`
  query AppsSearch($searchString: String) {
    apps(searchString: $searchString) {
      nodes {
        _id
        name
        shortDesc
        logoImg {
          thumbnail
        }
        slug
      }
      totalCount
    }
  }
`;

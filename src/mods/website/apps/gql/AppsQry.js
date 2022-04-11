import { gql } from '@apollo/client';
import CommonApp from '../../profile/gql/fragments/CommonApp';

export default gql`
  query Apps(
    $page: Int
    $pageSize: Int
    $publishedFromDate: DateTime
    $publishedToDate: DateTime
    $otherFilters: [AppsOtherFilter!]
  ) {
    apps(
      page: $page
      pageSize: $pageSize
      publishedFromDate: $publishedFromDate
      publishedToDate: $publishedToDate
      otherFilters: $otherFilters
    ) {
      nodes {
        ...CommonApp
      }
      totalCount
    }
  }
  ${CommonApp}
`;

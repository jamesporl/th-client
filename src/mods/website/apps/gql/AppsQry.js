import { gql } from '@apollo/client';
import CommonListApp from 'mods/website/profile/gql/fragments/CommonListApp';

export default gql`
  query Apps(
    $page: Int
    $pageSize: Int
    $tagSlug: String
    $publishedFromDate: DateTime
    $publishedToDate: DateTime
    $otherFilters: [AppsOtherFilter!]
    $sortBy: AppsSortBy
  ) {
    apps(
      page: $page
      pageSize: $pageSize
      tagSlug: $tagSlug
      publishedFromDate: $publishedFromDate
      publishedToDate: $publishedToDate
      otherFilters: $otherFilters
      sortBy: $sortBy
    ) {
      nodes {
        ...CommonListApp
      }
      totalCount
    }
  }
  ${CommonListApp}
`;

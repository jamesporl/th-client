import React, { useCallback, useState } from 'react';
import { useApolloClient } from '@apollo/client';
import { Button, Text } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import momentTz from 'moment-timezone';
import App from './App';
import AppsQry from '../../../gql/AppsQry';
import AppSkeleton from './AppSkeleton';

export const APPS_PAGE_SIZE = 6;

const AppsByMonth = ({ month, apps: initialApps, totalCount }) => {
  // month here is a date (not moment) that is the start of a month in UTC
  const apolloClient = useApolloClient();

  const [page, setPage] = useState(1);
  const [apps, setApps] = useState(initialApps);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const handleClickMore = useCallback(async () => {
    setIsLoadingMore(true);
    const startOfMonth = momentTz(month);
    const endOfMonth = startOfMonth.clone().endOf('month');
    const { data } = await apolloClient.query({
      query: AppsQry,
      variables: {
        publishedFromDate: startOfMonth.toISOString(),
        publishedToDate: endOfMonth.toISOString(),
        otherFilters: ['excludeFeatured'],
        page: page + 1,
        pageSize: APPS_PAGE_SIZE,
      },
    });
    setPage(page + 1);
    setIsLoadingMore(false);
    setApps([...apps, ...data.apps.nodes]);
  }, [apps, page, month]);

  const monthTz = momentTz(month).tz('Asia/Manila');
  let formattedMonth = monthTz.format('MMMM YYYY');
  const startOfMonth = momentTz().tz('Asia/Manila').startOf('month');
  const lastMonth = startOfMonth.clone().subtract(1, 'day').startOf('month');
  if (lastMonth.isSame(momentTz(month))) {
    formattedMonth = 'Last Month';
  } else if (startOfMonth.get('year') === momentTz(month).get('year')) {
    formattedMonth = monthTz.format('MMMM');
    if (startOfMonth.get('month') === monthTz.get('month')) {
      formattedMonth = 'This Month';
    }
  }

  let seeMoreBtn = null;
  if (apps.length < totalCount) {
    seeMoreBtn = (
      <Button size="sm" width="100%" onClick={handleClickMore} className="vertical-item app">
        See more...
      </Button>
    );
  }

  let loadingComp = null;
  if (isLoadingMore) {
    loadingComp = (
      <div className="vertical-item app">
        <AppSkeleton />
      </div>
    );
  }

  if (apps.length) {
    return (
      <div className="vertical-item group">
        <Text fontSize="xl" fontWeight="500">
          {formattedMonth}
        </Text>
        {apps.map((app) => (
          <div className="vertical-item app" key={`${month}-${app._id}`}>
            <App app={app} />
          </div>
        ))}
        {loadingComp}
        {seeMoreBtn}
      </div>
    );
  }
  return null;
};

AppsByMonth.propTypes = {
  month: PropTypes.string.isRequired,
  apps: PropTypes.array.isRequired,
  totalCount: PropTypes.number.isRequired,
};

export default AppsByMonth;

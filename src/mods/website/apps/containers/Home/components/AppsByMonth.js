import React, { useCallback, useState } from 'react';
import { useApolloClient } from '@apollo/client';
import { Button, Text } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import moment from 'moment';
import App from './App';
import AppsQry from '../../../gql/AppsQry';
import AppSkeleton from './AppSkeleton';

export const APPS_PAGE_SIZE = 6;

const AppsByMonth = ({ month, apps: initialApps, totalCount }) => {
  const apolloClient = useApolloClient();

  const [page, setPage] = useState(1);
  const [apps, setApps] = useState(initialApps);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const handleClickMore = useCallback(async () => {
    setIsLoadingMore(true);
    const startOfMonth = moment(month);
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

  let formattedMonth = moment(month).format('MMMM YYYY');
  const today = moment.utc();
  const lastMonth = moment().startOf('month').subtract(1, 'day').startOf('month');
  if (lastMonth.isSame(moment(month))) {
    formattedMonth = 'Last Month';
  } else if (today.get('year') === moment(month).get('year')) {
    formattedMonth = moment(month).format('MMMM');
    if (today.get('month') === moment(month).get('month')) {
      formattedMonth = 'This Month';
    }
  }

  let seeMoreBtn = null;
  if (apps.length < totalCount) {
    seeMoreBtn = (
      <Button size="sm" width="100%" onClick={handleClickMore}>
        See more...
      </Button>
    );
  }

  let loadingComp = null;
  if (isLoadingMore) {
    loadingComp = <AppSkeleton />;
  }

  if (apps.length) {
    return (
      <>
        <Text mt={6} mb={6} fontSize="xl" fontWeight="500">
          {formattedMonth}
        </Text>
        {apps.map((app) => (
          <App key={app._id} app={app} />
        ))}
        {loadingComp}
        {seeMoreBtn}
      </>
    );
  }
  return null;
};

AppsByMonth.propTypes = {
  month: PropTypes.string.isRequired,
  apps: PropTypes.string.isRequired,
  totalCount: PropTypes.number.isRequired,
};

export default AppsByMonth;

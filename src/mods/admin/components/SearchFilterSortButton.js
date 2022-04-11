import React, { useCallback } from 'react';
import { FilterOutlined, SearchOutlined, SortAscendingOutlined } from '@ant-design/icons';
import { Button } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import useStores from 'core/stores/useStores';

const SearchFilterSortButton = ({ searchCompKey }) => {
  const { adminUIStore } = useStores();

  const handleClick = useCallback(
    () => adminUIStore.openSearchDrawer({ searchCompKey }),
    [searchCompKey],
  );

  return (
    <Button colorScheme="blue" size="sm" variant="outline" onClick={handleClick}>
      <SearchOutlined />
      &nbsp;
      <FilterOutlined />
      &nbsp;
      <SortAscendingOutlined />
    </Button>
  );
};

SearchFilterSortButton.propTypes = {
  searchCompKey: PropTypes.string.isRequired,
};

SearchFilterSortButton.defaultProps = {};

export default SearchFilterSortButton;

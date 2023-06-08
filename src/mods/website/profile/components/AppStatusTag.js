import React from 'react';
import { Tag } from '@chakra-ui/react';
import PropTypes from 'prop-types';

const AppStatusTag = ({ appStatus }) => {
  const { key, label } = appStatus;

  let colorScheme = 'green';
  if (key === 'unpublished') {
    colorScheme = 'orange';
  }

  return (
    <Tag colorScheme={colorScheme} variant="solid">
      {label}
    </Tag>
  );
};

AppStatusTag.propTypes = {
  appStatus: PropTypes.object,
};

AppStatusTag.defaultProps = {
  appStatus: {},
};

export default AppStatusTag;

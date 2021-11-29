import React from 'react';
import { Tag } from '@chakra-ui/react';
import PropTypes from 'prop-types';

const AppStatusTag = ({ appStatus }) => {
  const { key, label } = appStatus;

  let color = '#ff851b';
  if (key === 'submitted') {
    color = '#39cccc';
  } else if (key === 'approved') {
    color = '#2ecc40';
  } else if (key === 'published') {
    color = '#0074d9';
  }
  return <Tag color={color}>{label}</Tag>;
};

AppStatusTag.propTypes = {
  appStatus: PropTypes.object,
};

AppStatusTag.defaultProps = {
  appStatus: {},
};

export default AppStatusTag;

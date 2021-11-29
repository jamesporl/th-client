import React from 'react';
import { Tag } from '@chakra-ui/react';
import PropTypes from 'prop-types';

const AppDraftStatusTag = ({ appDraftStatus }) => {
  const { key, label } = appDraftStatus;

  let colorScheme = 'orange';
  if (key === 'submitted') {
    colorScheme = 'teal'; // teal
  } else if (key === 'approved') {
    colorScheme = 'green'; // green
  }

  return (
    <Tag colorScheme={colorScheme} variant="solid">
      {label}
    </Tag>
  );
};

AppDraftStatusTag.propTypes = {
  appDraftStatus: PropTypes.object,
};

AppDraftStatusTag.defaultProps = {
  appDraftStatus: {},
};

export default AppDraftStatusTag;

import React from 'react';
import { Tag } from 'antd';
import PropTypes from 'prop-types';

const AppDraftStatusTag = ({ appDraftStatus }) => {
  const { key, label } = appDraftStatus;

  let color = '#ff851b'; // orange
  if (key === 'submitted') {
    color = '#39cccc'; // teal
  } else if (key === 'approved') {
    color = '#2ecc40'; // green
  }

  return <Tag color={color}>{label}</Tag>;
};

AppDraftStatusTag.propTypes = {
  appDraftStatus: PropTypes.object,
};

AppDraftStatusTag.defaultProps = {
  appDraftStatus: {},
};

export default AppDraftStatusTag;

import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

const FormattedDate = ({ date, format }) => {
  let formattedDate = '';
  if (date) {
    if (format === 'dateTime') {
      formattedDate = moment(date).format('MMM D, YYYY h:mm A');
    } else if (format === 'shortDate') {
      if (moment(date).get('year') === moment().get('year')) {
        formattedDate = moment(date).format('MMM D');
      } else {
        formattedDate = moment(date).format('MMM D, YYYY');
      }
    } else {
      formattedDate = moment(date).format('MMM D, YYYY');
    }
  }
  return <>{formattedDate}</>;
};

FormattedDate.propTypes = {
  date: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string]),
  format: PropTypes.oneOf(['date', 'dateTime', 'shortDate']),
};

FormattedDate.defaultProps = {
  date: '',
  format: 'date',
};

export default FormattedDate;

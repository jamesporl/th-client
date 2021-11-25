import React from 'react';
import { Steps } from 'antd';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import useStores from 'core/stores/useStores';

const NewAppSteps = ({ activeStep, onChangeStep }) => {
  const { uiStore } = useStores();

  let direction = 'horizontal';
  if (uiStore.screenwidth <= 767) {
    direction = 'vertical';
  }

  return (
    <Steps
      direction={direction}
      type="navigation"
      size="small"
      current={activeStep}
      onChange={onChangeStep}
      className="site-navigation-steps"
    >
      <Steps.Step title="Main details" status="process" />
      <Steps.Step title="Assets" status="process" />
      <Steps.Step title="Description" status="process" />
      <Steps.Step title="Preview and Submit" status="process" />
    </Steps>
  );
};

NewAppSteps.propTypes = {
  activeStep: PropTypes.number,
  onChangeStep: PropTypes.func.isRequired,
};

NewAppSteps.defaultProps = {
  activeStep: 0,
};

export default observer(NewAppSteps);

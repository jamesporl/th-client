import React, { useCallback } from 'react';
import { Button } from '@chakra-ui/react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import useStores from 'core/stores/useStores';

const AuthButton = (props) => {
  const { children, onClick, ...buttonProps } = props;

  const { authStore } = useStores();

  const router = useRouter();

  const handleClick = useCallback(() => {
    if (authStore.myProfile) {
      onClick();
    } else {
      router.push('/account/login');
    }
  }, [authStore.myProfile, onClick]);

  return (
    <Button {...buttonProps} onClick={handleClick}>
      {children}
    </Button>
  );
};

AuthButton.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
};

AuthButton.defaultProps = {
  onClick: () => undefined,
};

export default observer(AuthButton);

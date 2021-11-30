import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Text, Flex, Button } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { SmileOutlined, SmileTwoTone } from '@ant-design/icons';
import ToggleAppSupportMtn from '../../../gql/ToggleAppSupportMtn';

const SupportBlock = ({ app }) => {
  const [supportsCount, setSupportsCount] = useState(app.supportsCount);
  const [isSupported, setIsSupported] = useState(app.isSupported);

  const [toggleAppSupport] = useMutation(ToggleAppSupportMtn);

  const submitToServer = () => {
    const input = { appId: app._id };
    toggleAppSupport({ variables: { input } });
  };

  const handleClickSupport = () => {
    setIsSupported(true);
    setSupportsCount((c) => c + 1);
    submitToServer();
  };

  const handleClickUnsupport = () => {
    setIsSupported(false);
    setSupportsCount((c) => c - 1);
    submitToServer();
  };

  let supportBtn = (
    <Button
      colorScheme="gray"
      variant="ghost"
      leftIcon={<SmileOutlined />}
      size="md"
      mr="4"
      onClick={handleClickSupport}
    >
      Support this app
    </Button>
  );
  if (isSupported) {
    supportBtn = (
      <Button
        colorScheme="blue"
        variant="ghost"
        leftIcon={<SmileTwoTone />}
        size="md"
        mr="4"
        onClick={handleClickUnsupport}
      >
        Supported
      </Button>
    );
  }

  let supportText = 'supports';
  if (supportsCount === 1) {
    supportText = 'support';
  }

  return (
    <Flex mt={4} alignItems="center">
      {supportBtn}
      <Text fontWeight="bold">{`${supportsCount} ${supportText}`} </Text>
    </Flex>
  );
};

SupportBlock.propTypes = {
  app: PropTypes.object.isRequired,
};

export default SupportBlock;

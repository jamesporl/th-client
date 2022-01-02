import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Text, Flex, Button } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { SmileOutlined, SmileTwoTone } from '@ant-design/icons';

const SupportComment = ({
  commentId,
  supportsCount: iSupportsCount,
  isSupported: iIsSupported,
}) => {
  const [supportsCount, setSupportsCount] = useState(iSupportsCount);
  const [isSupported, setIsSupported] = useState(iIsSupported);

  const submitToServer = () => {
    const input = { commentId };
    // toggleAppSupport({ variables: { input } });
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
      colorScheme="blue"
      variant="ghost"
      leftIcon={<SmileOutlined />}
      size="sm"
      onClick={handleClickSupport}
      mr={2}
    >
      Support
    </Button>
  );
  if (isSupported) {
    supportBtn = (
      <Button
        colorScheme="blue"
        variant="ghost"
        leftIcon={<SmileTwoTone />}
        size="sm"
        onClick={handleClickUnsupport}
        mr={2}
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
    <Flex alignItems="center">
      {supportBtn}
      <Text fontSize="sm" color="gray.600">
        {`${supportsCount} ${supportText}`}
      </Text>
    </Flex>
  );
};

SupportComment.propTypes = {
  commentId: PropTypes.string.isRequired,
  supportsCount: PropTypes.number.isRequired,
  isSupported: PropTypes.bool.isRequired,
};

export default SupportComment;

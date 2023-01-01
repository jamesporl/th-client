import React, { useState, useCallback } from 'react';
import { useMutation } from '@apollo/client';
import { Text, Flex } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import AuthButton from 'mods/website/components/AuthButton';
import { HeartOutlined } from '@ant-design/icons';
import ToggleAppCommentSupportMtn from '../../gql/ToggleAppCommentSupportMtn';

const SupportComment = ({
  commentId,
  supportsCount: iSupportsCount,
  isSupported: iIsSupported,
}) => {
  const [supportsCount, setSupportsCount] = useState(iSupportsCount);
  const [isSupported, setIsSupported] = useState(iIsSupported);

  const [toggleAppCommentSupport] = useMutation(ToggleAppCommentSupportMtn);

  const handleClickSupport = useCallback(() => {
    setIsSupported(!isSupported);
    if (isSupported) {
      setSupportsCount((c) => c - 1);
    } else {
      setSupportsCount((c) => c + 1);
    }
    const input = { commentId };
    toggleAppCommentSupport({ variables: { input } });
  }, [isSupported]);

  return (
    <Flex alignItems="center">
      <AuthButton
        colorScheme={isSupported ? 'blue' : 'gray'}
        variant={isSupported ? 'solid' : 'outline'}
        onClick={handleClickSupport}
        size="xs"
        leftIcon={<HeartOutlined />}
        mr={4}
      >
        Support
      </AuthButton>
      <Text fontSize="sm" color="gray.500">{` ${supportsCount}`}</Text>
    </Flex>
  );
};

SupportComment.propTypes = {
  commentId: PropTypes.string.isRequired,
  supportsCount: PropTypes.number.isRequired,
  isSupported: PropTypes.bool.isRequired,
};

export default SupportComment;

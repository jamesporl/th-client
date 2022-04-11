import React, { useState, useCallback } from 'react';
import { useMutation } from '@apollo/client';
import { Text, Flex, Button } from '@chakra-ui/react';
import PropTypes from 'prop-types';
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
      <Button
        colorScheme={isSupported ? 'blue' : 'gray'}
        variant={isSupported ? 'solid' : 'outline'}
        onClick={handleClickSupport}
        size="xs"
        mr={4}
      >
        Support
      </Button>
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

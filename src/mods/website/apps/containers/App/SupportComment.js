import React, { useState, useCallback } from 'react';
import { useMutation } from '@apollo/client';
import { Text, Flex, Button } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { SmileOutlined, SmileTwoTone } from '@ant-design/icons';
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

  let supportText = 'supports';
  if (supportsCount === 1) {
    supportText = 'support';
  }

  let supportIcon = <SmileTwoTone style={{ fontSize: 20 }} />;
  if (!isSupported) {
    supportIcon = <SmileOutlined style={{ fontSize: 20, color: '#2b6cb0' }} />;
  }

  return (
    <Flex alignItems="center">
      <Button
        className="support-btn"
        colorScheme="blue"
        variant="link"
        onClick={handleClickSupport}
        size="sm"
        style={{ textDecoration: 'none' }}
      >
        {supportIcon}
        <Text fontWeight="bold" ml={2}>
          {`${supportsCount} ${supportText}`}
        </Text>
      </Button>
    </Flex>
  );
};

SupportComment.propTypes = {
  commentId: PropTypes.string.isRequired,
  supportsCount: PropTypes.number.isRequired,
  isSupported: PropTypes.bool.isRequired,
};

export default SupportComment;

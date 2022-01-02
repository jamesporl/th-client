import React, { useCallback, useState } from 'react';
import { Button, Flex, Avatar } from '@chakra-ui/react';
import useStores from 'core/stores/useStores';
import PropTypes from 'prop-types';
import { SendOutlined } from '@ant-design/icons';
import Editor from '../../../components/Editor/DynamicEditor';

const CommentInput = ({ placeholder, onSubmitComment }) => {
  const { authStore } = useStores();

  const [newComment, setNewComment] = useState('');

  const handleSubmitAddComment = useCallback(() => {
    if (newComment) {
      onSubmitComment(newComment);
    }
  }, [newComment]);

  return (
    <Flex w="100%">
      <Flex mr={4} mt={2}>
        <Avatar name={authStore.myProfile?.firstName} size="sm" />
      </Flex>
      <Flex flexGrow={1} flexDir="column">
        <Editor onChange={setNewComment} minHeight="1rem" toolbarHidden placeholder={placeholder} />
        <Flex mt={2}>
          <Button
            colorScheme="blue"
            leftIcon={<SendOutlined />}
            size="sm"
            onClick={handleSubmitAddComment}
          >
            Post
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};
CommentInput.propTypes = {
  placeholder: PropTypes.string.isRequired,
  onSubmitComment: PropTypes.func.isRequired,
};

CommentInput.defaultProps = {};

export default CommentInput;

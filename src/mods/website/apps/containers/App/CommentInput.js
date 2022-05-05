import React, { useCallback, useState, useRef } from 'react';
import { Flex, Avatar } from '@chakra-ui/react';
import useStores from 'core/stores/useStores';
import PropTypes from 'prop-types';
import { SendOutlined } from '@ant-design/icons';
import AuthButton from 'mods/website/components/AuthButton';
import Editor from '../../../components/Editor/DynamicEditor';

const CommentInput = ({ placeholder, onSubmitComment, onRefetchComments }) => {
  const { authStore } = useStores();

  const [newComment, setNewComment] = useState('');
  const editorRef = useRef(null);

  const handleSubmitAddComment = useCallback(async () => {
    if (newComment) {
      await onSubmitComment(newComment);
      editorRef?.current?.setValue('');
      onRefetchComments();
    }
  }, [newComment, onRefetchComments, onSubmitComment]);

  return (
    <Flex w="100%">
      <Flex mr={4} mt={2}>
        <Avatar
          name={authStore.myProfile?.firstName}
          src={authStore.myProfile?.image?.thumbnail}
          size="sm"
        />
      </Flex>
      <Flex flexGrow={1} flexDir="column">
        <Editor
          onChange={setNewComment}
          minHeight="1rem"
          toolbarHidden
          placeholder={placeholder}
          ref={editorRef}
        />
        <Flex mt={2}>
          <AuthButton
            colorScheme="blue"
            leftIcon={<SendOutlined />}
            size="sm"
            onClick={handleSubmitAddComment}
          >
            Post
          </AuthButton>
        </Flex>
      </Flex>
    </Flex>
  );
};
CommentInput.propTypes = {
  placeholder: PropTypes.string.isRequired,
  onRefetchComments: PropTypes.func.isRequired,
  onSubmitComment: PropTypes.func.isRequired,
};

CommentInput.defaultProps = {};

export default CommentInput;

/* eslint-disable react/no-danger */
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Box, Flex, useToast } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import AddCommentToAppMtn from '../../gql/AddCommentToAppMtn';
import CommentInput from './CommentInput';
import CommentContent from './CommentContent';
import TogglePinAppCommentMtn from '../../gql/TogglePinAppCommentMtn';

const Comment = ({ app, comment, onRefetchComments }) => {
  const [showReply, setShowReply] = useState(false);

  const toast = useToast();

  const [addCommentToApp] = useMutation(AddCommentToAppMtn);
  const [togglePinAppComment] = useMutation(TogglePinAppCommentMtn);

  const handleClickPinComment = async () => {
    try {
      const input = { commentId: comment._id };
      await togglePinAppComment({ variables: { input } });
      onRefetchComments();
    } catch (error) {
      toast({ position: 'top', status: 'error', variant: 'subtle', description: error.message });
    }
  };

  const handleSubmitAddComment = async (content) => {
    try {
      const input = { appId: app._id, jsonContent: content, parentCommentId: comment._id };
      await addCommentToApp({ variables: { input } });
      toast({
        position: 'top',
        status: 'success',
        variant: 'subtle',
        description: 'Your feedback has been posted',
      });
      setShowReply(false);
    } catch (error) {
      toast({ position: 'top', status: 'error', variant: 'subtle', description: error.message });
    }
  };

  const handleClickReply = () => {
    setShowReply((s) => !s);
  };

  let replyInput = null;
  if (showReply) {
    replyInput = (
      <CommentInput
        placeholder="Contribute to the the discussion"
        onRefetchComments={onRefetchComments}
        onSubmitComment={handleSubmitAddComment}
      />
    );
  }

  let childCommentsList = null;
  if (comment.comments?.nodes.length) {
    childCommentsList = comment.comments.nodes.map((c) => <CommentContent comment={c} app={app} />);
  }

  return (
    <>
      <Flex mt={8} w="100%">
        <CommentContent
          comment={comment}
          app={app}
          onClickReply={handleClickReply}
          onClickPinComment={handleClickPinComment}
        />
      </Flex>
      <Box pl={12} mt={2} w="100%">
        {replyInput}
        {childCommentsList}
      </Box>
    </>
  );
};

Comment.propTypes = {
  app: PropTypes.object.isRequired,
  comment: PropTypes.object.isRequired,
  onRefetchComments: PropTypes.func.isRequired,
};

export default observer(Comment);

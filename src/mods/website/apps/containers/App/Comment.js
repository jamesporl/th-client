/* eslint-disable react/no-danger */
import React, { useState, useCallback } from 'react';
import { RollbackOutlined } from '@ant-design/icons';
import { useMutation } from '@apollo/client';
import { Avatar, Box, Button, Flex, HStack, Text, useToast } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import moment from 'moment';
import AddCommentToAppMtn from '../../gql/AddCommentToAppMtn';
import SupportComment from './SupportComment';
import CommentInput from './CommentInput';

const Comment = ({ app, comment }) => {
  const [showReply, setShowReply] = useState(false);

  const toast = useToast();

  const [addCommentToApp] = useMutation(AddCommentToAppMtn);

  const handleClickReply = () => {
    setShowReply((s) => !s);
  };

  const handleSubmitAddComment = useCallback(
    async (content) => {
      try {
        const input = { appId: app._id, content, parentCommentId: comment._id };
        await addCommentToApp({ variables: { input } });
        toast({
          position: 'top',
          status: 'success',
          variant: 'subtle',
          description: 'Your feedback has been posted',
        });
      } catch (error) {
        toast({ position: 'top', status: 'error', variant: 'subtle', description: error.message });
      }
    },
    [app],
  );

  let replyInput = null;
  if (showReply) {
    replyInput = (
      <CommentInput
        placeholder="Contribute to the the discussion"
        onSubmitComment={handleSubmitAddComment}
      />
    );
  }

  let childCommentsList = null;
  if (comment.comments?.nodes.length) {
    childCommentsList = comment.comments.nodes.map((c) => (
      <Flex mt={4} w="100%">
        <Flex mr={4} mt={2}>
          <Avatar name={c.createdBy?.firstName} size="sm" />
        </Flex>
        <Flex flexGrow={1} flexDir="column">
          <HStack spacing={2}>
            <Text fontSize="sm" color="gray.600">
              {`${c.createdBy.firstName} ${c.createdBy.lastName} • `}
            </Text>
            &bull;
            <Text fontSize="sm" color="gray.500" as="i">
              {moment(c.createdAt).fromNow()}
            </Text>
          </HStack>
          <div
            className="desc"
            dangerouslySetInnerHTML={{
              __html: c.content,
            }}
          />
          <HStack spacing={4} mt={2}>
            <SupportComment commentId={c._id} isSupported={false} supportsCount={10} />
          </HStack>
        </Flex>
      </Flex>
    ));
  }

  return (
    <>
      <Flex mt={4} w="100%">
        <Flex mr={4} mt={2}>
          <Avatar name={comment.createdBy?.firstName} size="sm" />
        </Flex>
        <Flex flexGrow={1} flexDir="column">
          <HStack spacing={2}>
            <Text fontSize="sm" color="gray.600">
              {`${comment.createdBy.firstName} ${comment.createdBy.lastName} • `}
            </Text>
            &bull;
            <Text fontSize="sm" color="gray.500" as="i">
              {moment(comment.createdAt).fromNow()}
            </Text>
          </HStack>
          <div
            className="desc"
            dangerouslySetInnerHTML={{
              __html: comment.content,
            }}
          />
          <HStack spacing={4} mt={2}>
            <SupportComment commentId={comment._id} isSupported={false} supportsCount={10} />
            <Button
              colorScheme="blue"
              variant="ghost"
              leftIcon={<RollbackOutlined />}
              size="sm"
              onClick={handleClickReply}
            >
              Reply
            </Button>
          </HStack>
        </Flex>
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
};

export default Comment;

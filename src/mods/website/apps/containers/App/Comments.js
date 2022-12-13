import React, { useCallback, useEffect } from 'react';
import { useLazyQuery, useMutation } from '@apollo/client';
import { Box, Flex, Text, useToast } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import AppCommentsQry from '../../gql/AppCommentsQry';
import AddCommentToAppMtn from '../../gql/AddCommentToAppMtn';
import Comment from './Comment';
import CommentInput from './CommentInput';

const Wrapper = styled.div`
  margin-top: 1rem;
`;

const Comments = ({ app }) => {
  const [getAppComments, { data: appCommentsData, refetch }] = useLazyQuery(AppCommentsQry);
  const [addCommentToApp] = useMutation(AddCommentToAppMtn);

  const toast = useToast();

  useEffect(() => {
    if (app?._id) {
      getAppComments({ variables: { appId: app._id } });
    }
  }, [app]);

  const handleSubmitAddComment = useCallback(
    async (content) => {
      try {
        const input = { appId: app._id, jsonContent: content };
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

  const { nodes: comments = [] } = appCommentsData?.appComments || {};

  let commentsList = (
    <Box textAlign="center">
      <Text color="gray.400" fontWeight="bold" textAlign="center" fontSize="lg">
        This app has no comments yet.
      </Text>
    </Box>
  );
  if (comments.length) {
    commentsList = comments.map((c) => (
      <Comment key={c._id} comment={c} app={app} onRefetchComments={refetch} />
    ));
  }

  if (!app) {
    return null;
  }

  return (
    <Wrapper>
      <Text fontSize="2xl" fontWeight="500">
        Share Your Feedback
      </Text>
      <Flex mt={8} w="100%">
        <CommentInput
          onSubmitComment={handleSubmitAddComment}
          placeholder="Got something nice to say about the app?"
          onRefetchComments={refetch}
        />
      </Flex>
      <Box mt={8}>{commentsList}</Box>
    </Wrapper>
  );
};
Comments.propTypes = {
  app: PropTypes.object,
};

Comments.defaultProps = {
  app: null,
};

export default Comments;

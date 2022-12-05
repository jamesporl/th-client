/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { MessageOutlined, MoreOutlined, PushpinOutlined } from '@ant-design/icons';
import {
  Avatar,
  Button,
  Flex,
  HStack,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Tag,
  TagLabel,
  TagLeftIcon,
} from '@chakra-ui/react';
import moment from 'moment';
import useStores from 'core/stores/useStores';
import SupportComment from './SupportComment';

const CommentContent = ({ app, comment, onClickReply, onClickPinComment }) => {
  const { authStore } = useStores();

  const otherMenuItems = [];
  if (comment.isParent && authStore.myProfile?._id === app.ownedBy._id) {
    let togglePinText = 'Pin Comment';
    if (comment.isPinned) {
      togglePinText = 'Unpin Comment';
    }
    otherMenuItems.push(
      <MenuItem icon={<PushpinOutlined />} onClick={onClickPinComment}>
        {togglePinText}
      </MenuItem>,
    );
  }

  let otherMenu = null;
  if (otherMenuItems.length) {
    otherMenu = (
      <Menu size="xs">
        <MenuButton
          as={IconButton}
          aria-label="Options"
          icon={<MoreOutlined />}
          variant="outline"
          size="xs"
          borderRadius="50%"
        />
        <MenuList>{otherMenuItems}</MenuList>
      </Menu>
    );
  }

  let pinnedTag = null;
  if (comment.isPinned) {
    pinnedTag = (
      <Tag size="sm" variant="solid" colorScheme="red">
        <TagLeftIcon boxSize="12px" as={PushpinOutlined} />
        <TagLabel>Pinned</TagLabel>
      </Tag>
    );
  }

  let creatorTag = null;
  if (comment.createdBy._id === authStore.myProfile?._id) {
    creatorTag = (
      <Tag size="sm" variant="outline" colorScheme="yellow">
        Creator
      </Tag>
    );
  }

  let replyBtn = null;
  if (comment.isParent) {
    replyBtn = (
      <Button
        colorScheme="blue"
        variant="link"
        onClick={onClickReply}
        style={{ textDecoration: 'none' }}
        size="xs"
      >
        <MessageOutlined style={{ fontSize: 16 }} />
        <Text ml={2}>Reply</Text>
      </Button>
    );
  }

  return (
    <Flex mt={4} w="100%">
      <Flex mr={comment.isParent ? 4 : 8} mt={2}>
        <Avatar
          name={comment.createdBy?.firstName}
          src={comment.createdBy?.image?.thumbnail}
          size="sm"
        />
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
          {pinnedTag}
          {creatorTag}
        </HStack>
        <div
          className="desc"
          dangerouslySetInnerHTML={{
            __html: comment.htmlContent,
          }}
        />
        <HStack spacing={8} mt={2}>
          <SupportComment
            commentId={comment._id}
            isSupported={comment.isSupported}
            supportsCount={comment.supportsCount}
          />
          {replyBtn}
          {otherMenu}
        </HStack>
      </Flex>
    </Flex>
  );
};

CommentContent.propTypes = {
  app: PropTypes.object.isRequired,
  comment: PropTypes.object.isRequired,
  onClickReply: PropTypes.func,
  onClickPinComment: PropTypes.func,
};

CommentContent.defaultProps = {
  onClickReply: () => undefined,
  onClickPinComment: () => undefined,
};

export default observer(CommentContent);

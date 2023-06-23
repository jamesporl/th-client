/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { DeleteOutlined, MessageOutlined, MoreOutlined, PushpinOutlined } from '@ant-design/icons';
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

const CommentContent = ({
  app,
  comment,
  onClickReply,
  onClickPinComment,
  onClickDeleteComment,
}) => {
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

  if (comment.createdBy._id === authStore.myProfile?._id) {
    otherMenuItems.push(
      <MenuItem icon={<DeleteOutlined />} onClick={onClickDeleteComment} color="red">
        Delete
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
  if (app.ownedBy._id === comment.createdBy._id) {
    creatorTag = (
      <Tag size="sm" variant="outline" colorScheme="yellow">
        Creator
      </Tag>
    );
  }

  let replyBtn = null;
  if (comment.isParent) {
    replyBtn = (
      <div>
        <Button
          colorScheme="blue"
          variant="link"
          onClick={onClickReply}
          style={{ textDecoration: 'none', marginLeft: 0 }}
          size="xs"
        >
          <MessageOutlined style={{ fontSize: 16 }} />
          <Text ml={1}>Reply</Text>
        </Button>
      </div>
    );
  }

  return (
    <Flex mt={2} w="100%">
      <Flex mr={comment.isParent ? 4 : 8} mt={2}>
        <Avatar name={comment.createdBy?.firstName} src={comment.createdBy?.image} size="sm" />
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
        <HStack spacing={4} mt={2}>
          <div>
            <SupportComment
              commentId={comment._id}
              isSupported={comment.isSupported}
              supportsCount={comment.supportsCount}
            />
          </div>
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
  onClickDeleteComment: PropTypes.func,
  onClickPinComment: PropTypes.func,
};

CommentContent.defaultProps = {
  onClickReply: () => undefined,
  onClickDeleteComment: () => undefined,
  onClickPinComment: () => undefined,
};

export default observer(CommentContent);

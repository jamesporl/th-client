import React from 'react';
import { useMutation } from '@apollo/client';
import { DeleteOutlined, DownOutlined, EditOutlined, UndoOutlined } from '@ant-design/icons';
import {
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  HStack,
  MenuDivider,
  useToast,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import AppHeader from 'mods/website/profile/components/AppHeader';
import AppDraftStatusTag from 'mods/website/profile/components/AppDraftStatusTag';
import UndoSubmitAppDraftMtn from 'mods/website/profile/gql/UndoSubmitAppDraftMtn';
import useStores from 'core/stores/useStores';

const AppDraft = ({ appDraft, refetchAppDrafts }) => {
  const router = useRouter();
  const toast = useToast();

  const { uiStore } = useStores();

  const [undoSubmitAppDraft] = useMutation(UndoSubmitAppDraftMtn);

  const handleClickEdit = async () => {
    router.push(`/my/apps/edit/${appDraft.appId}`);
  };

  const handleClickUndoSubmit = async () => {
    try {
      await undoSubmitAppDraft({ variables: { input: { appId: appDraft.appId } } });
    } catch (error) {
      toast({ position: 'top', status: 'error', variant: 'subtle', description: error.message });
    }
  };

  const handleClickDelete = () => {
    uiStore.openGlobalModal('confirmDeleteAppDraft', 'Please confirm', {
      appDraft,
      refetchAppDrafts,
    });
  };

  const menuItems = [];
  if (appDraft.status.key === 'inProgress') {
    menuItems.push(
      <MenuItem icon={<EditOutlined />} onClick={handleClickEdit}>
        Continue Editing
      </MenuItem>,
    );
  } else if (appDraft.status.key === 'submitted') {
    menuItems.push(
      <MenuItem icon={<UndoOutlined />} onClick={handleClickUndoSubmit}>
        Undo submission
      </MenuItem>,
    );
  }
  menuItems.push(<MenuDivider />);
  menuItems.push(
    <MenuItem icon={<DeleteOutlined />} color="red" onClick={handleClickDelete}>
      Delete
    </MenuItem>,
  );

  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      borderWidth="1px"
      padding={12}
      borderRadius={8}
    >
      <AppHeader app={appDraft} />
      <Flex justifyContent="flex-end" alignItems="center">
        <HStack spacing={8}>
          <AppDraftStatusTag appDraftStatus={appDraft.status} />
          <Menu placement="bottom-end">
            <MenuButton as={Button} rightIcon={<DownOutlined />}>
              Actions
            </MenuButton>
            <MenuList>{menuItems}</MenuList>
          </Menu>
        </HStack>
      </Flex>
    </Flex>
  );
};

AppDraft.propTypes = {
  appDraft: PropTypes.object.isRequired,
  refetchAppDrafts: PropTypes.func.isRequired,
};

export default AppDraft;

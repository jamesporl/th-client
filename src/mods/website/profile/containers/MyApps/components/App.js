import React from 'react';
import {
  DeleteOutlined,
  DownOutlined,
  EditOutlined,
  EyeOutlined,
  UndoOutlined,
} from '@ant-design/icons';
import {
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useToast,
  HStack,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { useMutation } from '@apollo/client';
import CreateAppDraftFromPublishedAppMtn from 'mods/website/profile/gql/CreateAppDraftFromPublishedAppMtn';
import AppHeader from 'mods/website/profile/components/AppHeader';
import UnpublishAppMtn from 'mods/website/profile/gql/UnpublishAppMtn';
import AppStatusTag from 'mods/website/profile/components/AppStatusTag';
import RepublishAppMtn from 'mods/website/profile/gql/RepublishAppMtn';
import useStores from 'core/stores/useStores';

const App = ({ app, refetchAppDrafts, refetchApps }) => {
  const toast = useToast();

  const { uiStore } = useStores();

  const router = useRouter();

  const [createAppDraftFromPublishedApp] = useMutation(CreateAppDraftFromPublishedAppMtn);
  const [unpublishApp] = useMutation(UnpublishAppMtn);
  const [republishApp] = useMutation(RepublishAppMtn);

  const handleClickEdit = async () => {
    try {
      await createAppDraftFromPublishedApp({ variables: { input: { appId: app._id } } });
      router.push(`/my/apps/edit/${app._id}`);
    } catch (error) {
      if (error.message.includes('Draft already exists')) {
        router.push(`/my/apps/edit/${app._id}`);
      } else {
        toast({ position: 'top', status: 'error', variant: 'subtle', description: error.message });
      }
    }
  };

  const handleClickUnpublish = async () => {
    try {
      await unpublishApp({ variables: { input: { appId: app._id } } });
      refetchApps();
      refetchAppDrafts();
    } catch (error) {
      toast({ position: 'top', status: 'error', variant: 'subtle', description: error.message });
    }
  };

  const handleClickRepublish = async () => {
    try {
      await republishApp({ variables: { input: { appId: app._id } } });
      refetchApps();
      refetchAppDrafts();
    } catch (error) {
      toast({ position: 'top', status: 'error', variant: 'subtle', description: error.message });
    }
  };

  const handleClickDelete = () => {
    uiStore.openGlobalModal('confirmDeleteApp', 'Please confirm', {
      app,
      refetchApps,
      refetchAppDrafts,
    });
  };

  const viewInSiteMenuItem = (
    <MenuItem
      icon={<EyeOutlined />}
      as="a"
      href={`/apps/${app.slug}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      View in Site
    </MenuItem>
  );

  const editMenuItem = (
    <MenuItem icon={<EditOutlined />} onClick={handleClickEdit}>
      Edit
    </MenuItem>
  );

  const unpublishMenuItem = (
    <MenuItem icon={<UndoOutlined />} onClick={handleClickUnpublish}>
      Unpublish
    </MenuItem>
  );

  const republishMenuItem = (
    <MenuItem icon={<UndoOutlined />} onClick={handleClickRepublish}>
      Republish
    </MenuItem>
  );

  const divider = <MenuDivider />;

  const deleteMenuItem = (
    <MenuItem icon={<DeleteOutlined />} color="red" onClick={handleClickDelete}>
      Delete
    </MenuItem>
  );

  let menuItems = [viewInSiteMenuItem, editMenuItem, unpublishMenuItem, divider, deleteMenuItem];

  if (app.status.key === 'unpublished') {
    menuItems = [editMenuItem, republishMenuItem, divider, deleteMenuItem];
  }

  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      borderWidth="1px"
      padding={12}
      borderRadius={8}
    >
      <AppHeader app={app} />
      <Flex justifyContent="flex-end" alignItems="center">
        <HStack spacing={8}>
          <AppStatusTag appStatus={app.status} />
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

App.propTypes = {
  app: PropTypes.object.isRequired,
  refetchApps: PropTypes.func.isRequired,
  refetchAppDrafts: PropTypes.func.isRequired,
};

export default App;

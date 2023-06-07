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
} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { useMutation } from '@apollo/client';
import CreateAppDraftFromPublishedAppMtn from 'mods/website/profile/gql/CreateAppDraftFromPublishedAppMtn';
import AppHeader from 'mods/website/profile/components/AppHeader';
import UnpublishAppMtn from 'mods/website/profile/gql/UnpublishAppMtn';

const App = ({ app, refetchAppDrafts, refetchApps }) => {
  const toast = useToast();

  const router = useRouter();

  const [createAppDraftFromPublishedApp] = useMutation(CreateAppDraftFromPublishedAppMtn);
  const [unpublishApp] = useMutation(UnpublishAppMtn);

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

  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      borderWidth="1px"
      padding={12}
      borderRadius={8}
    >
      <AppHeader app={app} />
      <Menu placement="bottom-end">
        <MenuButton as={Button} rightIcon={<DownOutlined />}>
          Actions
        </MenuButton>
        <MenuList>
          <MenuItem
            icon={<EyeOutlined />}
            as="a"
            href={`/apps/${app.slug}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            View in Site
          </MenuItem>
          <MenuItem icon={<EditOutlined />} onClick={handleClickEdit}>
            Edit
          </MenuItem>
          <MenuItem icon={<UndoOutlined />} onClick={handleClickUnpublish}>
            Unpublish
          </MenuItem>
          <MenuDivider />
          <MenuItem icon={<DeleteOutlined />}>Delete</MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
};

App.propTypes = {
  app: PropTypes.object.isRequired,
  refetchApps: PropTypes.func.isRequired,
  refetchAppDrafts: PropTypes.func.isRequired,
};

export default App;

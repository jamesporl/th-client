import React from 'react';
import { DeleteOutlined, DownOutlined, EditOutlined, UndoOutlined } from '@ant-design/icons';
import { Button, Flex, Menu, MenuButton, MenuList, MenuItem, MenuDivider } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import AppHeader from 'mods/website/profile/components/AppHeader';

const App = ({ app }) => {
  const handleClickEdit = () => undefined;

  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      borderWidth="1px"
      padding={4}
      borderRadius={8}
    >
      <AppHeader
        name={app.name}
        shortDesc={app.shortDesc}
        logoImgSrc={app.logoImg?.medium}
        tags={app.tags}
      />
      <Menu placement="bottom-end">
        <MenuButton as={Button} rightIcon={<DownOutlined />}>
          Actions
        </MenuButton>
        <MenuList>
          <MenuItem icon={<EditOutlined />} onClick={handleClickEdit}>
            Edit
          </MenuItem>
          <MenuItem icon={<UndoOutlined />}>Unpublish</MenuItem>
          <MenuDivider />
          <MenuItem icon={<DeleteOutlined />}>Delete</MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
};

App.propTypes = {
  app: PropTypes.object.isRequired,
};

export default App;

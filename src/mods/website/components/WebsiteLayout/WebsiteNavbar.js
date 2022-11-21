import React from 'react';
import {
  Avatar,
  Button,
  Collapse,
  Flex,
  HStack,
  InputGroup,
  InputLeftElement,
  Input,
  IconButton,
  Menu,
  MenuList,
  MenuItem,
  MenuDivider,
  MenuButton,
  useDisclosure,
  useBreakpointValue,
  VStack,
  Link,
} from '@chakra-ui/react';
import {
  AppstoreOutlined,
  CloseOutlined,
  LogoutOutlined,
  MenuOutlined,
  SearchOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { observer } from 'mobx-react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import useStores from 'core/stores/useStores';
import useClickSubmitAnApp from 'mods/website/hooks/useClickSubmitAnApp';
import SearchModal from './SearchModal';

const Wrapper = styled.div`
  .header {
    border-bottom: 1px solid #efefef;
    background-color: #fff;
    z-index: 1000;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;

    .nav-container {
      width: 100%;
      max-width: 1100px;
    }
  }
`;

const WebsiteNavbar = () => {
  const { authStore } = useStores();
  const router = useRouter();

  const handleClickSubmitAnApp = useClickSubmitAnApp();

  const { isOpen: isMobileNavOpen, onToggle: onToggleMobileNav } = useDisclosure();
  const { isOpen: isSearchOpen, onOpen: onOpenSearch, onClose: onCloseSearch } = useDisclosure();

  const handleClickLogout = () => {
    authStore.logout();
    window.location.href = '/';
  };

  const handleClickMyApps = () => {
    router.push('/my/apps');
  };

  const handleClickMyProfile = () => {
    router.push('/my/profile');
  };

  const handleClickSearch = () => {
    onOpenSearch();
  };

  const desktopLogoImg = <img src="/logo-full.png" alt="logo" width="200px" />;
  const mobileLogoImg = <img src="/logo-simple.png" alt="logo" width="40px" />;

  const submitAppBtn = (
    <Button colorScheme="blue" size="sm" onClick={handleClickSubmitAnApp}>
      Submit an App
    </Button>
  );

  let profileAvatar = null;

  if (authStore.myProfile) {
    const menu = (
      <MenuList>
        <MenuItem key="1" icon={<UserOutlined />} onClick={handleClickMyProfile}>
          My Profile
        </MenuItem>
        <MenuItem key="2" icon={<AppstoreOutlined />} onClick={handleClickMyApps}>
          My Apps
        </MenuItem>
        <MenuDivider />
        <MenuItem key="logout" icon={<LogoutOutlined />} onClick={handleClickLogout}>
          Log out
        </MenuItem>
      </MenuList>
    );

    profileAvatar = (
      <Menu placement="bottom-end" size="lg">
        <MenuButton>
          <Avatar
            name={authStore.myProfile?.firstName}
            size="sm"
            src={authStore.myProfile?.image?.thumbnail}
          />
        </MenuButton>
        {menu}
      </Menu>
    );
  }

  const desktopRightNav = (
    <HStack spacing="2rem">
      <NextLink href="/site/about-us" passHref>
        <Link style={{ textDecoration: 'none' }}>About Us</Link>
      </NextLink>
      {submitAppBtn}
      {profileAvatar}
    </HStack>
  );

  const mobileRightNavBtn = (
    <IconButton
      onClick={onToggleMobileNav}
      icon={isMobileNavOpen ? <CloseOutlined /> : <MenuOutlined />}
      variant="ghost"
      aria-label="Toggle Navigation"
    />
  );

  return (
    <Wrapper>
      <Flex
        as="header"
        position="fixed"
        w="100%"
        justifyContent="center"
        alignItems="center"
        h="60px"
        pl={4}
        pr={4}
        className="header"
      >
        <Flex alignItems="center" justifyContent="space-between" className="nav-container">
          <Flex alignItems="center" mr={8}>
            <NextLink href="/" as="/" passHref>
              <a>{useBreakpointValue({ base: mobileLogoImg, md: desktopLogoImg })}</a>
            </NextLink>
          </Flex>
          <Flex alignItems="center" flexGrow="1">
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<SearchOutlined style={{ color: '#ccc' }} />}
              />
              <Input placeholder="Search TechHustlers" size="md" onFocus={handleClickSearch} />
            </InputGroup>
          </Flex>
          <Flex alignItems="center" justifyContent="flex-end" ml={8}>
            {useBreakpointValue({ base: mobileRightNavBtn, md: desktopRightNav })}
          </Flex>
        </Flex>
      </Flex>
      <Collapse in={isMobileNavOpen} animateOpacity style={{ paddingTop: '60px' }}>
        <VStack p={4} display={{ md: 'none' }}>
          {submitAppBtn}
        </VStack>
      </Collapse>
      <SearchModal isOpen={isSearchOpen} onClose={onCloseSearch} />
    </Wrapper>
  );
};

export default observer(WebsiteNavbar);

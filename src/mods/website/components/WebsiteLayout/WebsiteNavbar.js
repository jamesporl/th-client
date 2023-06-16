import React from 'react';
import {
  Avatar,
  Box,
  Button,
  Slide,
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
  VStack,
} from '@chakra-ui/react';
import {
  AppstoreOutlined,
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
    }
  }

  .logo-image-desktop {
    display: none;

    @media only screen and (min-width: 768px) {
      display: block;
    }
  }

  .logo-image-mobile {
    display: block;

    @media only screen and (min-width: 768px) {
      display: none;
    }
  }

  .right-nav-desktop {
    display: none;

    @media only screen and (min-width: 992px) {
      display: block;
    }
  }

  .right-nav-mobile {
    display: block;

    @media only screen and (min-width: 992px) {
      display: none;
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

  const submitAppDesktopBtn = (
    <Button colorScheme="blue" size="sm" onClick={handleClickSubmitAnApp}>
      Submit an App
    </Button>
  );

  const aboutUsBtn = (
    <NextLink href="/site/about-us" passHref legacyBehavior>
      <Button colorScheme="blue" size="sm" variant="link" as="a">
        About Us
      </Button>
    </NextLink>
  );

  const categoriesBtn = (
    <NextLink href="/categories" passHref legacyBehavior>
      <Button colorScheme="blue" size="sm" variant="link" as="a">
        Categories
      </Button>
    </NextLink>
  );

  let profileAvatar = null;
  let loginDesktopBtn = null;
  let loginMobileBtn = null;

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
            src={authStore.myProfile?.image}
          />
        </MenuButton>
        {menu}
      </Menu>
    );
  } else {
    loginDesktopBtn = (
      <NextLink href="/account/login" legacyBehavior>
        <Button colorScheme="blue" size="sm" variant="outline">
          Log in
        </Button>
      </NextLink>
    );
    loginMobileBtn = (
      <Box>
        <NextLink href="/account/login" legacyBehavior>
          <Button colorScheme="blue" size="sm" variant="link">
            Log in
          </Button>
        </NextLink>
      </Box>
    );
  }

  const desktopRightNav = (
    <HStack spacing="1rem" className="right-nav-desktop">
      {categoriesBtn}
      {aboutUsBtn}
      {loginDesktopBtn}
      {submitAppDesktopBtn}
      {profileAvatar}
    </HStack>
  );

  const mobileRightNavBtn = (
    <HStack spacing="0.5rem" className="right-nav-mobile">
      <IconButton
        onClick={onToggleMobileNav}
        icon={<MenuOutlined />}
        variant="ghost"
        aria-label="Toggle Navigation"
      />
      {profileAvatar}
    </HStack>
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
          <Flex alignItems="center" mr={8} flexGrow={1}>
            <div className="logo-image-desktop">
              <NextLink href="/" as="/" passHref legacyBehavior>
                <a>{desktopLogoImg}</a>
              </NextLink>
            </div>
            <div className="logo-image-mobile">
              <NextLink href="/" as="/" passHref legacyBehavior>
                <a>{mobileLogoImg}</a>
              </NextLink>
            </div>
            <Box ml={8} flexGrow={1}>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<SearchOutlined style={{ color: '#ccc' }} />}
                />
                <Input
                  placeholder="Search TechHustlers"
                  size="md"
                  onFocus={handleClickSearch}
                  w="100%"
                  maxW={400}
                />
              </InputGroup>
            </Box>
          </Flex>
          <Flex alignItems="center" justifyContent="flex-end" className="right-nav">
            {desktopRightNav}
            {mobileRightNavBtn}
          </Flex>
        </Flex>
      </Flex>
      <Slide
        in={isMobileNavOpen}
        direction="top"
        style={{
          paddingTop: '60px',
          boxShadow: 'rgba(99, 99, 99, 0.05) 0px 8px 8px 0px',
          borderBottom: '1px solid #efefef',
          opacity: 1,
          backgroundColor: '#fff',
          zIndex: 10,
        }}
      >
        <VStack p={4} display={{ lg: 'none' }}>
          <Box>{categoriesBtn}</Box>
          <Box>{aboutUsBtn}</Box>
          {loginMobileBtn}
          <Box>
            <Button colorScheme="blue" size="sm" onClick={handleClickSubmitAnApp} variant="link">
              Submit an App
            </Button>
          </Box>
        </VStack>
      </Slide>
      <SearchModal isOpen={isSearchOpen} onClose={onCloseSearch} />
    </Wrapper>
  );
};

export default observer(WebsiteNavbar);

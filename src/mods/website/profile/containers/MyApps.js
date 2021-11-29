import React from 'react';
import { DeleteOutlined, DownOutlined, EditOutlined } from '@ant-design/icons';
import {
  Button,
  Box,
  Flex,
  Heading,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  HStack,
  MenuDivider,
} from '@chakra-ui/react';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import WebsiteLayout from 'mods/website/components/WebsiteLayout';
import MyAppDraftsQry from '../gql/MyAppDraftsQry';
import AppDraftStatusTag from '../components/AppDraftStatusTag';
import AppHeader from '../components/AppHeader';

const Wrapper = styled.div`
  .content-container {
    margin-top: 3rem;

    .ant-avatar {
      img {
        border-radius: 0.25rem;
      }
    }
  }
`;

const MyApps = () => {
  const { data: draftsData, loading } = useQuery(MyAppDraftsQry, { fetchPolicy: 'network-only' });

  const router = useRouter();

  const { nodes: drafts = [] } = draftsData?.myAppDrafts || {};

  const handleClickEdit = async (_id) => {
    router.push(`/my/apps/edit/${_id}`);
  };

  let draftsList = null;
  if (!loading) {
    if (!drafts.length) {
      draftsList = <Text type="secondary">Looks like you do not have apps yet. Submit one!</Text>;
    } else {
      draftsList = drafts.map((d) => (
        <Flex
          justifyContent="space-between"
          alignItems="center"
          key={d._id}
          borderWidth="1px"
          padding={4}
          borderRadius={8}
        >
          <AppHeader
            name={d.name}
            shortDesc={d.shortDesc}
            logoImgSrc={d.logoImg?.medium}
            tags={d.tags}
          />
          <Flex justifyContent="flex-end" alignItems="center">
            <HStack spacing={8}>
              <AppDraftStatusTag appDraftStatus={d.status} />
              <Menu placement="bottom-end">
                <MenuButton as={Button} rightIcon={<DownOutlined />}>
                  Actions
                </MenuButton>
                <MenuList>
                  <MenuItem icon={<EditOutlined />} onClick={() => handleClickEdit(d.appId)}>
                    Continue Editing
                  </MenuItem>
                  <MenuDivider />
                  <MenuItem icon={<DeleteOutlined />}>Delete</MenuItem>
                </MenuList>
              </Menu>
            </HStack>
          </Flex>
        </Flex>
      ));
    }
  }
  return (
    <WebsiteLayout>
      <Helmet title="My Apps" />
      <Wrapper>
        <Heading as="h1" size="lg">
          My Apps
        </Heading>
        <Box mt={8}>
          <Heading as="h4" size="md">
            DRAFTS
          </Heading>
          <Box mt={8}>{draftsList}</Box>
        </Box>
      </Wrapper>
    </WebsiteLayout>
  );
};
export default MyApps;

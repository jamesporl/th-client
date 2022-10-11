import React from 'react';
import { useApolloClient } from '@apollo/client';
import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react';
import { observer } from 'mobx-react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import useStores from 'core/stores/useStores';
import WebsiteLayout from 'mods/website/components/WebsiteLayout';
import MyProfileQry from 'mods/auth/gql/MyProfileQry';
import ResetPasswordForm from './ResetPasswordForm';
import UpdateEmailForm from './UpdateEmailForm';
import PersonalInfoForm from './PresonalInfoForm';
import UploadPhoto from './UploadPhoto';

const Wrapper = styled.div`
  .profile-box {
    width: 100%;
    max-width: 800px;
    border: 1px solid #ccc;
    padding: 1rem;
    border-radius: 1rem;

    :not(:first-child) {
      margin-top: 2rem;
    }
  }
`;

const Profile = () => {
  const { authStore } = useStores();

  const apolloClient = useApolloClient();

  const handleRefetchMyProfile = async () => {
    const result = await apolloClient.query({ query: MyProfileQry, fetchPolicy: 'network-only' });
    authStore.setMyProfile(result.data.myProfile);
  };

  return (
    <WebsiteLayout>
      <Helmet title="My Profile" />
      <Wrapper>
        <Heading as="h1" size="lg">
          My Profile
        </Heading>
        <Flex mt={8} alignItems="center" flexDir="column">
          <div className="profile-box">
            <div>
              <Heading as="h3" size="md">
                Photo
              </Heading>
              <Box w="100%" mt={8}>
                <UploadPhoto myProfile={authStore.myProfile} onRefetch={handleRefetchMyProfile} />
              </Box>
            </div>
          </div>
          <div className="profile-box">
            <div>
              <Heading as="h3" size="md">
                Personal Information
              </Heading>
              <Box w="100%" mt={8}>
                <PersonalInfoForm
                  myProfile={authStore.myProfile}
                  onRefetch={handleRefetchMyProfile}
                />
              </Box>
            </div>
          </div>
          <div className="profile-box">
            <div>
              <Heading as="h3" size="md">
                Reset Password
              </Heading>
              <ResetPasswordForm />
            </div>
          </div>
          <div className="profile-box">
            <div>
              <Heading as="h3" size="md">
                E-mail
              </Heading>
              <Text color="gray.600">You will be required validate your new e-mail.</Text>
              <Box w="100%" mt={8}>
                <UpdateEmailForm email={authStore.myProfile?.email} />
              </Box>
            </div>
          </div>
          <div className="profile-box">
            <div>
              <Heading as="h3" size="md">
                Delete Account
              </Heading>
              <Text color="gray.600">
                This will permanently delete all your records in TechHustlers including your
                account, apps you have posted, supports, and comments on posts.
              </Text>
              <Button colorScheme="red" variant="outline" mt={4}>
                Delete
              </Button>
            </div>
          </div>
        </Flex>
      </Wrapper>
    </WebsiteLayout>
  );
};

export default observer(Profile);

import React, { useCallback, useState } from 'react';
import { useMutation } from '@apollo/client';
import PropTypes from 'prop-types';
import { Box, Flex, Text } from '@chakra-ui/react';
import styled from 'styled-components';
import AppHeader from 'mods/website/profile/components/AppHeader';
import ToggleAppSupportMtn from 'mods/website/apps/gql/ToggleAppSupportMtn';
import FormattedDate from 'mods/base/components/FormattedDate';
import AuthButton from 'mods/website/components/AuthButton';
import { HeartOutlined } from '@ant-design/icons';
import useOpenAppModal from 'mods/website/hooks/useOpenAppModal';

const Wrapper = styled.div`
  border: 1px solid #efefef;
  padding: 2rem 1.5rem;
  border-radius: 1rem;
  box-shadow: rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px;
  cursor: pointer;

  &:not(:last-child) {
    margin-bottom: 1.5rem;
  }
`;

const App = ({ app }) => {
  const [isSupported, setIsSupported] = useState(app.isSupported);
  const [supportsCount, setSupportsCount] = useState(app.supportsCount);

  const handleOpenAppModal = useOpenAppModal(app.slug);

  const [toggleAppSupport] = useMutation(ToggleAppSupportMtn);

  let supportText = 'support';
  if (supportsCount !== 1) {
    supportText = 'supports';
  }
  let commentText = 'comment';
  if (app.commentsCount !== 1) {
    commentText = 'comments';
  }

  const handleClickSupport = useCallback(
    (ev) => {
      ev.stopPropagation();
      setIsSupported(!isSupported);
      if (isSupported) {
        setSupportsCount((c) => c - 1);
      } else {
        setSupportsCount((c) => c + 1);
      }
      const input = { appId: app._id };
      toggleAppSupport({ variables: { input } });
    },
    [isSupported],
  );

  return (
    <Wrapper onClick={handleOpenAppModal}>
      <AppHeader app={app} />
      <Flex justifyContent="space-between" alignItems="center" mt={6}>
        <Flex alignItems="center">
          <Box width="88px" mr={4} textAlign="center">
            <AuthButton
              colorScheme="blue"
              variant={isSupported ? 'solid' : 'outline'}
              onClick={handleClickSupport}
              leftIcon={<HeartOutlined />}
              size="xs"
            >
              Support
            </AuthButton>
          </Box>
          <Box>
            <Text color="gray.700" fontSize="sm">
              {`${supportsCount} ${supportText} and ${app.commentsCount} ${commentText}`}
            </Text>
          </Box>
        </Flex>
        <Box>
          <Text color="gray.700" fontSize="sm">
            <FormattedDate date={app.publishedAt} format="shortDate" />
          </Text>
        </Box>
      </Flex>
    </Wrapper>
  );
};
App.propTypes = {
  app: PropTypes.object.isRequired,
};

export default App;

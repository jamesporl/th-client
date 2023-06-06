import React, { useCallback, useEffect, useMemo } from 'react';
import { useMutation } from '@apollo/client';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import { Box, Button, Flex, Link, Text, Tooltip } from '@chakra-ui/react';
import styled from 'styled-components';
import AppHeader from 'mods/website/profile/components/AppHeader';
import ToggleAppSupportMtn from 'mods/website/apps/gql/ToggleAppSupportMtn';
import AuthButton from 'mods/website/components/AuthButton';
import { GlobalOutlined, HeartOutlined } from '@ant-design/icons';
import useOpenAppModal from 'mods/website/hooks/useOpenAppModal';
import useStores from 'core/stores/useStores';

const Wrapper = styled.div`
  border: 1px solid #efefef;
  padding: 1rem;
  border-radius: 0.75rem;
  box-shadow: rgba(0, 0, 0, 0.04) 0px 3px 5px;
  cursor: pointer;

  &:not(:last-child) {
    margin-bottom: 1.5rem;
  }
`;

const App = ({ app }) => {
  const { uiStore } = useStores();

  const handleOpenAppModal = useOpenAppModal(app.slug);

  const [toggleAppSupport] = useMutation(ToggleAppSupportMtn);

  useEffect(() => {
    uiStore.addApp(app);
  }, [app]);

  const storedApp = useMemo(() => uiStore.apps.find((a) => a._id === app._id), [app, uiStore.apps]);

  let supportText = 'support';
  if (storedApp?.supportsCount !== 1) {
    supportText = 'supports';
  }
  let commentText = 'comment';
  if (app.commentsCount !== 1) {
    commentText = 'comments';
  }

  const handleClickSupport = useCallback(
    (ev) => {
      ev.stopPropagation();
      let newSupportsCount = storedApp.supportsCount - 1;
      if (!storedApp.isSupported) {
        newSupportsCount = storedApp.supportsCount + 1;
      }
      uiStore.updateApp(app._id, !storedApp.isSupported, newSupportsCount);
      const input = { appId: app._id };
      toggleAppSupport({ variables: { input } });
    },
    [app, storedApp],
  );

  let websiteLink = null;
  if (app.websiteUrl) {
    websiteLink = (
      <Flex>
        <Tooltip label="Go to website">
          <Link href={app.websiteUrl} target="_blank" onClick={(ev) => ev.stopPropagation()}>
            <Button variant="link" leftIcon={<GlobalOutlined />} />
          </Link>
        </Tooltip>
      </Flex>
    );
  }

  return (
    <Wrapper onClick={handleOpenAppModal}>
      <AppHeader app={app} />
      <Flex justifyContent="space-between" alignItems="center" mt={6}>
        <Flex alignItems="center">
          <Box width="88px" mr={4} textAlign="center">
            <AuthButton
              colorScheme="blue"
              variant={storedApp?.isSupported ? 'solid' : 'outline'}
              onClick={handleClickSupport}
              leftIcon={<HeartOutlined />}
              size="xs"
            >
              Support
            </AuthButton>
          </Box>
          <Box>
            <Text color="gray.700" fontSize="sm">
              {`${storedApp?.supportsCount || 0} ${supportText} and ${
                app.commentsCount
              } ${commentText}`}
            </Text>
          </Box>
        </Flex>
        {websiteLink}
      </Flex>
    </Wrapper>
  );
};
App.propTypes = {
  app: PropTypes.object.isRequired,
};

export default observer(App);

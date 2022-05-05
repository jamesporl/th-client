import React, { useCallback, useState } from 'react';
import { useMutation } from '@apollo/client';
import PropTypes from 'prop-types';
import { Box, Flex, Text, Link } from '@chakra-ui/react';
import NextLink from 'next/link';
import styled from 'styled-components';
import AppHeader from 'mods/website/profile/components/AppHeader';
import ToggleAppSupportMtn from 'mods/website/apps/gql/ToggleAppSupportMtn';
import FormattedDate from 'mods/base/components/FormattedDate';
import AuthButton from 'mods/website/components/AuthButton';

const Wrapper = styled.div`
  border: 1px solid #efefef;
  box-shadow: rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px;
  padding: 2rem 1.5rem;
  border-radius: 0.25rem;

  &:not(:last-child) {
    margin-bottom: 1.5rem;
  }
`;

const App = ({ app }) => {
  const [isSupported, setIsSupported] = useState(app.isSupported);
  const [supportsCount, setSupportsCount] = useState(app.supportsCount);

  const [toggleAppSupport] = useMutation(ToggleAppSupportMtn);

  let supportText = 'support';
  if (supportsCount !== 1) {
    supportText = 'supports';
  }
  let commentText = 'comment';
  if (app.commentsCount !== 1) {
    commentText = 'comments';
  }

  const handleClickSupport = useCallback(() => {
    setIsSupported(!isSupported);
    if (isSupported) {
      setSupportsCount((c) => c - 1);
    } else {
      setSupportsCount((c) => c + 1);
    }
    const input = { appId: app._id };
    toggleAppSupport({ variables: { input } });
  }, [isSupported]);

  return (
    <Wrapper>
      <AppHeader
        logoImgSrc={app.logoImg?.medium}
        name={app.name}
        shortDesc={app.shortDesc}
        tags={app.tags}
        isClickable
        slug={app.slug}
      />

      <Flex justifyContent="space-between" alignItems="center" mt={6}>
        <Flex alignItems="center">
          <Box width="88px" mr={4} textAlign="center">
            <AuthButton
              colorScheme={isSupported ? 'blue' : 'gray'}
              variant={isSupported ? 'solid' : 'outline'}
              onClick={handleClickSupport}
              size="xs"
            >
              Support
            </AuthButton>
          </Box>
          <Box>
            <NextLink href={`/apps/${app.slug}`} passHref>
              <Link style={{ textDecoration: 'none' }}>
                <Text color="gray.700" fontSize="sm">
                  {`${supportsCount} ${supportText} and ${app.commentsCount} ${commentText}`}
                </Text>
              </Link>
            </NextLink>
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

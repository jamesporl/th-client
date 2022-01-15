import React, { useCallback, useState } from 'react';
import { MessageTwoTone, SmileOutlined, SmileTwoTone } from '@ant-design/icons';
import { useMutation } from '@apollo/client';
import { Text, Flex, Button, HStack, Link } from '@chakra-ui/react';
import NextLink from 'next/link';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ToggleAppSupportMtn from '../../../gql/ToggleAppSupportMtn';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;

  .support-btn {
    border-radius: 0.25rem;
  }
  .support-btn:hover {
    text-decoration: none;
  }
`;

const SupportsAndCommentsBlock = ({ app }) => {
  const [supportsCount, setSupportsCount] = useState(app.supportsCount);
  const [isSupported, setIsSupported] = useState(app.isSupported);

  const [toggleAppSupport] = useMutation(ToggleAppSupportMtn);

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

  let supportText = 'supports';
  if (supportsCount === 1) {
    supportText = 'support';
  }

  let supportIcon = <SmileTwoTone style={{ fontSize: 24 }} />;
  if (!isSupported) {
    supportIcon = <SmileOutlined style={{ fontSize: 24, color: '#2b6cb0' }} />;
  }

  return (
    <Wrapper>
      <HStack mt={4} alignItems="center" spacing={16}>
        <Button
          className="support-btn"
          colorScheme="blue"
          variant="link"
          size="md"
          onClick={handleClickSupport}
        >
          {supportIcon}
          <Text fontWeight="bold" ml={2}>
            {`${supportsCount} ${supportText}`}
          </Text>
        </Button>
        <NextLink href={`/apps/${app.slug}`} passHref>
          <Link className="support-btn">
            <Flex>
              <MessageTwoTone style={{ fontSize: 24 }} />
              <Text fontWeight="bold" color="gray.500" ml={2}>
                {app.commentsCount}
              </Text>
            </Flex>
          </Link>
        </NextLink>
      </HStack>
    </Wrapper>
  );
};

SupportsAndCommentsBlock.propTypes = {
  app: PropTypes.object.isRequired,
};

export default SupportsAndCommentsBlock;

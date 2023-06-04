import React, { useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { useApolloClient } from '@apollo/client';
import {
  InputGroup,
  InputLeftElement,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  Box,
  Text,
  Flex,
  Link,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';
import styled from 'styled-components';
import AppsSearchQry from 'mods/website/apps/gql/AppsSearchQry';

const Wrapper = styled.div`
  a:hover {
    text-decoration: none;
  }
  .app {
    :first-child {
      margin-top: 0.5rem;
    }
    :not(:first-child) {
      margin-top: 1rem;
    }

    padding: 0.5rem;
    border-radius: 0.5rem;

    :hover {
      background-color: #efefef;
    }

    img {
      height: 60px;
      width: 60px;
    }
  }
`;

const SearchModal = ({ isOpen, onClose }) => {
  const apolloClient = useApolloClient();
  const [apps, setApps] = useState([]);
  const [searchString, setSearchString] = useState('');

  const handleClose = () => {
    onClose();
    setApps([]);
    setSearchString('');
  };

  const handleChangeSearch = async (ev) => {
    const { value } = ev.target;
    setSearchString(value);
    if (value) {
      const result = await apolloClient.query({
        query: AppsSearchQry,
        variables: { searchString: value },
      });
      setApps(result.data.apps.nodes);
    } else {
      setApps([]);
    }
  };

  let appsList = null;
  if (searchString && !apps.length) {
    appsList = (
      <Box textAlign="center" mt={4} mb={4} padding={4}>
        <Text color="gray.500" fontSize="xl" fontWeight="600">
          0 search results
        </Text>
      </Box>
    );
  }
  if (apps.length) {
    appsList = (
      <Box margin={4}>
        <Box>
          <Text
            color="gray.500"
            fontSize="md"
            textTransform="uppercase"
            fontWeight="bold"
            letterSpacing={1}
          >
            Apps
          </Text>
        </Box>
        <Box>
          {apps.map((app) => (
            <NextLink href={`/apps/${app.slug}`} key={app._id} passHref legacyBehavior>
              <Link onClick={handleClose}>
                <Flex className="app">
                  <img src={app.logoImg} alt="logo" style={{ borderRadius: '0.5rem' }} />
                  <Flex flexDir="column" ml={4}>
                    <Text fontSize="xl" fontWeight="bold">
                      {app.name}
                    </Text>
                    <Text color="gray.600" fontSize="md" mt={1}>
                      {app.shortDesc}
                    </Text>
                  </Flex>
                </Flex>
              </Link>
            </NextLink>
          ))}
        </Box>
      </Box>
    );
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="lg" returnFocusOnClose={false}>
      <ModalOverlay />
      <ModalContent>
        <Wrapper>
          <InputGroup size="lg">
            <InputLeftElement
              pointerEvents="none"
              children={<SearchOutlined style={{ color: '#ccc' }} />}
              size="lg"
            />
            <Input
              placeholder="Search TechHustlers"
              size="lg"
              onChange={debounce(handleChangeSearch, 800)}
            />
          </InputGroup>
          {appsList}
        </Wrapper>
      </ModalContent>
    </Modal>
  );
};

SearchModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default SearchModal;

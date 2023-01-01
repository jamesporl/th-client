import React, { useState, useEffect, useCallback } from 'react';
import { useLazyQuery } from '@apollo/client';
import {
  Box,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Icon,
  Skeleton,
  Text,
  Tag,
  TagLabel,
  TagCloseButton,
  Flex,
  HStack,
} from '@chakra-ui/react';
import debounce from 'lodash/debounce';
import PropTypes from 'prop-types';
import { SearchOutlined } from '@ant-design/icons';
import AppTagsQry from '../../../gql/AppTagsQry';

const TagSelection = ({ onChangeTags, initialTags }) => {
  const [selectedTags, setSelectedTags] = useState([]);
  const [tagsUpdated, setTagsUpdated] = useState(false);
  const [searchString, setSearchString] = useState('');

  const [getAllTags, { data, loading }] = useLazyQuery(AppTagsQry, {
    variables: { searchString: '' },
  });

  useEffect(() => {
    setSelectedTags(initialTags);
  }, [initialTags]);

  const debounceSearchTags = useCallback(
    debounce((str) => {
      getAllTags({ variables: { searchString: str } });
    }, 500),
    [],
  );

  useEffect(() => {
    if (tagsUpdated) {
      onChangeTags(selectedTags);
    }
  }, [selectedTags]);

  useEffect(() => {
    debounceSearchTags(searchString);
  }, [searchString]);

  const handleChangeSearchString = (ev) => {
    const { value } = ev.target;
    setSearchString(value);
  };

  const handleAddTag = (tag) => {
    setSelectedTags((prevTags) => {
      const tagExists = prevTags.find((pt) => pt._id === tag._id);
      if (tagExists || prevTags.length >= 3) {
        return prevTags;
      }
      return [...prevTags, tag];
    });
    setTagsUpdated(true);
  };

  const handleRemoveTag = (tagId) => {
    setSelectedTags((prevTags) => prevTags.filter((t) => t._id !== tagId));
    setTagsUpdated(true);
  };

  let allTagsList = <Skeleton />;
  if (!loading && data) {
    const { nodes: tags } = data.appTags;
    if (tags.length) {
      allTagsList = (
        <Flex flexWrap="wrap" justifyContent="center">
          {data.appTags.nodes.map((t) => (
            <Tag
              key={t._id}
              size="lg"
              mr={4}
              mt={4}
              onClick={() => handleAddTag(t)}
              cursor="pointer"
            >
              {t.name}
            </Tag>
          ))}
        </Flex>
      );
    } else {
      allTagsList = (
        <Flex justifyContent="center">
          <Text color="gray.300" fontSize="xl">
            0 search results...
          </Text>
        </Flex>
      );
    }
  }

  let selectedTagsList = null;
  if (selectedTags.length) {
    selectedTagsList = (
      <Flex mt={8} mb={8} justifyContent="center" width="100%">
        <HStack spacing={4}>
          {selectedTags.map((t) => (
            <Tag key={t._id} size="lg" colorScheme="blue" variant="solid">
              <TagLabel>{t.name}</TagLabel>
              <TagCloseButton onClick={() => handleRemoveTag(t._id)} />
            </Tag>
          ))}
        </HStack>
      </Flex>
    );
  }

  return (
    <Box>
      <Heading as="h3" size="md">
        Categories
      </Heading>
      <Text mt={2}>Select 1 to 3 categories that best describe your app.</Text>
      <InputGroup mt={8}>
        <Input placeholder="Search..." onChange={handleChangeSearchString} value={searchString} />
        {/* eslint-disable-next-line react/no-children-prop */}
        <InputRightElement children={<Icon as={SearchOutlined} />} />
      </InputGroup>
      {selectedTagsList}
      <Box mt={8}>{allTagsList}</Box>
    </Box>
  );
};

TagSelection.propTypes = {
  onChangeTags: PropTypes.func.isRequired,
  initialTags: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TagSelection;

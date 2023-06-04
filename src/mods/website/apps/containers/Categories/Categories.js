import React, { useEffect, useState } from 'react';
import {
  Box,
  Card,
  Heading,
  Image,
  Stack,
  CardBody,
  Text,
  Grid,
  GridItem,
  InputGroup,
  Input,
  InputRightElement,
  Icon,
  useBreakpointValue,
  Breadcrumb,
  BreadcrumbItem,
} from '@chakra-ui/react';
import debounce from 'lodash/debounce';
import NextLink from 'next/link';
import Head from 'next/head';
import { useQuery } from '@apollo/client';
import { SearchOutlined } from '@ant-design/icons';
import getPageTitle from 'core/utils/getPageTitle';
import WebsiteLayout from 'mods/website/components/WebsiteLayout';
import AppTagsQry from 'mods/website/profile/gql/AppTagsQry';

const Categories = () => {
  const [searchString, setSearchString] = useState('');

  const baseUrl = `${process.env.NEXT_PUBLIC_TH_CLIENT_BASE_URL}`;

  const { data, refetch } = useQuery(AppTagsQry);

  const debounceSearchTags = debounce((str) => {
    refetch({ searchString: str });
  }, 500);

  useEffect(() => {
    debounceSearchTags(searchString);
  }, [searchString]);

  const handleChangeSearchString = (ev) => {
    const { value } = ev.target;
    setSearchString(value);
  };

  let tagItems = null;
  if (data?.appTags) {
    tagItems = data.appTags.nodes.map((t) => {
      const appsText = t.appsCount === 1 ? 'app' : 'apps';
      return (
        <GridItem key={t._id}>
          <NextLink href={`/categories/${t.slug}`} passHref legacyBehavior>
            <Card
              direction={{ base: 'column', sm: 'row' }}
              overflow="hidden"
              variant="outline"
              mt={2}
              cursor="pointer"
            >
              <Image
                objectFit="cover"
                maxW={{ base: '100%', sm: '100px' }}
                src={t.imgUrl}
                alt={t.name}
              />
              <Stack>
                <CardBody>
                  <Heading size="md">{t.name}</Heading>
                  <Text py="2">{`${t.appsCount} ${appsText}`}</Text>
                </CardBody>
              </Stack>
            </Card>
          </NextLink>
        </GridItem>
      );
    });
  }

  const gridTemplateCols = useBreakpointValue(
    { base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' },
    { fallback: 'md' },
  );

  return (
    <WebsiteLayout>
      <Head>
        <title>{getPageTitle('Categories')}</title>
        <meta name="og:url" key="og:url" content={`${baseUrl}/categories`} />
        <meta name="og:title" key="og:title" content={getPageTitle('Categories')} />
      </Head>
      <div>
        <Box mb={4}>
          <Breadcrumb fontSize="sm">
            <BreadcrumbItem>
              <NextLink href="/">Home</NextLink>
            </BreadcrumbItem>
            <BreadcrumbItem isCurrentPage isLastChild>
              <NextLink href="/categories">Categories</NextLink>
            </BreadcrumbItem>
          </Breadcrumb>
        </Box>
        <Heading as="h1" size="lg">
          Categories
        </Heading>
        <InputGroup mt={8}>
          <Input
            placeholder="Search a category..."
            onChange={handleChangeSearchString}
            value={searchString}
          />
          {/* eslint-disable-next-line react/no-children-prop */}
          <InputRightElement children={<Icon as={SearchOutlined} />} />
        </InputGroup>
        <Box mt={16} />
        <Grid templateColumns={gridTemplateCols} gap={4}>
          {tagItems}
        </Grid>
      </div>
    </WebsiteLayout>
  );
};

export default Categories;

import React from 'react';
import { Box, Flex, Skeleton } from '@chakra-ui/react';
import styled from 'styled-components';

const Wrapper = styled.div`
  border: 1px solid #efefef;
  padding: 2rem 1.5rem;
  border-radius: 0.25rem;
`;

const AppSkeleton = () => (
  <Wrapper>
    <Flex>
      <Skeleton mr={4}>
        <Box width="88px" height="88px" />
      </Skeleton>
      <Box>
        <Skeleton width="160px" height="2rem" />
        <Skeleton width="300px" height="1rem" mt={4} />
        <Skeleton width="300px" height="1rem" mt={2} />
      </Box>
    </Flex>
  </Wrapper>
);

export default AppSkeleton;

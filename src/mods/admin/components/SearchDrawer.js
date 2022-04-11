import React from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import useStores from 'core/stores/useStores';
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  HStack,
} from '@chakra-ui/react';
import searchComponents from 'core/utils/searchComponents';

const Wrapper = styled.div`
  .not-found {
    margin: 40px 0;
    text-align: center;
  }
`;

const SearchDrawer = () => {
  const { adminUIStore } = useStores();

  let searchComponent = searchComponents[adminUIStore.searchCompKey];

  if (!searchComponent) {
    searchComponent = (
      <Wrapper>
        <div className="not-found">
          <h3>Content not found.</h3>
        </div>
      </Wrapper>
    );
  }

  const searchDrawerContent = React.createElement(searchComponent);

  const handleClose = () => adminUIStore.closeSearchDrawer();

  return (
    <Drawer onClose={handleClose} isOpen={adminUIStore.isSearchDrawerOpen} size="md">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader display="flex" justifyContent="flex-end">
          <HStack>
            <Button size="md" colorScheme="blue" variant="outline">
              Reset
            </Button>
            <Button size="md" colorScheme="blue" variant="solid">
              Apply
            </Button>
          </HStack>
        </DrawerHeader>
        <DrawerBody>{searchDrawerContent}</DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

SearchDrawer.propTypes = {};

SearchDrawer.defaultProps = {};

export default observer(SearchDrawer);

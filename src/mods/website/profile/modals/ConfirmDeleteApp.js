import React from 'react';
import { Button, Flex, Text, useToast } from '@chakra-ui/react';
import { observer } from 'mobx-react';
import useStores from 'core/stores/useStores';
import 'cropperjs/dist/cropper.css';
import { useMutation } from '@apollo/client';
import DeleteAppMtn from '../gql/DeleteAppMtn';

function ConfirmDeleteAppDraft() {
  const { uiStore } = useStores();
  const { app, refetchAppDrafts, refetchApps } = uiStore.globalModalParams.context;

  const toast = useToast();

  const [deleteApp] = useMutation(DeleteAppMtn);

  const handleClickConfirm = async () => {
    try {
      await deleteApp({ variables: { input: { appId: app._id } } });
      refetchAppDrafts();
      refetchApps();
      uiStore.closeGlobalModal();
    } catch (error) {
      toast({ position: 'top', status: 'error', variant: 'subtle', description: error.message });
    }
  };

  return (
    <>
      <Text as="span">Are you sure to permanently delete your app</Text>
      <Text fontWeight="bold" as="span">
        {` ${app.name}?`}
      </Text>
      <Flex justifyContent="flex-end" mt={8}>
        <Button colorScheme="blue" mr={2} onClick={uiStore.closeGlobalModal} variant="outline">
          Cancel
        </Button>
        <Button colorScheme="red" onClick={handleClickConfirm}>
          Delete
        </Button>
      </Flex>
    </>
  );
}

export default observer(ConfirmDeleteAppDraft);

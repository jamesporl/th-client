import React from 'react';
import { Button, Flex, Text, useToast } from '@chakra-ui/react';
import { observer } from 'mobx-react';
import useStores from 'core/stores/useStores';
import 'cropperjs/dist/cropper.css';
import { useMutation } from '@apollo/client';
import DeleteAppDraftMtn from '../gql/DeleteAppDraftMtn';

function ConfirmDeleteAppDraft() {
  const { uiStore } = useStores();
  const { appDraft, refetchAppDrafts } = uiStore.globalModalParams.context;

  const toast = useToast();

  const [deleteAppDraft] = useMutation(DeleteAppDraftMtn);

  const handleClickConfirm = async () => {
    try {
      await deleteAppDraft({ variables: { input: { appId: appDraft.appId } } });
      refetchAppDrafts();
      uiStore.closeGlobalModal();
    } catch (error) {
      toast({ position: 'top', status: 'error', variant: 'subtle', description: error.message });
    }
  };

  return (
    <>
      <Text as="span">Are you sure to remove your draft for</Text>
      <Text fontWeight="bold" as="span">
        {` ${appDraft.name}?`}
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

/* eslint-disable react/no-danger */
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useToast, Box, Button, Flex, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import AppDetails from 'mods/website/components/AppDetails';
import { InfoCircleFilled } from '@ant-design/icons';
import SubmitAppDraftMtn from '../../../gql/SubmitAppDraftMtn';

const Wrapper = styled.div``;

const Preview = ({ app, onSubmitToServer }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const [submitAppDraft] = useMutation(SubmitAppDraftMtn);
  const toast = useToast();

  const handleClickSubmit = async () => {
    setIsSubmitting(true);
    try {
      await onSubmitToServer();
      const input = { appId: app.appId };
      await submitAppDraft({ variables: { input } });
      router.push('/my/apps');
    } catch (error) {
      toast({ position: 'top', status: 'error', variant: 'subtle', description: error.message });
      setIsSubmitting(false);
    }
  };

  return (
    <Wrapper>
      <Flex justifyContent="flex-end" alignItems="flex-end" flexDirection="column" mb={12}>
        <Button
          colorScheme="green"
          onClick={handleClickSubmit}
          isLoading={isSubmitting}
          size="lg"
          width="280px"
        >
          SUBMIT
        </Button>
        <Box width="280px" textAlign="center" mt={2}>
          <Text color="gray.400" fontSize="sm">
            <InfoCircleFilled />
            &nbsp; You can still make changes even after submission.
          </Text>
        </Box>
      </Flex>
      <AppDetails app={app} isPreview />
    </Wrapper>
  );
};

Preview.propTypes = {
  app: PropTypes.object.isRequired,
  onSubmitToServer: PropTypes.func.isRequired,
};

export default Preview;

/* eslint-disable react/no-danger */
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import {
  useToast,
  Box,
  Button,
  Flex,
  Text,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import AppDetails from 'mods/website/components/AppDetails';
import SubmitAppDraftMtn from '../../../gql/SubmitAppDraftMtn';

const Wrapper = styled.div``;

const Preview = ({ app, onSubmitToServer }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState([]);
  const router = useRouter();

  const [submitAppDraft] = useMutation(SubmitAppDraftMtn);
  const toast = useToast();

  const handleClickSubmit = async () => {
    setIsSubmitting(true);
    try {
      await onSubmitToServer();
      const input = { appId: app.appId };
      const result = await submitAppDraft({ variables: { input } });
      if (result.data.submitAppDraft.errors.length) {
        setErrors(result.data.submitAppDraft.errors);
        setIsSubmitting(false);
      } else {
        router.push('/my/apps');
        sessionStorage.removeItem(`appDraft_${app.appId}`);
      }
    } catch (error) {
      toast({ position: 'top', status: 'error', variant: 'subtle', description: error.message });
      setIsSubmitting(false);
    }
  };

  let errorsDisplay = null;
  if (errors.length) {
    errorsDisplay = (
      <Alert status="error" mb={8} display="block" borderRadius={8} p={8}>
        <Flex>
          <AlertIcon boxSize="24px" />
          <AlertTitle fontSize="lg">
            Submission failed. Kindly address the following issues:
          </AlertTitle>
        </Flex>
        <Flex>
          <AlertDescription pl={12} pt={4}>
            <ul>
              {errors.map((e) => (
                <li key={e}>{e}</li>
              ))}
            </ul>
          </AlertDescription>
        </Flex>
      </Alert>
    );
  }

  return (
    <Wrapper>
      {errorsDisplay}
      <Flex justifyContent="center" alignItems="center" flexDirection="column" mb={12}>
        <Button
          colorScheme="green"
          onClick={handleClickSubmit}
          isLoading={isSubmitting}
          size="lg"
          width="280px"
        >
          SUBMIT
        </Button>
        <Box mt={4}>
          <Text color="gray.400" fontSize="sm">
            Your submission will be under review by a TechHustlers PH admin. You will get an email
            notification from us once it is approved and published.
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

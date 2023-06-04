import React, { useState, useCallback } from 'react';
import Head from 'next/head';
import {
  Box,
  Button,
  Flex,
  HStack,
  PinInput,
  PinInputField,
  Text,
  useToast,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useMutation } from '@apollo/client';
import useStores from 'core/stores/useStores';
import AuthPageContainer from 'mods/auth/components/AuthPageContainer';
import SendVerificationCodeMtn from 'mods/auth/gql/SendVerificationCodeMtn';
import VerifyAccountByCodeMtn from 'mods/auth/gql/VerifyAccountByCodeMtn';
import getPageTitle from 'core/utils/getPageTitle';

const EmailVerification = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { authStore } = useStores();

  const toast = useToast();

  const [sendVerificationCode] = useMutation(SendVerificationCodeMtn);
  const [verifyAccountByCode] = useMutation(VerifyAccountByCodeMtn);

  const router = useRouter();

  const { email } = router.query;

  const handleSubmitCode = useCallback(
    async (code) => {
      setIsSubmitting(true);
      try {
        const { data } = await verifyAccountByCode({ variables: { input: { email, code } } });
        const authToken = data.verifyAccountByCode;
        authStore.login(authToken);
        window.location.href = '/';
      } catch (error) {
        toast({ position: 'top', status: 'error', variant: 'subtle', description: error.message });
        setIsSubmitting(false);
      }
    },
    [email],
  );

  const handleClickResendCode = useCallback(async () => {
    try {
      await sendVerificationCode({ variables: { input: { email } } });
      toast({
        position: 'top',
        status: 'success',
        variant: 'subtle',
        description: 'Verification code has been sent to your email',
      });
    } catch (error) {
      toast({ position: 'top', status: 'error', variant: 'subtle', description: error.message });
    }
  }, [email]);

  let content = <Text textAlign="center">You seem to be in the wrong page.</Text>;
  if (email) {
    content = (
      <Box>
        <Text>
          A verification has been sent to your email. Please enter the code below to get your
          account verified.
        </Text>
        <Flex justifyContent="center">
          <HStack mt={8} textAlign="center">
            <PinInput onComplete={handleSubmitCode} isDisabled={isSubmitting}>
              <PinInputField />
              <PinInputField />
              <PinInputField />
              <PinInputField />
              <PinInputField />
              <PinInputField />
            </PinInput>
          </HStack>
        </Flex>
        <Text mt={8} fontSize="xs" color="gray.500">
          If in case you did not get an email with the code or the code has expired, &nbsp;
          <Button colorScheme="blue" variant="link" size="xs" onClick={handleClickResendCode}>
            click here to resend code.
          </Button>
        </Text>
      </Box>
    );
  }

  return (
    <AuthPageContainer>
      <Head>
        <title>{getPageTitle('Email Verification')}</title>
      </Head>
      {content}
    </AuthPageContainer>
  );
};

EmailVerification.propTypes = {};

EmailVerification.defaultProps = {};

export default EmailVerification;

import React, { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { Flex, Spinner, Text } from '@chakra-ui/react';
import { observer } from 'mobx-react';
import { useRouter } from 'next/router';
import useStores from 'core/stores/useStores';
import LoginWithGoogleMtn from '../gql/LoginWithGoogleMtn';

const GoogleReceive = () => {
  const { authStore, uiStore } = useStores();
  const router = useRouter();
  const [error, setError] = useState('');
  const [loginWithGoogle] = useMutation(LoginWithGoogleMtn);

  const { code, error: rError, state } = router.query;

  useEffect(() => {
    const login = async () => {
      const input = { code, state };
      const result = await loginWithGoogle({
        variables: { input },
      });

      const authToken = result.data.loginWithGoogle;
      authStore.login(authToken);
      window.location.href = '/';
    };
    if (rError) {
      setError(error);
    } else if (code) {
      login();
    }
  }, [code, rError, state]);

  let content = (
    <Flex flexDir="column" alignItems="center">
      <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
      <Text fontSize="xl" mt={4}>
        Loading...
      </Text>
    </Flex>
  );

  if (error) {
    content = <Text>{error}</Text>;
  }

  return (
    <Flex justifyContent="center" alignItems="center" height={`${uiStore.screenheight}px`}>
      {content}
    </Flex>
  );
};

export default observer(GoogleReceive);

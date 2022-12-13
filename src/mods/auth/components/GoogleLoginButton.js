import React from 'react';
import { useMutation } from '@apollo/client';
import { Button } from '@chakra-ui/react';
import CreateGoogleOAuthUrlMtn from '../gql/CreateGoogleOAuthUrlMtn';

const GoogleLoginButton = () => {
  const [createGoogleOAuthUrl] = useMutation(CreateGoogleOAuthUrlMtn);

  const handleClickLoginWithGoogle = async () => {
    const result = await createGoogleOAuthUrl();
    window.location.href = result.data.createGoogleOAuthUrl;
  };

  return (
    <Button
      colorScheme="blue"
      width="100%"
      variant="outline"
      size="md"
      onClick={handleClickLoginWithGoogle}
    >
      <img src="/google-logo.svg" alt="google-logo" width="16px" />
      &nbsp;&nbsp;&nbsp;Sign in with Google
    </Button>
  );
};

export default GoogleLoginButton;

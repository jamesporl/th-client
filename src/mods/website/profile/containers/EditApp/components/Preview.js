/* eslint-disable react/no-danger */
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useToast, Box, Button, Flex } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import AppBannerCarousel from 'mods/website/components/AppBannerCarousel';
import AppHeader from 'mods/website/profile/components/AppHeader';
import SubmitAppDraftMtn from '../../../gql/SubmitAppDraftMtn';

const Wrapper = styled.div`
  .desc-container {
    margin-top: 1rem;
    border: 1px solid #f0f0f0;
    padding: 1rem;

    .desc {
      margin-top: 2rem;
    }
  }
`;

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
      <Flex>
        <Box>
          <Box mt={24} width="720px">
            <AppHeader
              name={app.name}
              shortDesc={app.shortDesc}
              logoImgSrc={app.logoImg?.medium}
              tags={app.tags}
            />
            <div className="desc-container">
              <AppBannerCarousel bannerImgs={app.bannerImgs || []} videoUrl={app.videoUrl} />
              <div
                className="desc"
                dangerouslySetInnerHTML={{
                  __html: app.desc,
                }}
              />
            </div>
          </Box>
        </Box>
        <Box flexGrow="1" ml="2rem">
          <Button
            colorScheme="blue"
            isFullWidth
            onClick={handleClickSubmit}
            isLoading={isSubmitting}
          >
            Submit
          </Button>
        </Box>
      </Flex>
    </Wrapper>
  );
};

Preview.propTypes = {
  app: PropTypes.object.isRequired,
  onSubmitToServer: PropTypes.func.isRequired,
};

export default Preview;

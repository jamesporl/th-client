/* eslint-disable react/no-danger */
import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import AppBannerCarousel from 'mods/website/components/AppBannerCarousel';
import AppHeader from 'mods/website/profile/components/AppHeader';

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

const AppDetails = ({ app }) => (
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
        hello
      </Box>
    </Flex>
  </Wrapper>
);

AppDetails.propTypes = {
  app: PropTypes.object.isRequired,
};

export default AppDetails;

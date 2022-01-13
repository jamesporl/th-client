/* eslint-disable react/no-danger */
import React from 'react';
import { Box } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import AppBannerCarousel from 'mods/website/components/AppBannerCarousel';
import AppHeader from 'mods/website/profile/components/AppHeader';
import Comments from 'mods/website/apps/containers/App/Comments';
import SocialUrlLinks from './SocialUrlLinks';
import AppUrlLinks from './AppUrlLinks';

const Wrapper = styled.div`
  display: flex;

  .desc-container {
    margin-top: 1rem;
    border: 1px solid #f0f0f0;
    padding: 1rem;

    .desc {
      margin-top: 2rem;
    }
  }
`;

const AppDetails = ({ app, showComments }) => {
  let commentsSection = null;
  if (showComments) {
    commentsSection = (
      <Box mt={8}>
        <Comments app={app} />
      </Box>
    );
  }

  return (
    <Wrapper>
      <Box flexGrow="1">
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
        {commentsSection}
      </Box>
      <Box width="280px" ml="2rem">
        <SocialUrlLinks socialUrls={app.socialUrls} />
        <AppUrlLinks
          websiteUrl={app.websiteUrl}
          playStoreUrl={app.playStoreUrl}
          appStoreUrl={app.appStoreUrl}
        />
      </Box>
    </Wrapper>
  );
};

AppDetails.propTypes = {
  app: PropTypes.object.isRequired,
  showComments: PropTypes.bool,
};

AppDetails.defaultProps = {
  showComments: false,
};

export default AppDetails;

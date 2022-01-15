import React, { useState, useEffect, useCallback } from 'react';
import { Box } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import sortBy from 'lodash/sortBy';
import { observer } from 'mobx-react';
import AliceCarousel from 'react-alice-carousel';
import styled from 'styled-components';
import useStores from 'core/stores/useStores';
import 'react-alice-carousel/lib/alice-carousel.css';

const Wrapper = styled.div`
  .alice-carousel__stage-item:not(:last-child) .carousel-item {
    padding-right: 1rem;
  }
  .alice-carousel__stage-item {
    cursor: pointer;

    img {
      border-radius: 0.5rem;
    }
  }

  .carousel-placeholder {
    img {
      border-radius: 0.5rem;
    }
  }

  .thumbnails {
    margin-top: 1rem;
    display: flex;
    cursor: pointer;

    .thumbnail-item:not(:last-child) {
      padding-right: 0.5rem;
    }

    img {
      height: 36px;
      border-radius: 0.25rem;
    }
  }
`;

const Carousel = ({ bannerImgs, videoUrl }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const { uiStore } = useStores();
  let itemWidth = 0.9 * (1100 - 332);
  let containerWidth = 1100 - 332;
  if (uiStore.screenwidth <= 1132) {
    itemWidth = 0.9 * (1100 - (1132 - uiStore.screenwidth) - 332);
    containerWidth = 1100 - (1132 - uiStore.screenwidth) - 332;
  }
  if (uiStore.screenwidth <= 1100) {
    itemWidth = 0.9 * (uiStore.screenwidth - 364);
    containerWidth = uiStore.screenwidth - 364;
  }
  if (uiStore.screenwidth <= 992) {
    itemWidth = 0.9 * (uiStore.screenwidth - 72);
    containerWidth = uiStore.screenwidth - 72;
  }

  const itemHeight = (9 * itemWidth) / 16;

  const [widths, setWidths] = useState(bannerImgs.map(() => 0));

  const sortedBannerImgs = sortBy(bannerImgs, 'order');

  useEffect(() => {
    sortedBannerImgs.forEach((imgDoc, idx) => {
      const img = new Image();
      img.src = imgDoc.image.large;
      img.onload = () => {
        setWidths((prevWidths) =>
          prevWidths.map((w, idx2) => {
            if (idx2 === idx) {
              const resizedWidth = (img.width * itemHeight) / 1080;
              if (idx !== bannerImgs.length - 1) {
                return resizedWidth + 16; // 1rem padding
              }
              return resizedWidth;
            }
            return w;
          }),
        );
      };
    });
  }, [bannerImgs, uiStore.screenwidth]);

  const allImgsLoaded = widths.find((w) => !w) !== 0;

  const handleClickThumbnail = useCallback(
    (idx) => {
      if (videoUrl) {
        setActiveIndex(idx + 1);
      } else {
        setActiveIndex(idx);
      }
    },
    [videoUrl],
  );

  const handleClickVideoThumbnail = () => {
    setActiveIndex(0);
  };

  const handleSlideChanged = (e) => {
    if (e.type === 'action') {
      setActiveIndex(e.item);
    }
  };

  let mainCarousel = (
    <div className="carousel-placeholder">
      <img
        src="/carousel-placeholder.png"
        alt="app-banner"
        width={`${itemWidth}px`}
        draggable={false}
      />
    </div>
  );
  let thumbnailItems = (
    <img src="/img-rect-thumbnail-placeholder.png" alt="app-banner" height="36px" />
  );

  if ((sortedBannerImgs?.length || videoUrl) && allImgsLoaded) {
    let items = sortedBannerImgs.map((i, idx) => (
      <div className="carousel-item" key={i.image._id} style={{ width: `${widths[idx]}px` }}>
        <img src={i.image.large} alt="app-banner" height={itemHeight} draggable={false} />
      </div>
    ));

    thumbnailItems = sortedBannerImgs.map((i, idx) => (
      <div
        className="thumbnail-item"
        key={i.image._id}
        role="button"
        tabIndex={0}
        onClick={() => handleClickThumbnail(idx)}
        onKeyUp={() => handleClickThumbnail(idx)}
      >
        <img src={i.image.large} alt="app-banner" height="36px" />
      </div>
    ));

    if (videoUrl) {
      const videoItem = (
        <div className="carousel-item" key="video" style={{ width: `${itemWidth + 16}px` }}>
          <iframe
            width={`${itemWidth}px`}
            height={`${itemHeight}px`}
            src={videoUrl}
            title="App Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      );
      const videoThumbnailItem = (
        <div
          className="thumbnail-item"
          key="video-thumbnail"
          role="button"
          tabIndex={0}
          onClick={handleClickVideoThumbnail}
          onKeyUp={handleClickVideoThumbnail}
        >
          <img src="/video-thumbnail.png" alt="app-banner" height="36px" />
        </div>
      );
      items = [videoItem, ...items];
      thumbnailItems = [videoThumbnailItem, ...thumbnailItems];
    }

    mainCarousel = (
      <AliceCarousel
        activeIndex={activeIndex}
        onSlideChanged={handleSlideChanged}
        items={items}
        autoWidth
        disableButtonsControls
        disableDotsControls
        mouseTracking
      />
    );
  } else if (!sortedBannerImgs?.length && !videoUrl) {
    mainCarousel = (
      <img
        src="/img-rect-placeholder.png"
        alt="app-banner"
        height={`${itemHeight}px`}
        draggable={false}
      />
    );
    thumbnailItems = (
      <div className="thumbnail-item">
        <img src="/img-rect-thumbnail-placeholder.png" alt="app-banner" height="36px" />
      </div>
    );
  }

  return (
    <Wrapper screenwidth={uiStore.screenwidth}>
      <Box width={containerWidth}>{mainCarousel}</Box>
      <div className="thumbnails">{thumbnailItems}</div>
    </Wrapper>
  );
};

Carousel.propTypes = {
  bannerImgs: PropTypes.arrayOf(PropTypes.object),
  videoUrl: PropTypes.string,
};

Carousel.defaultProps = {
  bannerImgs: [],
  videoUrl: '',
};

export default observer(Carousel);

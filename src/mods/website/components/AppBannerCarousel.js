import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import sortBy from 'lodash/sortBy';
import AliceCarousel from 'react-alice-carousel';
import styled from 'styled-components';
import 'react-alice-carousel/lib/alice-carousel.css';

const Wrapper = styled.div`
  .main {
    width: 768px;

    .alice-carousel__stage-item:not(:last-child) .carousel-item {
      padding-right: 1rem;
    }
    .alice-carousel__stage-item {
      cursor: pointer;

      img {
        border-radius: 0.5rem;
      }
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
              const resizedWidth = (img.width * 387) / 1080;
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
  }, [bannerImgs]);

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

  let mainCarousel = null;
  let thumbnailItems = null;

  if ((sortedBannerImgs?.length || videoUrl) && allImgsLoaded) {
    let items = sortedBannerImgs.map((i, idx) => (
      <div className="carousel-item" key={i.image._id} style={{ width: `${widths[idx]}px` }}>
        <img src={i.image.large} alt="app-banner" height="387px" draggable={false} />
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
        <div className="carousel-item" key="video" style={{ width: '688px' }}>
          <iframe
            width="688"
            height="387"
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
      <img src="/img-rect-placeholder.png" alt="app-banner" height="387px" draggable={false} />
    );
    thumbnailItems = (
      <div className="thumbnail-item">
        <img src="/img-rect-thumbnail-placeholder.png" alt="app-banner" height="36px" />
      </div>
    );
  }

  return (
    <Wrapper>
      <div className="main">{mainCarousel}</div>
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

export default Carousel;

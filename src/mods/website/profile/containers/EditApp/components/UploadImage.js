import React from 'react';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { Box, Flex, Icon, Text } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  border: 1px dashed #afafaf;
  cursor: pointer;

  &:hover {
    border: 1px dashed #63b3ed;
  }

  .img-container {
    position: relative;
    cursor: pointer;
    display: flex;
    justify-content: center;

    img.image {
      height: ${(props) => props.height};
    }

    .overlay {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      height: 100%;
      width: 100%;
      opacity: 0;
      background-color: #000;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
    }
  }

  .img-container:hover .overlay {
    opacity: 0.4;
  }

  input {
    display: none;
  }
`;

const UploadImage = ({ imgId, imgSrc, onChange, uploadText, height, width }) => (
  <Wrapper height={height}>
    <Flex justifyContent="center" flexDirection="column" h={height} w={width}>
      <label htmlFor={imgId} className="upload">
        {imgSrc ? (
          <div className="img-container">
            <img src={imgSrc} alt="avatar" className="image" />
            <div className="overlay">
              <div className="delete-btn">
                <Icon as={DeleteOutlined} />
              </div>
            </div>
          </div>
        ) : (
          <Box textAlign="center" cursor="pointer">
            <PlusOutlined />
            <Box mt={4}>
              <Text fontSize="sm">{uploadText}</Text>
            </Box>
          </Box>
        )}
        <input id={imgId} type="file" onChange={onChange} />
      </label>
    </Flex>
  </Wrapper>
);

UploadImage.propTypes = {
  height: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
  imgId: PropTypes.string.isRequired,
  imgSrc: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  uploadText: PropTypes.string,
};

UploadImage.defaultProps = {
  imgSrc: '',
  uploadText: '',
};

export default UploadImage;

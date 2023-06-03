import React from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Box, Flex, Text } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  border: ${(props) => (props.imgSrc ? '1px solid #afafaf' : '4px dashed #63b3ed')};
  cursor: pointer;

  &:hover {
    border: 4px dashed #3182ce;
  }

  .img-container {
    position: relative;
    cursor: pointer;
    display: flex;
    justify-content: center;

    img.image {
      height: ${(props) => props.height};
    }
  }

  input {
    display: none;
  }
`;

const UploadImage = ({ imgId, imgSrc, onChange, uploadText, height, width }) => {
  let textContent = null;
  if (uploadText) {
    textContent = (
      <Box mt={4}>
        <Text fontSize="sm">{uploadText}</Text>
      </Box>
    );
  }
  let content = (
    <Box textAlign="center" cursor="pointer">
      <PlusOutlined />
      {textContent}
    </Box>
  );
  if (imgSrc) {
    content = (
      <div className="img-container">
        <img src={imgSrc} alt="avatar" className="image" />
      </div>
    );
  }

  return (
    <Wrapper height={height} imgSrc={imgSrc}>
      <Flex justifyContent="center" flexDirection="column" h={height} w={width}>
        <label htmlFor={imgId} className="upload">
          {content}
          <input id={imgId} type="file" onChange={onChange} />
        </label>
      </Flex>
    </Wrapper>
  );
};

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

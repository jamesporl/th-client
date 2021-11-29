import React, { useRef, useState, useCallback } from 'react';
import Cropper from 'react-cropper';
import { Button, Flex } from '@chakra-ui/react';
import { observer } from 'mobx-react';
import useStores from 'core/stores/useStores';
import 'cropperjs/dist/cropper.css';

function CropLogo() {
  const [croppedImgSrc, setCroppedImgSrc] = useState('');
  const { uiStore } = useStores();
  const { src, type, onSubmit, aspectRatio } = uiStore.globalModalParams.context;

  const cropperRef = useRef();

  const handleClickSubmit = useCallback(() => {
    onSubmit(croppedImgSrc);
    uiStore.closeGlobalModal();
  }, [croppedImgSrc]);

  const onCrop = () => {
    const imageElement = cropperRef?.current;
    const cropper = imageElement?.cropper;
    setCroppedImgSrc(cropper.getCroppedCanvas().toDataURL(type));
  };

  return (
    <>
      <Cropper
        src={src}
        style={{ width: '100%', maxHeight: '512px' }}
        aspectRatio={aspectRatio}
        guides={false}
        crop={onCrop}
        autoCropArea={1}
        ref={cropperRef}
      />
      <Flex justifyContent="flex-end" mt={16}>
        <Button colorScheme="blue" mr={2} onClick={uiStore.closeGlobalModal} variant="outline">
          Cancel
        </Button>
        <Button colorScheme="blue" onClick={handleClickSubmit}>
          Submit
        </Button>
      </Flex>
    </>
  );
}

export default observer(CropLogo);

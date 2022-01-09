import React, { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { Avatar, useToast } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import useStores from 'core/stores/useStores';
import { dataUrltoFile } from '../EditApp/components/Assets';
import UpdateProfilePhotoMtn from '../../gql/UpdateProfilePhotoMtn';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .upload-photo-btn {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    margin-top: 1rem;
    cursor: pointer;
    padding: 0 1rem;
    color: #fff;
    background-color: #3182ce;
    line-height: 1.2;
    font-weight: 600;
    border-radius: 6px;
    height: 40px;
  }

  input {
    display: none;
  }
`;

const UploadPhoto = ({ myProfile, onRefetch }) => {
  const [imgSrc, setImgSrc] = useState('');

  const { uiStore } = useStores();

  const toast = useToast();

  const [updateProfilePhoto] = useMutation(UpdateProfilePhotoMtn);

  useEffect(() => {
    setImgSrc(myProfile?.image?.medium);
  }, [myProfile]);

  const handleSubmitPhoto = async (src, filename, type) => {
    const file = await dataUrltoFile(src, filename, type);
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      toast({
        position: 'top',
        status: 'error',
        variant: 'subtle',
        description: 'Image must be smaller than 2MB',
      });
      return;
    }
    setImgSrc(src);
    const input = { file };
    try {
      await updateProfilePhoto({ variables: { input } });
      onRefetch();
    } catch (error) {
      toast({ position: 'top', status: 'error', variant: 'subtle', description: error.message });
    }
  };

  const handleChangePhoto = async (ev) => {
    const [file] = ev.target.files;
    const src = await new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
    });
    uiStore.openGlobalModal('cropImage', 'Edit logo', {
      src,
      onSubmit: (newSrc) => handleSubmitPhoto(newSrc, file.name, file.type),
      type: file.type,
      aspectRatio: 1,
    });
  };

  return (
    <Wrapper>
      <Avatar size="xl" name={myProfile?.firstName} src={imgSrc} />
      <label htmlFor="profilePhoto" className="upload">
        <div className="upload-photo-btn">Upload new photo</div>
        <input id="profilePhoto" type="file" onChange={handleChangePhoto} />
      </label>
    </Wrapper>
  );
};

UploadPhoto.propTypes = {
  myProfile: PropTypes.object,
  onRefetch: PropTypes.func.isRequired,
};

UploadPhoto.defaultProps = {
  myProfile: null,
};

export default UploadPhoto;

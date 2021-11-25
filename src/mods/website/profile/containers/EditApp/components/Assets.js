import React, { useCallback, useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { Card, Col, Row, Upload, message, Input, Form } from 'antd';
import ImgCrop from 'antd-img-crop';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import UpdateAppDraftBannerImgMtn from '../../../gql/UpdateAppDraftBannerImgMtn';
import UpdateAppDraftLogoImgMtn from '../../../gql/UpdateAppDraftLogoImgMtn';

const Wrapper = styled.div`
  .img-upload-container {
    position: relative;
    width: 100%;
    max-width: 400px;

    .image {
      width: 100%;
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

  .img-upload-container:hover .overlay {
    opacity: 0.4;
  }

  .banner-images-card {
    margin-top: 2rem;
  }

  .banner-img-upload {
    margin-top: 1rem;
    display: flex;
    justify-content: center;

    .img-thumbnails {
      display: flex;
      justify-content: center;

      .img-thumbnail-card {
        height: 47px;
        width: 82px;
        border: 1px solid #d8d8d8;
        background-color: #f3f3f3;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .img-thumbnail-card:hover {
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
      }

      .img-thumbnail-card:not(:last-child) {
        margin-right: 0.5rem;
      }
    }

    .ant-upload.ant-upload-select-picture-card {
      width: 480px;
      height: 270px;
      margin: 1rem 0;
    }
  }

  .logo-img-upload {
    margin-top: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;

    .ant-upload.ant-upload-select-picture-card {
      width: 180px;
      height: 180px;
      margin-right: 0;
      margin-bottom: 0;
    }
  }
`;

const Assets = ({ app, appId, refetch, onChangeVideoUrl, onSubmitToServer, videoUrl }) => {
  const [logoImgSrc, setLogoImgSrc] = useState('');
  const [selectedBannerImgIdx, setSelectedBannerImgIdx] = useState(0);
  const [bannerImgSrcs, setBannerImgSrcs] = useState(['', '', '', '', '']);

  const [updateAppDraftBannerImg] = useMutation(UpdateAppDraftBannerImgMtn);
  const [updateAppDraftLogoImg] = useMutation(UpdateAppDraftLogoImgMtn);

  const [videoUrlForm] = Form.useForm();

  let selectedBannerImgSrc = null;
  if (bannerImgSrcs?.length && selectedBannerImgIdx < bannerImgSrcs.length) {
    selectedBannerImgSrc = bannerImgSrcs[selectedBannerImgIdx];
  }

  useEffect(() => {
    if (app?.logoImg) {
      setLogoImgSrc(app.logoImg.medium);
    }
    if (app?.bannerImgs?.length) {
      setBannerImgSrcs(
        [0, 1, 2, 3, 4].map((idx) => {
          const img = app.bannerImgs.find((i) => i.order === idx);
          if (img) {
            return img.image.large;
          }
          return '';
        }),
      );
    }
  }, [appId]);

  const beforeUploadLogoImg = (file) => {
    const isLt2M = file.size / 1024 / 1024 < 5;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isLt2M;
  };

  const onChangeLogoImg = async ({ file }) => {
    const src = await new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file.originFileObj);
      reader.onload = () => resolve(reader.result);
    });
    if (file.status === 'done') {
      setLogoImgSrc(src);
      const uploadFile = new File([file.originFileObj], file.name, {
        type: file.type,
      });
      const input = { appId, file: uploadFile };
      try {
        await updateAppDraftLogoImg({ variables: { input } });
        refetch();
      } catch (error) {
        message.error(error.message.replace('GraphQL error :', ''));
      }
    }
  };

  const beforeUploadBannerImg = (file) => {
    const isLt2M = file.size / 1024 / 1024 < 5;
    if (!isLt2M) {
      message.error('Image must be smaller than 2MB');
    }
    return isLt2M;
  };

  const onChangeBannerImg = useCallback(
    async ({ file }) => {
      const src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
      if (file.status === 'done') {
        setBannerImgSrcs((prevImgSrcs) =>
          prevImgSrcs.map((imgSrc, idx) => {
            if (idx === selectedBannerImgIdx) {
              return src;
            }
            return imgSrc;
          }),
        );
        const uploadFile = new File([file.originFileObj], file.name, {
          type: file.type,
        });
        const input = { appId, order: selectedBannerImgIdx, file: uploadFile };
        try {
          await updateAppDraftBannerImg({ variables: { input } });
          refetch();
        } catch (error) {
          message.error(error.message.replace('GraphQL error :', ''));
        }
      }
    },
    [selectedBannerImgIdx],
  );

  const handleClickBannerImgThumbnailCard = (idx) => {
    setSelectedBannerImgIdx(idx);
  };

  const handleValidateAndSubmitToServer = () => {
    try {
      videoUrlForm.submit();
      onSubmitToServer();
    } catch (error) {
      // do nothing
    }
  };

  const uploadLogoImgButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: '1rem' }}>Upload (512px x 512px)</div>
    </div>
  );

  const uploadBannerImgButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: '1rem' }}>Upload (1980px or less x 1080px)</div>
    </div>
  );

  const bannerImgThumbnails = [0, 1, 2, 3, 4].map((idx) => {
    const imgSrc = bannerImgSrcs[idx];
    let imgContent = (
      <img src="/img-rect-thumbnail-placeholder.png" alt="app-banner" height="45px" />
    );
    if (imgSrc) {
      imgContent = <img src={imgSrc} alt="app-banner" height="45px" />;
    }
    return (
      <div
        className="img-thumbnail-card"
        key={idx}
        onClick={() => handleClickBannerImgThumbnailCard(idx)}
        onKeyDown={() => handleClickBannerImgThumbnailCard(idx)}
        tabIndex={0}
        role="button"
      >
        {imgContent}
      </div>
    );
  });

  const videoUrlRules = [
    {
      pattern:
        /[-a-zA-Z0-9@:%._\\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)/,
      message: 'Must be a valid URL',
    },
  ];

  return (
    <Wrapper>
      <Row gutter={[28, 28]}>
        <Col span={8}>
          <Card title="Logo">
            <div className="logo-img-upload">
              <div>
                <ImgCrop aspect={1}>
                  <Upload
                    name="avatar"
                    listType="picture-card"
                    showUploadList={false}
                    beforeUpload={beforeUploadLogoImg}
                    onChange={onChangeLogoImg}
                    onRemove={() => undefined}
                  >
                    {logoImgSrc ? (
                      <div className="img-upload-container">
                        <img src={logoImgSrc} alt="avatar" className="image" />
                        <div className="overlay">
                          <div className="delete-btn">
                            <DeleteOutlined style={{ fontSize: 21 }} />
                          </div>
                        </div>
                      </div>
                    ) : (
                      uploadLogoImgButton
                    )}
                  </Upload>
                </ImgCrop>
              </div>
            </div>
          </Card>
        </Col>
        <Col span={16}>
          <Card title="Explainer Video Embed URL">
            <Form form={videoUrlForm}>
              <Form.Item rules={videoUrlRules} name="videoUrl">
                <Input
                  placeholder="https://www.youtube.com/embed/awesome"
                  onChange={onChangeVideoUrl}
                  defaultValue={videoUrl}
                  onBlur={handleValidateAndSubmitToServer}
                />
              </Form.Item>
            </Form>
          </Card>
          <Card title="Banner Images" className="banner-images-card">
            <div className="banner-img-upload">
              <div>
                <div className="img-thumbnails">{bannerImgThumbnails}</div>
                <div>
                  <Upload
                    name="avatar"
                    listType="picture-card"
                    showUploadList={false}
                    beforeUpload={beforeUploadBannerImg}
                    onChange={onChangeBannerImg}
                  >
                    {selectedBannerImgSrc ? (
                      <img src={selectedBannerImgSrc} alt="avatar" style={{ height: '270px' }} />
                    ) : (
                      uploadBannerImgButton
                    )}
                  </Upload>
                </div>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </Wrapper>
  );
};

Assets.propTypes = {
  app: PropTypes.object.isRequired,
  appId: PropTypes.string,
  onChangeVideoUrl: PropTypes.func.isRequired,
  onSubmitToServer: PropTypes.func.isRequired,
  refetch: PropTypes.func.isRequired,
  videoUrl: PropTypes.string,
};

Assets.defaultProps = {
  appId: '',
  videoUrl: '',
};

export default Assets;

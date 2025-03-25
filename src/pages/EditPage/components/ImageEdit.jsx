import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import DefaultBoothImage from '../Booth/images/defaultBoothImage';

const ImageEdit = ({ thumbnailImage, onImageChange }) => {
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    if (thumbnailImage) {
      const url = URL.createObjectURL(thumbnailImage);
      setPreviewUrl(url);

      return () => URL.revokeObjectURL(url);
    }
  }, [thumbnailImage]);

  const handleImageChange = event => {
    const file = event.target.files[0];
    if (file) {
      onImageChange(file);
    }
  };

  return (
    <ImageContainer>
      <ImageWrapper>
        {previewUrl ? (
          <Image src={previewUrl} alt='대표 사진' />
        ) : (
          <DefaultBoothImage />
        )}
        <Overlay>
          사진 수정하기
          <HiddenInput
            type='file'
            accept='image/*'
            onChange={handleImageChange}
          />
        </Overlay>
      </ImageWrapper>
    </ImageContainer>
  );
};

export default ImageEdit;

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 15.375rem;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f0f0f0;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Overlay = styled.label`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 3.375rem;
  background: rgba(0, 0, 0, 0.75);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s ease-in-out;

  &:hover {
    background: rgba(0, 0, 0, 0.7);
  }
`;

const HiddenInput = styled.input`
  display: none;
`;

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import http from '@/api/http';
import ImageEdit from './components/ImageEdit';
import MenuStatus from './components/MenuStatus';
import Header1 from './components/Header1';
import getBoothId from '@/api/getBoothId';

const MenuEdit = () => {
  const { id: menuId } = useParams();
  const isEditMode = !!menuId;
  const navigate = useNavigate();
  const [boothId, setBoothId] = useState(null);

  const [name, setName] = useState('');
  const [price, setPrice] = useState(null);
  const [isSale, setSale] = useState(true);
  const [thumbnailImage, setThumbnailImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const id = await getBoothId();
        setBoothId(id);
        const res = await http.get(`/menus/${id}/`);
        const targetMenu = res.data.find(menu => menu.id === parseInt(menuId));
        if (targetMenu) {
          setName(targetMenu.name);
          setPrice(targetMenu.price);
          setSale(targetMenu.is_sale);
          setThumbnailImage(targetMenu.thumbnail);
          setBoothId(id);
        }
      } catch (err) {
        console.error('메뉴 정보 불러오기 실패:', err);
      }
    };

    fetchMenu();
  }, []);

  useEffect(() => {
    if (!thumbnailImage) {
      setPreviewUrl(null);
      return;
    }

    if (typeof thumbnailImage === 'string') {
      setPreviewUrl(thumbnailImage);
    } else {
      const url = URL.createObjectURL(thumbnailImage);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [thumbnailImage]);

  const handleSubmit = async () => {
    const formData = new FormData();
    if (thumbnailImage && typeof thumbnailImage !== 'string') {
      formData.append('thumbnail_image', thumbnailImage);
    }
    formData.append('name', name);
    formData.append('price', price);
    formData.append('is_sale', isSale);

    try {
      if (isEditMode) {
        await http.patch(`/menus/${boothId}/${menuId}/`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        alert('메뉴가 수정되었습니다.');
      } else {
        await http.post(`/menus/${boothId}/`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        alert('메뉴가 생성되었습니다.');
      }
      navigate(-1);
    } catch (err) {
      console.error('에러 발생:', err);
      alert('처리에 실패했습니다.');
    }
  };

  return (
    <EditWrapper>
      <Header1 buttonText='완료' onClick={handleSubmit} />
      <ImageEdit
        imageSrc={previewUrl}
        onImageChange={e => {
          const file = e.target.files[0];
          if (file) setThumbnailImage(file);
        }}
      />
      <InputWrapper>
        <Title>메뉴명</Title>
        <Input value={name} onChange={e => setName(e.target.value)} />

        <Title>가격</Title>
        <section>
          <Input
            type='number'
            value={price}
            onChange={e => setPrice(parseInt(e.target.value, 10) || 0)}
          />
          <span>원</span>
        </section>

        <MenuStatus isSale={isSale} setSale={setSale} />
      </InputWrapper>
    </EditWrapper>
  );
};

export default MenuEdit;

const EditWrapper = styled.div`
  position: relative;
  height: 100vh;
  overflow-y: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const InputWrapper = styled.div`
  padding-inline: 1.5rem;
  section {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }
  span {
    ${({ theme }) => theme.fontStyles.regular_14pt}
  }
`;

const Title = styled.h2`
  width: 100%;
  margin-bottom: 1rem;
  margin-top: 2rem;
  ${({ theme }) => theme.fontStyles.semibold_16pt}
`;
const Input = styled.input`
  border-radius: 0.6875rem;
  border: none;
  background: var(--gray1);
  width: 100%;
  height: 2.8125rem;
  padding: 0.75rem 1rem;
  color: var(--gray3);
  ${({ theme }) => theme.fontStyles.regular_14pt}
`;

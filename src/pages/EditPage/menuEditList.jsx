import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import getBoothId from '@/api/getBoothId';
import http from '@/api/http';
import { Plus } from '@/assets/icons';
import MenuCard from '@/common/Menu';
import Modal from '@/common/Modal';

import Header2 from './components/Header2';

const MenuEditList = () => {
  const [boothId, setBoothId] = useState(null);
  const [menus, setMenus] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const navigate = useNavigate();

  const fetchMenus = async () => {
    try {
      const id = await getBoothId();
      setBoothId(id);
      const res = await http.get(`/menus/${id}/`);
      setMenus(res.data);
      setBoothId(id);
    } catch (err) {
      console.error('메뉴 불러오기 실패:', err);
    }
  };

  useEffect(() => {
    fetchMenus();
  }, []);

  const handleMenuClick = id => {
    navigate(`/menuEdit/${id}`);
  };

  const handleAddMenu = () => {
    navigate('/menuEdit');
  };
  const handleDelete = async () => {
    try {
      await http.delete(`/menus/${boothId}/${selectedId}/`);
      setMenus(prev => prev.filter(menu => menu.id !== selectedId));
    } catch (err) {
      console.error('삭제 실패:', err);
      alert('삭제 중 오류가 발생했습니다.');
    } finally {
      setIsModalOpen(false);
      setSelectedId(null);
    }
  };
  const openDeleteModal = id => {
    setSelectedId(id);
    setIsModalOpen(true);
  };
  return (
    <EditWrapper>
      <Header2 />
      <Text>수정하고 싶은 메뉴를 선택해주세요.</Text>
      <MenuWrapper>
        {menus.map(menu => (
          <MenuCard
            key={menu.id}
            id={menu.id}
            name={menu.name}
            price={menu.price}
            thumbnail={menu.thumbnail}
            isSale={menu.is_sale}
            onClick={() => handleMenuClick(menu.id)}
            onDelete={() => {
              openDeleteModal(menu.id);
            }}
          />
        ))}
        <AddMenu onClick={() => handleAddMenu()}>
          <Plus />
        </AddMenu>
      </MenuWrapper>
      {isModalOpen && (
        <Modal
          title='메뉴 삭제'
          modalText={
            <>
              메뉴를 삭제하시겠습니까?
              <br />
              삭제한 메뉴는 복구되지 않습니다.
            </>
          }
          onDelete={handleDelete}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </EditWrapper>
  );
};

export default MenuEditList;

const EditWrapper = styled.div`
  height: 100vh;
  overflow-y: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Text = styled.h2`
  padding: 1.5rem;
  margin-top: 3rem;
  ${({ theme }) => theme.fontStyles.regular_14pt}
`;

const MenuWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  justify-items: center;
  gap: 1rem;
  margin-inline: 1.5rem;
`;

const AddMenu = styled.div`
  width: 100%;
  aspect-ratio: 1/1;
  border-radius: 0.6875rem;
  background: var(--green1-100);
  display: flex;
  justify-content: center;
  align-items: center;
`;

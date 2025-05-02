import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import MenuCard from '@/common/Menu';
import { Plus } from '@/assets/icons';
import Header2 from './components/Header2';
import http from '@/api/http';
import { useNavigate } from 'react-router-dom';
import getBoothId from '@/api/getBoothId';

const MenuEditList = () => {
  const [boothId, setBoothId] = useState(null);
  const [menus, setMenus] = useState([]);
  const navigate = useNavigate();

  const fetchMenus = async () => {
    try {
      const id = await getBoothId();
      setBoothId(id);
      const res = await http.get(`/menus/${id}/`);
      setMenus(res.data);
      setBoothId(id);
      console.log(res.data);
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
  const handleDelete = async id => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return;

    try {
      await http.delete(`/menus/${boothId}/${id}/`);
      setMenus(prev => prev.filter(menu => menu.id !== id));
      alert('삭제되었습니다.');
    } catch (err) {
      console.error('삭제 실패:', err);
      alert('삭제 중 오류가 발생했습니다.');
    }
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
            onDelete={handleDelete}
          />
        ))}
        <AddMenu onClick={() => handleAddMenu()}>
          <Plus />
        </AddMenu>
      </MenuWrapper>
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

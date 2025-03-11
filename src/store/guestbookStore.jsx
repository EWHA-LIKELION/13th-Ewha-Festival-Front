import { create } from 'zustand';

const useGuestbookStore = create(set => ({
  guestbooks: [
    {
      id: 1,
      username: '익명1',
      content: '정말 맛있어요. ^^^',
      createdAt: '2시간 전',
      isAuthor: true
    },
    {
      id: 2,
      username: '익명2',
      content: '떡볶이 맛있다 떡볶이 맛있다 떡볶이 맛있다...',
      createdAt: '1시간 전',
      isAuthor: false
    }
  ],
  addGuestbook: guestbook =>
    set(state => ({ guestbooks: [guestbook, ...state.guestbooks] })),
  deleteGuestbook: id =>
    set(state => ({ guestbooks: state.guestbooks.filter(gb => gb.id !== id) }))
}));

export default useGuestbookStore;

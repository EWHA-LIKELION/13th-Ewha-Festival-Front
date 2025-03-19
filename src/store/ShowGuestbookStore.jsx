import { create } from 'zustand';
import http from '@/api/http';

const ShowGuestbookStore = create(set => ({
  boothId: null,
  guestbooks: [],
  setGuestbooks: guestbooks => set({ guestbooks }),

  setBoothId: boothId => set({ boothId }),

  addGuestbook: newGuestbook => {
    set(state => ({
      guestbooks: [newGuestbook, ...state.guestbooks]
    }));
  },

  deleteGuestbook: async guestbookId => {
    try {
      const { boothId } = ShowGuestbookStore.getState();
      if (!boothId || !guestbookId) return;

      await http.delete(`/guestbooks/delete/${boothId}/${guestbookId}/`);

      set(state => ({
        guestbooks: state.guestbooks.filter(gb => gb.id !== guestbookId)
      }));
    } catch (error) {
      console.error('Error deleting guestbook:', error);
    }
  }
}));

export const fetchGuestbooks = async boothId => {
  try {
    ShowGuestbookStore.getState().setBoothId(boothId);

    const response = await http.get(`/shows/guestbooks/${boothId}/`);
    const fetchedGuestbooks = response.data.guest_books.map(gb => ({
      id: gb.id,
      username: gb.username,
      content: gb.content,
      createdAt: gb.formatted_created_auset,
      isAuthor: gb.is_author
    }));

    ShowGuestbookStore.getState().setGuestbooks(fetchedGuestbooks);
  } catch (error) {
    console.error('Error fetching guestbooks:', error);
  }
};

export default ShowGuestbookStore;

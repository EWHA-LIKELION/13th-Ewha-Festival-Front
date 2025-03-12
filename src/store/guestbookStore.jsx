import { create } from 'zustand';
import axios from 'axios';

const useGuestbookStore = create(set => ({
  guestbooks: [],
  setGuestbooks: guestbooks => set({ guestbooks }),

  addGuestbook: async (boothId, content) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_PORT}guestbooks/create/${boothId}/`,
        { content },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`
          }
        }
      );

      const newGuestbook = {
        id: response.data.data.guestbook_id,
        username: response.data.data.anonymous_nickname,
        content: response.data.data.content,
        createdAt: response.data.data.created_ago,
        isAuthor: true
      };

      set(state => ({ guestbooks: [newGuestbook, ...state.guestbooks] }));
    } catch (error) {
      console.error('Error adding guestbook:', error);
    }
  },

  deleteGuestbook: id =>
    set(state => ({
      guestbooks: state.guestbooks.filter(gb => gb.id !== id)
    }))
}));

export const fetchGuestbooks = async boothId => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_SERVER_PORT}booths/guestbooks/${boothId}/`
    );
    const fetchedGuestbooks = response.data.guest_books.map(gb => ({
      id: gb.id,
      username: gb.username,
      content: gb.content,
      createdAt: gb.formatted_created_at,
      isAuthor: gb.is_author
    }));

    useGuestbookStore.getState().setGuestbooks(fetchedGuestbooks);
  } catch (error) {
    console.error('Error fetching guestbooks:', error);
  }
};

export default useGuestbookStore;

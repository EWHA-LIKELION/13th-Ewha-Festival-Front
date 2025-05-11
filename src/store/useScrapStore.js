import { create } from 'zustand';

import { getUserInfo } from '@/api/auth';
import http from '@/api/http';

const useScrapStore = create(set => ({
  user: getUserInfo(),
  updateUser: () => set({ user: getUserInfo() }),

  scraps: {
    booths: [],
    shows: [],
    total_scrap_count: 0
  },

  fetchScraps: async () => {
    try {
      const response = await http.get('/mypages/scrapbook/');
      const { booths = [], shows = [] } = response.data.results || {};
      const total_scrap_count = booths.length + shows.length;

      set({
        scraps: {
          booths,
          shows,
          total_scrap_count
        }
      });
    } catch (error) {}
  }
}));

export default useScrapStore;

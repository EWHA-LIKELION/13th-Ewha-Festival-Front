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
      const {
        booths = [],
        shows = [],
        count = 0
      } = response.data.results || {};

      set({
        scraps: {
          booths,
          shows,
          total_scrap_count: count
        }
      });
    } catch (error) {}
  }
}));

export default useScrapStore;

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
      const response = await http.get('/mypage/scrapbook/');
      const { booths, shows, total_scrap_count } = response.data;

      set({
        scraps: {
          booths: booths || [],
          shows: shows || [],
          total_scrap_count: total_scrap_count || 0
        }
      });
    } catch (error) {}
  }
}));

export default useScrapStore;

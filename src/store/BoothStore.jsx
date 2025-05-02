import { create } from 'zustand';

const useBoothStore = create(set => ({
  booth: null,
  setBooth: booth => set({ booth }),
  clearBooth: () => set({ booth: null })
}));

export default useBoothStore;

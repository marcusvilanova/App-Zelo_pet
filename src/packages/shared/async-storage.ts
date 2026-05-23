// Fake AsyncStorage for Web adaptation in AI Studio to fulfill Native requirements
export const AsyncStorage = {
  setItem: async (key: string, value: string) => {
    localStorage.setItem(key, value);
  },
  getItem: async (key: string) => {
    return localStorage.getItem(key);
  },
  removeItem: async (key: string) => {
    localStorage.removeItem(key);
  },
  clear: async () => {
    localStorage.clear();
  }
};

import { MMKV } from 'react-native-mmkv';
import { StateStorage } from 'zustand/middleware';
export const storage = new MMKV({
  id: 'trade-sphere',
});

export const zustandStorage: StateStorage = {
  setItem: (key, value) => {
    return storage.set(key, JSON.stringify(value));
  },
  getItem: (key) => {
    const value = storage.getString(key);
    return value ? JSON.parse(value) : null;
  },
  removeItem: (key) => {
    return storage.delete(key);
  },
};

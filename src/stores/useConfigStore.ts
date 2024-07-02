import { zustandStorage } from '@configs/storage';
import create from 'zustand';
import { combine, createJSONStorage, persist } from 'zustand/middleware';

export const useConfigStore = create(
  persist(
    combine({}, (set, get) => ({})),
    {
      name: '@configStates',
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);

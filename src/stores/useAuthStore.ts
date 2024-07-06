import { zustandStorage } from '@configs/storage';
import { TUser } from '@screens/Auth/SignIn/types';
import { decodeJWT } from '@utils/decodeJWT';
import { create } from 'zustand';
import { combine, createJSONStorage, persist } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    combine(
      {
        token: null as string | null,
        refreshToken: null as string | null,
        currentUser: null as TUser | null,
      },
      (set, get) => ({
        isAuthenticated: () => !!get().currentUser,
        setTokens: (token: string, refreshToken: string) =>
          set({ token, refreshToken, currentUser: decodeJWT(token) }),
        setCurrentUser: (user: TUser) => set({ currentUser: user }),
        setAccessToken: (token: string) =>
          set({ token, currentUser: decodeJWT(token) }),
        clearTokens: () =>
          set({ token: null, refreshToken: null, currentUser: null }),
      })
    ),
    {
      name: '@authStates',
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);

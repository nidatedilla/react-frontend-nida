import { UserTypes } from 'types/user.types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserStore {
  user: UserTypes | null;
  setUser: (user: UserTypes) => void;
  logout: () => void;
}

const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => {
        set({ user });
      },
      logout: () => {
        localStorage.removeItem('token');
        set({ user: null });
      },
    }),
    {
      name: 'user-storage',
      partialize: (state) => ({ user: state.user }),
    }
  )
);

export default useUserStore;

import { create } from 'zustand';

interface LikeStore {
  likedThreads: {
    [threadId: number]: { isLiked: boolean; likesCount: number };
  };
  toggleLike: (threadId: number, isLiked: boolean, likesCount: number) => void;
}

const useLikeStore = create<LikeStore>((set) => ({
  likedThreads: {},

  toggleLike: (threadId, isLiked, likesCount) =>
    set((state) => ({
      likedThreads: {
        ...state.likedThreads,
        [threadId]: { isLiked, likesCount },
      },
    })),
}));

export default useLikeStore;

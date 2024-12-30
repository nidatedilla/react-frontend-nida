import { ThreadTypes } from "types/thread.types";
import { create } from "zustand";

interface ThreadStore {
  threads: ThreadTypes[];
  setThreads: (threads: ThreadTypes[]) => void;
}

const useThreadStore = create<ThreadStore>((set) => ({
  threads: [],
  setThreads: (threads) => set({ threads }),
}));

export default useThreadStore;
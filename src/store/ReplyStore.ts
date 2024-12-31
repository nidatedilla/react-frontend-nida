import { ReplyTypes } from 'types/reply.types';
import { create } from 'zustand';

interface ReplyStore {
  replies: ReplyTypes[];
  setReplies: (replies: ReplyTypes[]) => void;
  updateReply: (replyId: number, updatedReply: Partial<ReplyTypes>) => void;
}

const useReplyStore = create<ReplyStore>((set) => ({
  replies: [],
  setReplies: (replies) => set({ replies }),
  updateReply: (replyId, updatedReply) =>
    set((state) => ({
      replies: state.replies.map((reply) =>
        reply.id === replyId ? { ...reply, ...updatedReply } : reply
      ),
    })),
}));

export default useReplyStore;
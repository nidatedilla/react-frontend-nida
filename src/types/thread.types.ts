export interface ThreadTypes {
  id: number;
  authorId: number;
  content: string;
  image: string | null;
  author: {
    id: number;
    username: string | null;
    fullname: string;
    avatarImage: string | null;
  };
  duration: string;
  createdAt: {
    date: string;
    time: string;
  };
  likesCount: number;
  repliesCount: number;
  isLiked: boolean;
}

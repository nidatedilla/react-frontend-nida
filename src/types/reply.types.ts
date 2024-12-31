export interface ReplyTypes {
  id: number;
  content: string;
  image:string;
  createdAt: string;
  duration: string;
  author: { 
    id: number;
    username: string;
    fullname: string;
    avatarImage: string | null;
  };
  isLiked:boolean;
  likesCount: number;
}

export interface UserTypes {
  id: number;
  email: string;
  username: string;
  fullname: string;
  bio: string;
  coverImage: string;
  avatarImage: string;
  followingCount: number;
  followersCount: number;
  followableUsers: User[];
}

export interface User {
  id: number;
  followingId: number;
  username: string;
  fullname: string;
  avatarImage: string;
  bio: string;
  isFollowed: boolean;
  isFollowedByTarget: boolean;
  followingCount: number;
  followersCount: number;
}

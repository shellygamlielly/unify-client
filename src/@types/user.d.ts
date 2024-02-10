export interface IUser {
  spotifyId?: string;
  spotifyAccessToken?: string;
  email?: string;
  profileImage?: string | null;
  displayName?: string | null;
  userId?: string;
}

export type UserContextType = {
  user: IUser;
  setUser: (user: IUser) => void;
  setUserId: (userId: string) => void;
};

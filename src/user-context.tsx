import { FC, ReactNode, createContext, useContext, useState } from "react";
import { IUser, UserContextType } from "./@types/user";

const initialUser: IUser = {
  spotifyId: undefined,
  spotifyAccessToken: undefined,
  email: undefined,
  profileImage: null,
  displayName: null,
  userId: undefined,
};

const initialContext: UserContextType = {
  user: initialUser,
  setUser: () => {},
  setUserId: () => {},
};

export const UserContext = createContext<UserContextType>(initialContext);

export const UserProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<IUser>(initialUser);

  const setUserId = (newUserId: string) => {
    setUser((prevUser) => ({ ...prevUser, userId: newUserId }));
  };

  const contextValue: UserContextType = {
    user,
    setUser,
    setUserId,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

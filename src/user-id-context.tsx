import { createContext, useContext, ReactNode, useState, FC } from "react";

interface UserIdContextProps {
  userId: string | null;
  setUserId: (userId: string) => void;
}

const UserIdContext = createContext<UserIdContextProps | undefined>(undefined);

export const UserIdProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [userId, setUserId] = useState<string | null>(null);

  return (
    <UserIdContext.Provider value={{ userId, setUserId }}>
      {children}
    </UserIdContext.Provider>
  );
};

export const useUserId = () => {
  const context = useContext(UserIdContext);
  if (!context) {
    throw new Error("useUserId must be used within a UserIdProvider");
  }
  return context;
};

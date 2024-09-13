// types.ts
export interface User {
    id: string;
    // Add other user properties if needed
  }
  
  export interface AuthContextType {
    user: User | null;
    login: (newData: User) => void;
    logout: () => Promise<void>;
    getProfileUser: () => Promise<User | undefined>;
    userInfo: User | undefined;
  }
  
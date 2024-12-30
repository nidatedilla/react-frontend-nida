import { createContext, ReactNode, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
  email: string;
  name: string;
  username: string;
  password: string;
  bio: string;
}

interface UserContextType {
  currentUser: User | null;
  setUser: (email: string, password: string) => void;
  updateUser: (updatedUser: Partial<User>) => void;
}

const dummyUsers: User[] = [
  {
    email: 'nidatedilla@gmail.com',
    name: 'Nida Tedilla',
    username: '@nidatedilla',
    password: 'nida1234',
    bio: '🌷🍰🍦🎀',
  },
  {
    email: 'tedilla@gmail.com',
    name: 'Tedilla Manuar',
    username: '@tedilla.manuar',
    password: 'nida1234',
    bio: 'Bio unavailabel',
  },
];

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const navigate = useNavigate();

  const setUser = (email: string, password: string) => {
    const foundUser = dummyUsers.find(
      (user) => user.email === email && user.password === password
    );
    if (foundUser) {
      setCurrentUser(foundUser);
      localStorage.setItem('userMail', foundUser.email);
      localStorage.setItem('username', foundUser.username);
      navigate('/');
    } else {
      alert('Invalid Username and Password!');
    }
  };

  const updateUser = (updatedUser: Partial<User>) => {
    if (currentUser) {
      const newUser = { ...currentUser, ...updatedUser };
      setCurrentUser(newUser);
  
      localStorage.setItem('userMail', newUser.email);
      localStorage.setItem('username', newUser.username);
      localStorage.setItem('bio', newUser.bio || '');
    }
  };
  

  return (
    <UserContext.Provider value={{ currentUser, setUser, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

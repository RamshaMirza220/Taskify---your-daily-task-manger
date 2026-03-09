import { createContext, useState, useEffect, type ReactNode } from "react";
import { type User, type Todo }  from "../constants";
import {
  getUsers, saveUsers, saveSession,
  getSession, clearSession, getUserById, updateUser
} from "./authStorage";
import { generateId } from "../theme";

// Shape of everything the auth context provides
export type AuthContextType = {
  user: User | null;           // null = guest mode
  isGuest: boolean;
  signUp: (name: string, email: string, password: string) => string | null;
  signIn: (email: string, password: string) => string | null;
  signOut: () => void;
  saveTodos: (todos: Todo[]) => void;
};

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // On mount — restore session if one exists
  useEffect(() => {
    const sessionId = getSession();
    if (sessionId) {
      const found = getUserById(sessionId);
      if (found) setUser(found);
    }
  }, []);

  // Returns null on success, error message string on failure
  const signUp = (name: string, email: string, password: string): string | null => {
    const users = getUsers();
    if (users.find((u) => u.email === email)) return "Email already registered.";
    const newUser: User = { id: generateId(), name, email, password, todos: [] };
    saveUsers([...users, newUser]);
    return null;
  };

  // Returns null on success, error message string on failure
  const signIn = (email: string, password: string): string | null => {
    const users = getUsers();
    const found = users.find((u) => u.email === email && u.password === password);
    if (!found) return "Invalid email or password.";
    saveSession(found.id);
    setUser(found);
    return null;
  };

  const signOut = () => {
    clearSession();
    setUser(null);
  };

  // Persists the user's current todos to localStorage
  const saveTodos = (todos: Todo[]) => {
    if (!user) return;
    const updated = { ...user, todos };
    updateUser(updated);
    setUser(updated);
  };

  return (
    <AuthContext.Provider value={{
      user,
      isGuest: user === null,
      signUp, signIn, signOut, saveTodos
    }}>
      {children}
    </AuthContext.Provider>
  );
}
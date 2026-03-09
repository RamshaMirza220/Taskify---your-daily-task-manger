import { type User } from "../constants";

const USERS_KEY    = "today_users";
const SESSION_KEY  = "today_session";

// Read all users from localStorage
export function getUsers(): User[] {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
  } catch { return []; }
}

// Save entire users array back to localStorage
export function saveUsers(users: User[]): void {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

// Save logged-in user's ID as the current session
export function saveSession(userId: string): void {
  localStorage.setItem(SESSION_KEY, userId);
}

// Get the current session's user ID
export function getSession(): string | null {
  return localStorage.getItem(SESSION_KEY);
}

// Clear the session on logout
export function clearSession(): void {
  localStorage.removeItem(SESSION_KEY);
}

// Find a user by their ID
export function getUserById(id: string): User | null {
  return getUsers().find((u) => u.id === id) ?? null;
}

// Update a single user's data (used to save todos)
export function updateUser(updated: User): void {
  const users = getUsers().map((u) => u.id === updated.id ? updated : u);
  saveUsers(users);
}
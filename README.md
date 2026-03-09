# ✦ Taskify- your daily task manager

> A full-featured, SaaS-style task management application built with React, TypeScript, and Vite. Supports user authentication, persistent sessions, Kanban board view, productivity analytics, due dates, tags, and a complete dark/light theme system — all without a backend.

![React](https://img.shields.io/badge/React-18-61dafb?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?style=flat-square&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-5-646cff?style=flat-square&logo=vite)
![No Backend](https://img.shields.io/badge/Backend-None-10b981?style=flat-square)

---

## What is Taskify?

Taskify is a personal productivity web application where users can create accounts, manage tasks, track progress, and visualize their productivity — all stored in the browser 

The goal was to build something that feels like a real SaaS product using only React, TypeScript, and localStorage.

---

## Features

### Task Management
- Add tasks with title, priority, due date, due time, and tags
- Complete, edit, and delete tasks
- Drag and drop to reorder
- Live search across all tasks
- Filter by status — All / Active / Completed
- Filter by tag — Work / Study / Personal / Urgent
- Bulk clear all completed tasks
- Relative timestamps — "just now", "2h ago", "3d ago"

### Priority System
- Three levels — Low, Medium, High
- Color-coded priority stripes on every task card — Green / Yellow / Red

### Due Dates and Urgency
- Assign a due date and optional due time to any task
- Urgency colors update automatically — Green (upcoming) / Yellow (due today) / Red (overdue)

### Views
- **List View** — classic vertical task list with drag-and-drop
- **Board View** — Kanban board with To Do, Doing, and Done columns
- Move tasks between columns and completing a task auto-moves it to Done

### Authentication
- Create an account with name, email, and password
- Sign in and sign out
- Persistent login — stay logged in after page refresh
- Guest mode — use the app without an account
- Per-user task storage — each account has its own isolated task list
- Seamless flow — Sign Up → Sign In → Dashboard automatically, no back button needed

### Analytics Panel
- Tasks completed this week
- Overall completion rate
- Average tasks per day
- 7-day bar chart showing daily completion history

### Theme System
- Full dark and light mode
- Token-based — single boolean controls the entire UI palette
- Smooth animated transition between themes

---

## Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| Framework | React 18 | Component UI, hooks-based state |
| Language | TypeScript | Type safety, interfaces |
| Build Tool | Vite | Fast dev server and bundler |
| Styling | Inline styles + injected CSS | Zero CSS dependencies, theme-reactive |
| Auth & Storage | localStorage | Persistent sessions, no backend needed |
| Global State | React Context API | Auth state across the component tree |
| Fonts | Google Fonts | DM Serif Display + DM Sans |

---

## Project Structure

```
TODAY/
├── index.html
└── src/
    ├── main.tsx                  # Entry point, wraps app with AuthProvider
    ├── App.tsx                   # Root component, global state, page routing
    ├── theme.ts                  # Theme tokens, color helpers, utility functions
    ├── constants.ts              # Types, static config, priority definitions
    │
    ├── auth/
    │   ├── AuthContext.tsx       # Global auth state via React Context
    │   ├── authStorage.ts        # localStorage read/write abstraction layer
    │   └── useAuth.ts            # Custom hook to consume auth context
    │
    ├── pages/
    │   ├── SignIn.tsx            # Sign in screen
    │   └── SignUp.tsx            # Account creation screen
    │
    └── components/
        ├── Header.tsx            # Title, stats, view switcher, theme, profile
        ├── InputCard.tsx         # Task input with priority, due date, tags
        ├── SearchBar.tsx         # Search input and tag filter row
        ├── FilterBar.tsx         # All / Active / Completed filter tabs
        ├── TodoItem.tsx          # Individual task card with all interactions
        ├── KanbanBoard.tsx       # Board view with three columns
        ├── AnalyticsPanel.tsx    # Stats modal with bar chart visualization
        └── ProfileMenu.tsx       # Profile dropdown for auth actions
```

---

## Architecture Notes

**Why React Context for auth?**
The authenticated user is needed in the Header, ProfileMenu, and App simultaneously. Context eliminates prop drilling without requiring a third-party state library.

---

## Data Model

```ts
type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  todos: Todo[];
};

type Todo = {
  id: string;
  text: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
  createdAt: number;
  dueDate?: string;
  dueTime?: string;
  tags: string[];
  column: "todo" | "doing" | "done";
};
```

localStorage keys:
```
today_users    →  User[]    (all registered accounts)
today_session  →  string    (currently logged-in user ID)
```

---

## Getting Started

### Prerequisites
- Node.js 16 or higher

### Run locally

Open `https://taskify-your-daily-task-manger.vercel.app/`



> Built by [Your Name] — [Portfolio](https://yourportfolio.com) · [LinkedIn](https://linkedin.com)

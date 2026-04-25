# Coding Standards & Workflow

## Tools
- **Linter**: ESLint (standard MERN config)
- **Formatter**: Prettier
- **CSS**: Tailwind CSS (Utility first)

## Git Branching Strategy (GitFlow Lite)
- `main`: Production ready code.
- `develop`: Integration branch for new features.
- `feature/[name]`: Individual feature development.

## Conventions
- **Naming**: camelCase for variables/functions, PascalCase for React Components.
- **Components**: Functional components with Hooks.
- **State**: Zustand for global state, `useState` for local UI state.
- **Commits**: Descriptive messages (e.g., `feat: add dual spec toggle`).

## Testing
- **Backend (API)**: Postman (Manual/Documentation) + Supertest/Jest (Automated)
- **Frontend (UI)**: Vitest + React Testing Library (Automated)


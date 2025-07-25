# mindtech-dash

Mindtech apps material-ui dashboard test task.

# Objective:

Objective:
Build a small dashboard to view and explore user data from an external API. The UI must be
built using React + TypeScript, styled with Material UI, and make use of the Context API. User
data should be fetched asynchronously from:
https://jsonplaceholder.typicode.com/users,
https://jsonplaceholder.typicode.com/users/{userId}
Requirements:

1. Project Setup
   ○ Initialize a new React project with TypeScript template.
   ○ Set up a folder structure that you would use in a production-ready application.
2. Users API
   ○ Use this API endpoints to fetch the required data from:
   https://jsonplaceholder.typicode.com/users,
   https://jsonplaceholder.typicode.com/users/{userId}

3. Users list page
   ○ Fetch user data from the API.
   ○ Display the list of users using Material react table
   https://www.material-react-table.com/
   ○ Show the following user fields:
   ■ name
   ■ email
   ■ username
   ■ Company name
   ○ Add a search input to filter users by name or email (case-insensitive).
   ○ Display loading and error states with appropriate UI.
4. Error Handling
   ○ Display an error message if the user(s) is not found or if there is any issue with
   the API request.
5. Users context
   ○ Create a UserContext using React's Context API to:
   ■ Store and provide the list of users.
   ■ Manage loading and error states.
   ■ Expose a method to refetch users (e.g., “Retry” button when there's an
   error).
6. User details modal

○ Clicking a user opens a modal (Material UI) showing more details:
■ name, username, email, phone, website, company.name, and
address.city.

Deliverables:

1. A link to the project git repository.
2. A README file with instructions on how to run the project.
   Bonus (Optional):
   ● Sorting users (e.g., by name or company)
   ● Add a "Create New User" form (local only, no need to persist to API).

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default tseslint.config([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs["recommended-typescript"],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

# Todo List Application

A simple and interactive Todo List application built with React, TypeScript, and Vite.
This app allows users to add, edit, delete, and filter tasks, with data persisted in localStorage to retain tasks after page refresh.

### Features

- Add Tasks: Create new tasks using a form with an input field and submit button.
- Edit Tasks: Modify existing task text for easy updates.
- Delete Tasks: Remove tasks from the list with a single click.
- Task Completion Tracking: Mark tasks as completed using checkboxes.
- Filter Tasks: View tasks by status: All, Active (incomplete), or Completed.
- Active Task Count: Display the number of incomplete tasks remaining.
- Data Persistence: Save tasks in localStorage to retain them after page refresh.

### Stack

- Frontend: React, TypeScript
- Styling: SCSS modules
- State Management: Zustand
- Build Tool: Vite
- Code Quality: ESLint, Prettier
- Git Hooks: Husky
- Package Manager: npm

### Prerequisites

Ensure you have the following installed:

- Node.js (version >= 18.x)
- npm (version >= 9.x)

### Setup and Running

1. Clone the repository:
   `$ git clone https://github.com/Yuliafire/test-todo`.
2. Navigate to the project directory:
   `$ cd test-todo`
3. Install dependencies:
   `$ npm install`
4. Start the development server:
   `$ npm run dev`
5. Build the project for production:
   `$ npm run build`
6. Run ESLint to check for linting issues and automatically fix them:
   `$ npm run lint`
7. Formats the codebase using Prettier:
   `$ npm run format:fix`
8. Preview the production build locally using Vite:
   `$ npm run preview`
9. Prepares the project for Git hooks using Husky:
   `$ npm run prepare`

### Contributing

1.  Clone the repository:
    `$ git clone https://github.com/Yuliafire/test-todo`
2.  Navigate to the project directory:
    `$ cd test-todo`
3.  Install dependencies:
    `$ npm install`
4.  Start the development server:
    `$ npm run dev`
5.  Create a feature branch `$ git switch -c feature/YourFeature`
6.  Commit your changes `$ git commit -m 'Add YourFeature'`
7.  Push to the branch `$ git push origin feature/YourFeature`
8.  Open a pull request to `develop` branch

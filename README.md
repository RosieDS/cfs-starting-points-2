# Genie UI Template

This is an internal template project designed to be used as a starting point for rapid prototyping and development within AI coding environments like Cursor, v0, and other AI-powered development tools. It comes pre-configured with our Genie UI component library and development setup to help you quickly build beautiful, functional applications.

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

This starts the development server at [http://localhost:3000](http://localhost:3000). The application will automatically reload as you make changes to your code.

For HTTPS development (useful for testing features that require secure contexts):

```bash
npm run dev:https
```

This starts the development server with HTTPS enabled.

To build and run the production version:

```bash
npm run build && npm start
```

This creates an optimized production build and starts the production server. The build process optimizes your code for the best performance, but does not show changes to the code, until you stop the process and restart it.

**Note:** Use `Cmd+C` (or `Ctrl+C` on Windows/Linux) to stop any of these processes.

## Project Structure

You can start editing the page by modifying `pages/index.tsx`. Feel free to completely delete this page and ask the AI to recreate it. This is the root page of the app.
The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## UI Components

The template includes a comprehensive set of pre-built UI components in the `genie-ui/` directory, including:

- Layout components (Box, Flex, Stack, Grid)
- Form components (Input, Select, Textarea, Button)
- Feedback components (Alert, Toast, Spinner)
- Data display components (Avatar, Typography, Tooltip)
- And many more...

Each component comes with TypeScript support and is ready to use in your projects.

## Deployment to make available online

### Create a ZIP file of your project
- Go to your file browser and find your working project, open the folder
- Press `cmd + shift + .`  to view all files
- Select all files EXCEPT `.git`, `.next`, `certificates`, `node_modules` and any .zip files you might have there.
- Compress / Add to Archive (zip)

### Option 1: Firebase studio
- Go to studio.firebase.google.com
- Start coding an app -> Import Repo
- Upload the zip template file (drag and drop onto upload or click Upload Project)
- Pick a workspace name and continue. 
- Wait for processes to run.
- 3 bars menu on left, Terminal -> new Terminal and run command and wait to finish:
- npm i
- Go to last icon on the left (Firebase Studio)
- Host Web App with Firebase
- Authenticate Firebase and follow instructions (click enter when prompted on Terminal)
- Vist URL when prompted, login with Genie account, Continue and Allow, Yes, Yes, and reach the Copy button. Click
- Paste on Terminal. Success, press a key to close terminal.
- Left side, Initialize Firebase Hosting
- Select in terminal "Create a new project"
- Give a project name (will be used as part of URL)
- When asked, create a new project or re-use an old one.
- Add a name, and when reaching "Detected Next.js" press Y (or just hit Enter)
- Select a region (e.g. europe)
- Set up automatic builds and deploys with GitHub: NO -> press n and enter
- Click Deploy to Production
- Click the URL on the left side on Firebase Hosting
- Feel free to use Firebase Studio Gemini AI to further tweak. Click Deploy to production again to re-deploy to live url
- In case of more complex Next.js files being added (e.g. API routes), this might fail and require extra setup. In this case, Vercel deployment will be easier

### Option 2: Vercel [Requires Personal Github account and synced Git Repo for project]
- Go to Vercel.com and create an account
- Import Repo and follow instructions.# Test webhook deployment

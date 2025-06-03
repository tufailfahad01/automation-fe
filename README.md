# Next.js Frontend

This is the frontend for the Gemini/Supabase/n8n integration task. It provides a modern UI for submitting prompts and viewing responses, communicating with the NestJS backend.

This is a [Next.js](https://nextjs.org) project using the App Router and built with TailwindCSS.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
- [Environment Configuration](#environment-configuration)
- [Project Structure](#project-structure)
- [Pages and Navigation](#pages-and-navigation)
- [Interacting with the Backend](#interacting-with-the-backend)
- [Styling and UI Components](#styling-and-ui-components)
- [Deployment](#deployment)

## Features

- **Modern UI**: Sleek interface built with TailwindCSS
- **Responsive Design**: Works seamlessly on desktop and mobile
- **User Input Form**: Submit prompts to the Gemini AI API
- **Response History**: View all previously generated AI responses
- **Real-time Feedback**: Loading states and submission status indicators

## Getting Started

1. Clone the repository
2. Install dependencies:

   ```bash
   cd frontend
   npm install
   ```

3. Set up environment variables (see [Environment Configuration](#environment-configuration))
4. Run the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

   You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Environment Configuration

Create a `.env.local` file in the `frontend` directory with the following variable:

```
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000
```

- Point this to your backend server's base URL.

## Project Structure

- `src/app/` - Main Next.js app directory (routing, layout, pages)
- `src/common/` - Shared UI components (Button, Card, Input, Loader, Navigation)
- `src/core/` - Core logic and API integration (UserCardForm, ResponsesList, api.ts)
- `src/utils/` - Utility functions

## Pages and Navigation

- `/` - Main page for submitting prompts
- `/responses` - Page for viewing all stored responses
- Navigation bar for easy switching between pages

## Interacting with the Backend

- The frontend communicates with the backend via REST API endpoints (see backend documentation for details)
- All API calls are handled in `src/core/api.ts`
- Make sure the backend is running and accessible at the URL specified in `NEXT_PUBLIC_API_BASE_URL`

## Styling and UI Components

- Built with [TailwindCSS](https://tailwindcss.com/)
- Uses [Outfit](https://fonts.google.com/specimen/Outfit) font for a modern look
- Responsive and accessible design

## Deployment

You can deploy this Next.js app to any platform that supports Node.js. For best results, use [Vercel](https://vercel.com/) for seamless deployment.

---

For backend setup, API endpoints, and integration details, see the `backend/README.md` file.

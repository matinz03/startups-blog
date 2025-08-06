# YC Directory

Pitch your startup, connect with entrepreneurs, and get noticed.

## Overview

YC Directory is a Next.js application for submitting, browsing, and voting on startup ideas. Users can log in with GitHub, create pitches, and explore other startups. The project uses Sanity for content management and Sentry for error monitoring.

## Features

- Submit and edit startup pitches
- Browse and search startups by category or author
- GitHub authentication
- Editor picks and user profiles
- Views tracking for each startup
- Toast notifications for feedback
- Responsive UI with Tailwind CSS

## Tech Stack

- [Next.js](https://nextjs.org/)
- [Sanity](https://www.sanity.io/)
- [Next Auth](https://authjs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Sentry](https://sentry.io/)
- [Radix UI](https://www.radix-ui.com/)
- [React](https://react.dev/)

## Getting Started

1. **Install dependencies:**

   ```sh
   npm install
   ```

2. **Set up environment variables:**

   Copy `.env.local.example` to `.env.local` and fill in your credentials:

   ```
   AUTH_SECRET=...
   AUTH_GITHUB_ID=...
   AUTH_GITHUB_SECRET=...
   NEXT_PUBLIC_SANITY_PROJECT_ID=...
   NEXT_PUBLIC_SANITY_DATASET=...
   SANITY_WRITE_TOKEN=...
   SENTRY_AUTH_TOKEN=...
   ```

3. **Run the development server:**

   ```sh
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

- `npm run dev` – Start development server
- `npm run build` – Build for production
- `npm run start` – Start production server
- `npm run lint` – Run ESLint
- `npm run typegen` – Generate Sanity types

## Folder Structure

- `app/` – Next.js app routes
- `components/` – UI and feature components
- `lib/` – Utility functions and server actions
- `hooks/` – Custom React hooks
- `sanity/` – Sanity schemas and config
- `public/` – Static assets

## Deployment

(https://startups-blog.vercel.app/)

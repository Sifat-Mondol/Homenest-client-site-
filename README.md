# HomeNest — A Real Estate Listing Portal

Live site: **https://YOUR_CLIENT_SITE_URL** (replace with your deployed client URL)

## Project Overview
HomeNest is a single-page real estate listing platform created for the Assignment Category 0013. Owners can post properties for rent or sale, and users can browse, search, sort and review listings.

## Key features
- User authentication: Email/password + Google sign-in via Firebase Auth.
- Protected routes: Add Property, My Properties, My Ratings, Property Details require login.
- CRUD operations for properties (Add, Update, Delete) stored in MongoDB.
- Property listing with search and backend sorting (by date or price).
- Ratings & Reviews (1–5 stars) per property.
- Responsive design with a modern UI, slider banner, consistent typography.
- Alerts and notifications via SweetAlert2 (no browser default alerts).
- Loading spinners on data fetches for better UX.
- Dark mode support and accessible components.

## Tech stack
- Frontend: React (Vite), Tailwind CSS, DaisyUI (optional), React Router, SweetAlert2
- Auth: Firebase Authentication
- Backend: Node.js (Express), MongoDB (Atlas)
- Deployment: Client (Netlify / Firebase / Vercel), Server (Vercel / Render / Heroku)

## Setup (local)
1. Clone client and server repositories
2. Client: create `.env` in client root with:

# Prium E-Commerce

Modern e-commerce demo (React + Vite front-end, Node/Express + MongoDB backend).

Quick overview
- Frontend: React + TypeScript + Vite + MUI
- Backend: Node.js (ESM) + Express + MongoDB (Mongoose)
- API endpoints under `/api/*` (health, auth, products, categories, cart, orders, etc.)

Prerequisites
- Node.js (>=18 recommended)
- npm
- MongoDB Atlas account (or local MongoDB)

Setup (backend)
1. Open a terminal in the `backend` folder:
   cd backend
2. Install dependencies:
   npm install
3. Configure environment variables:
   - Copy `.env` from `.env.example` (or create one) and set `MONGODB_URI`.
   - Example Atlas connection string format:
     `mongodb+srv://<DB_USER>:<DB_PASS>@cluster0.abcd1234.mongodb.net/prium-ecommerce?retryWrites=true&w=majority`
4. Start the backend in dev mode (nodemon):
   npm run dev
5. Health check: http://localhost:5000/api/health  (or the port in your `.env`)

Setup (frontend)
1. From the project root (or `src` parent):
   npm install
2. Start the frontend (Vite):
   npm run dev
3. Open http://localhost:5175 (or URL shown by Vite)

Seeding demo data
- If a seed script exists in `backend/scripts/seedData.js`, run:
  cd backend && npm run seed
- This populates the database with example products/categories for development.

Notes & security
- Do NOT commit secrets (.env) to the repo. Add `.env` to `.gitignore` and keep a `.env.example` with keys only.
- This repo currently had a `.env` committed; remove it and add `.env.example` if you want to keep the project public:
  git rm --cached backend/.env
  git commit -m "remove sensitive .env"
  git push

Admin actions & testing
- Categories endpoints (public list, admin create/update/delete) are under `/api/categories`.
- If you use Atlas, ensure your Network Access allows your development IP or `0.0.0.0/0`.

Troubleshooting
- If backend cannot connect to MongoDB, check `MONGODB_URI`, Atlas user credentials and Network Access IP whitelist.
- Typical errors: ECONNREFUSED, authentication failed — verify connection string and user.

Contributing
- Create feature branches off `main`, open PRs for changes.

License
- MIT (or adjust as you prefer)

---
Generated: short README to get the project running locally. Update any project-specific instructions as needed.

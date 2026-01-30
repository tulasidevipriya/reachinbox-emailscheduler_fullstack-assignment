# ReachInbox Full-stack Email Scheduler

## 🛠️ Architecture
- **Queueing:** BullMQ + Redis (Distributed task management)
- **Database:** PostgreSQL + Prisma (Metadata persistence)
- **Email:** Nodemailer + Ethereal (Fake SMTP)
- **Frontend:** Next.js + Tailwind + NextAuth (Google Login)

## ⚙️ Setup Instructions
1. **Infrastructure:** Run `docker-compose up -d` in the root folder.
2. **Backend:** - `cd backend && npm install`
   - Create `.env` with DB and SMTP credentials.
   - `npx prisma migrate dev`
   - `npm run dev`
3. **Frontend:**
   - `cd frontend && npm install`
   - Create `.env.local` with Google OAuth credentials.
   - `npm run dev`

## 📊 Rate Limiting & Concurrency
- **Concurrency:** Worker configured with `concurrency: 5`.
- **Throttling:** Implemented a minimum 2-second delay between individual sends.
- **Hourly Limit:** Uses a Redis-backed counter. If the limit is hit, jobs are rescheduled for the next hour window using `moveToDelayed()`.

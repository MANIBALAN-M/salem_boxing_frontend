# 🥊 Salem Boxing Club - Supabase Setup Guide

This guide walks you through setting up Supabase PostgreSQL backend for **Salem Boxing Club**, running the database schema, and connecting it to your frontend.

---

## 📋 Step-by-Step Setup Process

### Step 1: Create a Free Supabase Project
1. Go to [https://supabase.com](https://supabase.com) and click **"Sign In"** or **"Start your project"**.
2. Click **"New Project"**.
3. Select your organization and enter:
   - **Name**: `Salem Boxing Club`
   - **Database Password**: Set a strong password (save this securely).
   - **Region**: Choose the closest region to India (e.g. `Singapore (ap-southeast-1)` or `Mumbai (ap-south-1)`).
   - **Pricing Plan**: Free Tier ($0/month).
4. Click **"Create new project"** and wait ~1-2 minutes for Supabase to provision your database.

---

### Step 2: Run the SQL Database Schema
1. In your Supabase Dashboard, click on **"SQL Editor"** (icon with `>_` on the left sidebar).
2. Click **"New query"** (or **"+"**).
3. Open the file `src/supabase_schema.sql` from your project folder (or copy it directly from the Admin Panel under the **"Supabase Config"** tab).
4. Paste the entire SQL script into the editor.
5. Click the green **"RUN"** button in the bottom right.
6. You will see `Success. No rows returned.` — all 8 tables (`queries`, `matches`, `achievements`, `programs`, `schedules`, `trainers`, `plans`, `announcements`), Row Level Security policies, and starter seed data have now been created!

---

### Step 3: Get Your API Credentials
1. In the Supabase Dashboard, go to **Project Settings** (gear icon ⚙️ at the bottom left).
2. Click **"API"** under Configuration.
3. Find the following two values:
   - **Project URL**: (e.g., `https://xyzcompany.supabase.co`)
   - **Project API Keys**: Copy the `anon` / `public` key.

---

### Step 4: Configure Frontend Application

#### Option A: Using `.env` File (Recommended for Production)
In the root of `salem_boxing_frontend/`, create or edit `.env`:
```env
REACT_APP_SUPABASE_URL=https://your-project-id.supabase.co
REACT_APP_SUPABASE_ANON_KEY=eyJhbGciOi...your-long-anon-key-here
```
After modifying `.env`, restart the React development server:
```bash
npm start
```

#### Option B: Live In-App Configuration (Quick Testing)
1. Go to `http://localhost:3000/admin` in your browser.
2. Enter the Admin PIN / Passkey (Default: `1234` or `admin123`).
3. Navigate to the **"Supabase Config"** tab.
4. Paste your **Supabase URL** and **Anon Key**, then click **"Save & Connect"**.
5. Click **"Test Connection"** to verify real-time status!

---

## 🛡️ Row Level Security (RLS) Rules Applied
- **Public Website Visitors**: Can view matches, achievements, programs, schedules, trainers, plans, and announcements. Can submit new queries/leads (`INSERT INTO queries`).
- **Admins**: Can perform all CRUD operations (Create, Read, Update, Delete) on all tables.

---

## 📊 Database Tables Created:
1. `queries` - Contact submissions, trial bookings, and membership leads.
2. `matches` - Upcoming tournaments, championship schedules, dates, venue, and brochure/flyer URLs.
3. `achievements` - Champions Hall of Fame medals, trophies, athlete names, boxer photos, and year.
4. `programs` - Boxing disciplines (Pro Boxing, MMA, Youth, Self Defense).
5. `schedules` - Morning & Evening batch timetable slots and coach assignments.
6. `trainers` - Coach bios, credentials, fight records, and specialties.
7. `plans` - Membership packages, pricing tiers, and benefits.
8. `announcements` - Flash banners and club alerts on the website header.
9. `admin_users` - Role-based staff credentials (`Developer`, `Super Admin`, `Coach`).
10. `gallery` - Custom dynamic gallery photos, categories, and captions.
11. `storage.buckets (sbc-media)` - High-speed storage bucket for direct photo & brochure uploads.





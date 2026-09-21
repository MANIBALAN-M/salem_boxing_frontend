# 🥊 Salem Boxing Club (SBC) — Official Web & Management Platform

[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![React Router](https://img.shields.io/badge/React_Router-v7-CA4245?style=for-the-badge&logo=react-router&logoColor=white)](https://reactrouter.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Database%20%26%20RLS-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)
[![Lucide Icons](https://img.shields.io/badge/Lucide_Icons-Modern_UI-F56565?style=for-the-badge&logo=lucide&logoColor=white)](https://lucide.dev/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)

A state-of-the-art, high-performance web application and administrative management system built for **Salem Boxing Club (SBC)**. It delivers a fast, mobile-first public website for athletes and newcomers, coupled with a robust, real-time backend management portal powered by **Supabase PostgreSQL**.

---

## 🌟 Key Features

### 🏆 1. Public Athlete & Fan Portal
- **Hero & Trial Booking**: High-impact call-to-action with direct trial session enrollment.
- **Programs & Disciplines**: Comprehensive training tracks (Pro Boxing, Amateur, Youth Development, MMA & Self-Defense).
- **Interactive Schedule & Timetable**: Real-time morning and evening batch slot selector with coach assignments.
- **Coach & Trainer Profiles**: Detailed trainer bios, certifications, fight records, and specialties.
- **Hall of Fame & Achievements**: Showcase of state, national, and international championship medals, trophies, and athlete honors.
- **Upcoming Tournaments & Matches**: Live fight fixtures, venue maps, dates, and tournament brochure downloads.
- **Membership & Pricing**: Transparent plan tiers (Monthly, Quarterly, Annual, Personal Coaching).
- **Interactive BMI Fitness Calculator**: Built-in health & boxing weight category calculator.
- **Dynamic Media Gallery**: Filterable photo gallery by categories (Training, Sparring, Tournaments, Awards).
- **Lead Capture & Inquiries**: Instant contact and free-trial booking forms connected to Supabase.
- **Club Broadcast Bar**: Real-time announcement ticker for club updates, camps, and closures.

### ⚡ 2. Admin Management Suite (`/admin`)
- **Secure Multi-Role Access**: Role-based authentication (`Super Admin`, `Coach`, `Developer`).
- **Real-Time Analytics Dashboard**: Visual KPI cards for active inquiries, upcoming matches, enrolled champions, and revenue estimates.
- **Leads & Inquiries CRM**: Filter by status (*New, Contacted, Enrolled, Closed*), search records, and export lead data to CSV.
- **Tournaments & Matches CMS**: Add, edit, or archive upcoming tournament fixtures with custom flyer URLs and ticket links.
- **Hall of Fame Manager**: Update champion athlete profiles, medals won, championship titles, and photo links.
- **Batch Schedule Editor**: Modify training timings, age categories, and trainer assignments on the fly.
- **Trainers & Staff Directory**: Manage coach rosters, credentials, and achievements.
- **Pricing & Plans CMS**: Adjust package pricing, discounts, and feature lists dynamically.
- **Media & Gallery Manager**: Upload and categorize club photos and sparring videos.
- **Live Supabase Diagnostics**: In-app credentials manager, instant latency/connectivity health-check, and embedded SQL schema viewer.
- **Hybrid Data Engine**: Automatic fallback to local storage and seed mock data if offline or before database connection.

---

## 🛠️ Tech Stack

| Component | Technology |
|---|---|
| **Frontend Framework** | [React 19](https://react.dev/) |
| **Routing** | [React Router DOM v7](https://reactrouter.com/) |
| **Icons & Visuals** | [Lucide React](https://lucide.dev/) |
| **Styling & Theme** | Modern Vanilla CSS3 (High-contrast Neon Gold, Crimson Red, Onyx Black, Glassmorphism) |
| **Database & Backend** | [Supabase](https://supabase.com/) (PostgreSQL with Row Level Security) |
| **Hosting & CI/CD** | Compatible with Netlify, Vercel, Firebase Hosting, Cloudflare Pages |

---

## 📁 Project Structure

```text
salem_boxing_frontend/
├── public/                    # Static assets, HTML shell, and icons
├── src/
│   ├── Admin/
│   │   └── AdminPortal.js     # Full-featured CRUD Admin Management Suite
│   ├── Components/
│   │   ├── About.js           # Club heritage, history, and mission
│   │   ├── Achievements.js    # Hall of Fame, tournament medals, awards
│   │   ├── BmiCalculator.js   # Interactive boxer BMI & category calculator
│   │   ├── CallToAction.js    # Quick-conversion callouts
│   │   ├── Contact.js         # Location map, contact info, lead form
│   │   ├── Footer.js          # Club footer, social links, operating hours
│   │   ├── Gallery.js         # Filterable photo & video media showcase
│   │   ├── Hero.js            # Main hero section with animated CTA
│   │   ├── Home.js            # Homepage composition
│   │   ├── JoinUs.js          # Membership registration & trial booking
│   │   ├── Navbar.js          # Responsive sticky navigation & announcements
│   │   ├── Pricing.js         # Membership pricing tiers & feature matrix
│   │   ├── Programs.js        # Training tracks and boxing disciplines
│   │   ├── Schedule.js        # Timetable and batch slot selector
│   │   ├── Trainers.js        # Coaches & personal trainers showcase
│   │   ├── UpcomingMatches.js # Tournament fixtures and brochures
│   │   └── WhyChooseUs.js     # Key benefits and club infrastructure
│   ├── Images/                # Local photos and graphic assets
│   ├── services/
│   │   └── dataService.js     # Unified data layer (Supabase + Local fallback)
│   ├── App.css                # Global components & layout styles
│   ├── App.js                 # App routing & master layout
│   ├── index.css              # Design tokens, variables & base typography
│   ├── index.js               # React root entrypoint
│   ├── supabaseClient.js      # Supabase client initializer & config manager
│   └── supabase_schema.sql    # Complete PostgreSQL schema, tables, and RLS
├── .env                       # Environment variables (Supabase keys)
├── netlify.toml               # Netlify SPA redirect rules
├── package.json               # NPM scripts and dependencies
├── README.md                  # Project documentation
└── SUPABASE_SETUP.md          # Step-by-step Supabase provisioning guide
```

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js** `v18.0.0` or higher
- **npm** `v9.0.0` or higher

### 2. Installation
Clone the repository and install dependencies:

```bash
git clone https://github.com/your-username/salem-boxing-club.git
cd salem_boxing_frontend
npm install
```

### 3. Configure Supabase (Optional for full cloud sync)
Create a `.env` file in the root directory:

```env
REACT_APP_SUPABASE_URL=https://your-project-id.supabase.co
REACT_APP_SUPABASE_ANON_KEY=your-supabase-anon-public-key
```

> **Note**: The application is designed to function seamlessly out of the box with offline seed data even if Supabase is not yet configured. You can also configure Supabase keys live from the `/admin` portal.

### 4. Run Locally
Start the development server:

```bash
npm start
```
The app will open automatically at [http://localhost:3000](http://localhost:3000).

---

## 🗄️ Database & Supabase Setup

To set up the complete cloud PostgreSQL backend in Supabase:

1. Create a project at [supabase.com](https://supabase.com).
2. Open the **SQL Editor** in the Supabase Dashboard.
3. Paste and run the contents of [`src/supabase_schema.sql`](src/supabase_schema.sql).
4. Copy your **Project URL** and **Anon Key** from **Project Settings > API**.
5. Add them to your `.env` file or paste them inside the `/admin` > **Supabase Config** tab.

For step-by-step instructions, see the detailed [Supabase Setup Guide](SUPABASE_SETUP.md).

### Managed Database Tables:
- `queries` — Contact messages, free trial bookings, and membership applications.
- `matches` — Upcoming championship tournaments, venues, dates, and flyers.
- `achievements` — Medals, national champion records, awards, and athlete photos.
- `programs` — Boxing disciplines, descriptions, and difficulty ratings.
- `schedules` — Batch timetable slots, duration, and assigned coaches.
- `trainers` — Coach bios, certifications, fight records, and avatars.
- `plans` — Membership pricing tiers, billing cycles, and feature lists.
- `announcements` — Flash banner alerts on the header.
- `gallery` — Dynamic photo showcase with tags and captions.
- `admin_users` — Role-based staff credentials.

---

## 🔒 Security & Access Control

- **Row Level Security (RLS)**: Public visitors can view active matches, programs, schedules, and submit new leads. All write/edit actions require authenticated API operations or administrative authority.
- **Admin Portal**: Accessible via `/admin` protected by passcode and role authorization.

---

## 📦 Available Scripts

In the project directory, you can run:

| Command | Description |
|---|---|
| `npm start` | Runs the app in development mode on [http://localhost:3000](http://localhost:3000). |
| `npm test` | Launches the interactive test runner. |
| `npm run build` | Compiles the production-ready optimized bundle to the `build/` directory. |
| `npm run eject` | Ejects Create React App configuration (irreversible). |

---

## 🚢 Deployment

### Netlify
A `netlify.toml` file is included with SPA redirect rules configured.
1. Connect your repository to Netlify.
2. Set Build Command: `npm run build`
3. Set Publish Directory: `build`
4. Add environment variables `REACT_APP_SUPABASE_URL` and `REACT_APP_SUPABASE_ANON_KEY` in Netlify dashboard settings.

### Vercel / Other Static Hosts
For platforms like Vercel, ensure rewrite rules point all routes to `/index.html` to support React Router client-side navigation.

---

## 📄 License
This project is licensed under the [MIT License](LICENSE) — see the [LICENSE](LICENSE) file for details. Feel free to customize and use it for your boxing club or fitness gym.

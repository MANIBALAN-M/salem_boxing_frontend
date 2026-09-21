-- ==============================================================================
-- 🥊 SALEM BOXING CLUB - SUPABASE MASTER DATABASE SCHEMA & MIGRATIONS
-- ==============================================================================
-- Run this entire script in your Supabase SQL Editor:
-- https://supabase.com/dashboard/project/_/sql
-- Safe to run multiple times (idempotent & includes automatic migrations).
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ==============================================================================
-- 1. TABLE DEFINITIONS (CREATE IF NOT EXISTS)
-- ==============================================================================

-- 1.1 LEADS & INQUIRIES
CREATE TABLE IF NOT EXISTS public.queries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    experience TEXT DEFAULT 'Beginner',
    interest_program TEXT DEFAULT 'General Boxing',
    message TEXT,
    status TEXT DEFAULT 'New',
    notes TEXT DEFAULT ''
);

-- 1.2 UPCOMING MATCHES & TOURNAMENTS
CREATE TABLE IF NOT EXISTS public.matches (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    title TEXT NOT NULL,
    event_name TEXT DEFAULT 'State Boxing Championship',
    category TEXT DEFAULT 'Senior & Junior Divisions',
    match_date DATE DEFAULT CURRENT_DATE,
    match_time TEXT DEFAULT '06:00 PM',
    venue TEXT DEFAULT 'Indoor Sports Stadium, Salem',
    brochure_url TEXT,
    image_url TEXT,
    status TEXT DEFAULT 'Upcoming',
    description TEXT,
    registration_link TEXT,
    is_featured BOOLEAN DEFAULT true
);

-- 1.3 ACHIEVEMENTS & CHAMPIONS HALL OF FAME
CREATE TABLE IF NOT EXISTS public.achievements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    title TEXT NOT NULL,
    athlete_name TEXT DEFAULT 'Salem Boxer',
    athlete_photo TEXT,
    image_url TEXT,
    category TEXT DEFAULT 'Senior Men Welterweight',
    medal_type TEXT DEFAULT 'Gold',
    year TEXT DEFAULT '2026',
    event_name TEXT DEFAULT 'Tamil Nadu State Championship',
    description TEXT,
    is_highlight BOOLEAN DEFAULT true
);

-- 1.4 TRAINING PROGRAMS
CREATE TABLE IF NOT EXISTS public.programs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    title TEXT NOT NULL,
    tagline TEXT,
    description TEXT NOT NULL,
    level TEXT DEFAULT 'All Levels',
    duration TEXT DEFAULT '60 mins',
    intensity TEXT DEFAULT 'High',
    benefits TEXT[] DEFAULT '{}',
    image_url TEXT,
    display_order INT DEFAULT 0
);

-- 1.5 TIMETABLE & SCHEDULE SLOTS
CREATE TABLE IF NOT EXISTS public.schedules (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    day_of_week TEXT NOT NULL,
    time_slot TEXT NOT NULL,
    period TEXT DEFAULT 'Morning',
    program_title TEXT NOT NULL,
    trainer_name TEXT NOT NULL,
    room TEXT DEFAULT 'Main Ring',
    max_capacity INT DEFAULT 15
);

-- 1.6 TRAINERS & COACHES
CREATE TABLE IF NOT EXISTS public.trainers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    specialty TEXT NOT NULL,
    experience_years TEXT NOT NULL,
    fight_record TEXT,
    bio TEXT,
    photo_url TEXT,
    image_url TEXT,
    social_handle TEXT
);

-- 1.7 MEMBERSHIP PLANS
CREATE TABLE IF NOT EXISTS public.plans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    name TEXT NOT NULL,
    price INT NOT NULL,
    duration TEXT NOT NULL,
    description TEXT,
    features TEXT[] DEFAULT '{}',
    is_popular BOOLEAN DEFAULT false,
    badge TEXT
);

-- 1.8 ANNOUNCEMENTS & FLASH ALERTS
CREATE TABLE IF NOT EXISTS public.announcements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    badge TEXT DEFAULT 'Announcement',
    is_active BOOLEAN DEFAULT true,
    link_url TEXT
);

-- 1.9 ROLE-BASED ADMIN USERS
CREATE TABLE IF NOT EXISTS public.admin_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    username TEXT NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    role TEXT NOT NULL,
    passcode TEXT NOT NULL,
    email TEXT,
    phone TEXT,
    is_active BOOLEAN DEFAULT true
);

-- 1.10 CUSTOM GALLERY & MEDIA
CREATE TABLE IF NOT EXISTS public.gallery (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    title TEXT NOT NULL,
    image_url TEXT NOT NULL,
    category TEXT DEFAULT 'Training',
    caption TEXT,
    is_featured BOOLEAN DEFAULT true
);

-- ==============================================================================
-- 2. AUTOMATIC COLUMN MIGRATIONS (IF TABLES ALREADY EXIST)
-- ==============================================================================
ALTER TABLE public.matches ADD COLUMN IF NOT EXISTS brochure_url TEXT;
ALTER TABLE public.matches ADD COLUMN IF NOT EXISTS image_url TEXT;
ALTER TABLE public.matches ADD COLUMN IF NOT EXISTS event_name TEXT;
ALTER TABLE public.matches ADD COLUMN IF NOT EXISTS category TEXT;
ALTER TABLE public.matches ADD COLUMN IF NOT EXISTS match_date DATE;
ALTER TABLE public.matches ADD COLUMN IF NOT EXISTS match_time TEXT;
ALTER TABLE public.matches ADD COLUMN IF NOT EXISTS venue TEXT;
ALTER TABLE public.matches ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'Upcoming';
ALTER TABLE public.matches ADD COLUMN IF NOT EXISTS description TEXT;
ALTER TABLE public.matches ADD COLUMN IF NOT EXISTS registration_link TEXT;
ALTER TABLE public.matches ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT true;

ALTER TABLE public.achievements ADD COLUMN IF NOT EXISTS athlete_name TEXT;
ALTER TABLE public.achievements ADD COLUMN IF NOT EXISTS athlete_photo TEXT;
ALTER TABLE public.achievements ADD COLUMN IF NOT EXISTS image_url TEXT;
ALTER TABLE public.achievements ADD COLUMN IF NOT EXISTS category TEXT;
ALTER TABLE public.achievements ADD COLUMN IF NOT EXISTS medal_type TEXT;
ALTER TABLE public.achievements ADD COLUMN IF NOT EXISTS year TEXT;
ALTER TABLE public.achievements ADD COLUMN IF NOT EXISTS event_name TEXT;
ALTER TABLE public.achievements ADD COLUMN IF NOT EXISTS description TEXT;
ALTER TABLE public.achievements ADD COLUMN IF NOT EXISTS is_highlight BOOLEAN DEFAULT true;

ALTER TABLE public.trainers ADD COLUMN IF NOT EXISTS photo_url TEXT;
ALTER TABLE public.trainers ADD COLUMN IF NOT EXISTS image_url TEXT;

ALTER TABLE public.gallery ADD COLUMN IF NOT EXISTS category TEXT DEFAULT 'Training';
ALTER TABLE public.gallery ADD COLUMN IF NOT EXISTS caption TEXT;
ALTER TABLE public.gallery ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT true;

ALTER TABLE public.admin_users ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'Coach';
ALTER TABLE public.admin_users ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true;

-- ==============================================================================
-- 3. ROW LEVEL SECURITY (RLS) POLICIES (DROP & RECREATE SAFELY)
-- ==============================================================================
ALTER TABLE public.queries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trainers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;

-- Queries Policy
DROP POLICY IF EXISTS "Public full access queries" ON public.queries;
DROP POLICY IF EXISTS "Public access queries" ON public.queries;
CREATE POLICY "Public full access queries" ON public.queries FOR ALL USING (true) WITH CHECK (true);

-- Matches Policy
DROP POLICY IF EXISTS "Public full access matches" ON public.matches;
DROP POLICY IF EXISTS "Public access matches" ON public.matches;
CREATE POLICY "Public full access matches" ON public.matches FOR ALL USING (true) WITH CHECK (true);

-- Achievements Policy
DROP POLICY IF EXISTS "Public full access achievements" ON public.achievements;
DROP POLICY IF EXISTS "Public access achievements" ON public.achievements;
CREATE POLICY "Public full access achievements" ON public.achievements FOR ALL USING (true) WITH CHECK (true);

-- Programs Policy
DROP POLICY IF EXISTS "Public full access programs" ON public.programs;
DROP POLICY IF EXISTS "Public access programs" ON public.programs;
CREATE POLICY "Public full access programs" ON public.programs FOR ALL USING (true) WITH CHECK (true);

-- Schedules Policy
DROP POLICY IF EXISTS "Public full access schedules" ON public.schedules;
DROP POLICY IF EXISTS "Public access schedules" ON public.schedules;
CREATE POLICY "Public full access schedules" ON public.schedules FOR ALL USING (true) WITH CHECK (true);

-- Trainers Policy
DROP POLICY IF EXISTS "Public full access trainers" ON public.trainers;
DROP POLICY IF EXISTS "Public access trainers" ON public.trainers;
CREATE POLICY "Public full access trainers" ON public.trainers FOR ALL USING (true) WITH CHECK (true);

-- Plans Policy
DROP POLICY IF EXISTS "Public full access plans" ON public.plans;
DROP POLICY IF EXISTS "Public access plans" ON public.plans;
CREATE POLICY "Public full access plans" ON public.plans FOR ALL USING (true) WITH CHECK (true);

-- Announcements Policy
DROP POLICY IF EXISTS "Public full access announcements" ON public.announcements;
DROP POLICY IF EXISTS "Public access announcements" ON public.announcements;
CREATE POLICY "Public full access announcements" ON public.announcements FOR ALL USING (true) WITH CHECK (true);

-- Admin Users Policy
DROP POLICY IF EXISTS "Public full access admin_users" ON public.admin_users;
DROP POLICY IF EXISTS "Public access admin_users" ON public.admin_users;
CREATE POLICY "Public full access admin_users" ON public.admin_users FOR ALL USING (true) WITH CHECK (true);

-- Gallery Policy
DROP POLICY IF EXISTS "Public full access gallery" ON public.gallery;
DROP POLICY IF EXISTS "Public access gallery" ON public.gallery;
CREATE POLICY "Public full access gallery" ON public.gallery FOR ALL USING (true) WITH CHECK (true);

-- ==============================================================================
-- 4. STORAGE BUCKET CONFIGURATION FOR DIRECT FILE UPLOADS
-- ==============================================================================
INSERT INTO storage.buckets (id, name, public) 
VALUES ('sbc-media', 'sbc-media', true)
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "Public SBC Media Storage Access" ON storage.objects;
DROP POLICY IF EXISTS "Public Media Access" ON storage.objects;
DROP POLICY IF EXISTS "Public SBC Media Storage Read" ON storage.objects;
DROP POLICY IF EXISTS "Public SBC Media Storage Insert" ON storage.objects;
DROP POLICY IF EXISTS "Public SBC Media Storage Update" ON storage.objects;
DROP POLICY IF EXISTS "Public SBC Media Storage Delete" ON storage.objects;

CREATE POLICY "Public SBC Media Storage Access" 
ON storage.objects FOR ALL 
USING (bucket_id = 'sbc-media')
WITH CHECK (bucket_id = 'sbc-media');

-- ==============================================================================
-- 5. SEED INITIAL DATA (SAFE WITH ON CONFLICT / CHECKS)
-- ==============================================================================

-- 5.1 Admin Users Seed
INSERT INTO public.admin_users (id, username, full_name, role, passcode, email, phone, is_active)
VALUES 
    ('00000000-0000-0000-0000-000000000001', 'admin', 'Super Admin (Head Coach)', 'Super Admin', '1234', 'admin@salemboxingclub.com', '+91 98765 43210', true),
    ('00000000-0000-0000-0000-000000000002', 'developer', 'Lead System Developer', 'Developer', 'dev123', 'dev@salemboxingclub.com', '+91 99887 76655', true),
    ('00000000-0000-0000-0000-000000000003', 'coach', 'Coach Samidurai', 'Coach', 'coach123', 'coach@salemboxingclub.com', '+91 94432 10987', true)
ON CONFLICT (username) DO NOTHING;

-- 5.2 Custom Gallery Seed
INSERT INTO public.gallery (id, title, image_url, category, caption, is_featured)
VALUES
    ('10000000-0000-0000-0000-000000000001', 'High-Intensity Sparring Session', 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=1000&q=80', 'Sparring', 'Senior boxers going 6 rounds under match-tempo conditioning.', true),
    ('10000000-0000-0000-0000-000000000002', 'Olympic Regulation Boxing Ring', 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=1000&q=80', 'Facilities', 'Standard 20ft competition ring equipped with premium canvas and corner pads.', true),
    ('10000000-0000-0000-0000-000000000003', 'Speed Bag & Reflex Mastery', 'https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?w=1000&q=80', 'Training', 'Hand-eye coordination and punch rhythm drills with Title boxing speedbags.', true),
    ('10000000-0000-0000-0000-000000000004', 'State Championship Gold Celebration', 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1000&q=80', 'Championships', 'Salem Boxing Club athletes celebrating clean podium sweep at South Zone meet.', true),
    ('10000000-0000-0000-0000-000000000005', 'Heavy Bag Conditioning Line', 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1000&q=80', 'Training', 'Power combination circuits on 150lb Fairtex tear-drop leather heavy bags.', true),
    ('10000000-0000-0000-0000-000000000006', 'Youth Champions Sparring Camp', 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1000&q=80', 'Community', 'Future state medalists honing technical jab defense during junior camp.', true)
ON CONFLICT (id) DO NOTHING;

-- 5.3 Upcoming Tournaments / Matches Seed
INSERT INTO public.matches (id, title, event_name, category, match_date, match_time, venue, brochure_url, image_url, status, description, is_featured)
VALUES
    ('20000000-0000-0000-0000-000000000001', 'Tamil Nadu State Open Championship 2026', 'TN State Amateur Boxing Championship', 'Senior & Junior (52kg - 91kg)', CURRENT_DATE + INTERVAL '14 days', '06:00 PM', 'Indoor Sports Stadium, Salem', 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=1200&q=80', 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=1200&q=80', 'Upcoming', 'Premier state championship tournament featuring elite amateur athletes from all 38 districts.', true),
    ('20000000-0000-0000-0000-000000000002', 'South Zone Inter-Club Boxing Cup', 'South Zone Invitational Trophy', 'Youth & Elite Divisions', CURRENT_DATE + INTERVAL '28 days', '05:30 PM', 'SBC Arena, Salem', 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=1200&q=80', 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=1200&q=80', 'Registrations Open', 'Fast-paced invitational championship with electronic point scoring and live ringside broadcast.', true)
ON CONFLICT (id) DO NOTHING;

-- 5.4 Announcements Seed
INSERT INTO public.announcements (id, title, message, badge, is_active, link_url)
VALUES
    ('30000000-0000-0000-0000-000000000001', 'Summer Batch 2026 Admissions Open', '🥊 Summer Intensive Boxing & Conditioning Camp registrations are now live! Limited slots for morning & evening batches.', 'Special Notice', true, '#schedule')
ON CONFLICT (id) DO NOTHING;

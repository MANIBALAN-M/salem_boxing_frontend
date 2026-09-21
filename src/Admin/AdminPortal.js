import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import DataService from '../services/dataService';
import { getSupabaseConfig, setSupabaseConfig } from '../supabaseClient';
import {
  Shield, Users, Swords, Trophy, Calendar, Dumbbell, CreditCard, Bell, 
  Search, Plus, Edit2, Trash2, MessageSquare, 
  PhoneCall, Download, LogOut, ArrowLeft, RefreshCw, Database, Copy, Check, UserCheck, FileText,
  UploadCloud, Camera, UserPlus, Crown, Wrench
} from 'lucide-react';

// Reusable Image File Upload Component with preview & fallback
const ImageUploadField = ({ label, value, onChange, folder = 'uploads', hint = 'PNG, JPG, WEBP up to 5MB' }) => {
  const [uploading, setUploading] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 8 * 1024 * 1024) {
      alert('File size exceeds 8MB limit. Please choose a smaller image.');
      return;
    }

    setUploading(true);
    try {
      const res = await DataService.uploadImage(file, folder);
      if (res && res.success) {
        onChange(res.url);
      } else {
        alert(res?.error || 'Failed to process image.');
      }
    } catch (err) {
      console.error(err);
      alert('Image upload failed.');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleRemove = () => {
    onChange('');
  };

  return (
    <div className="form-group" style={{ marginBottom: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
        <label className="form-label" style={{ marginBottom: 0 }}>{label}</label>
        <button
          type="button"
          onClick={() => setShowUrlInput(!showUrlInput)}
          style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '0.75rem', cursor: 'pointer', textDecoration: 'underline' }}
        >
          {showUrlInput ? 'Switch to File Upload' : 'Or paste URL directly'}
        </button>
      </div>

      {showUrlInput ? (
        <input
          type="text"
          className="form-control"
          placeholder="Paste image URL (e.g. https://... or local path)"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            style={{ display: 'none' }}
          />

          {value ? (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              padding: '12px',
              background: '#0D0F16',
              border: '1px solid var(--border-light)',
              borderRadius: 'var(--radius-sm)'
            }}>
              <div style={{ width: '80px', height: '80px', borderRadius: '6px', overflow: 'hidden', background: '#000', flexShrink: 0, border: '1px solid #222' }}>
                <img
                  src={value}
                  alt="Preview"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => { e.target.src = `${process.env.PUBLIC_URL}/SBC logo.png`; }}
                />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: '0.85rem', color: '#10B981', fontWeight: '600', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Check size={14} /> Image Selected
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', wordBreak: 'break-all', maxHeight: '36px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {value.startsWith('data:') ? 'Embedded Image (Saved in database)' : value}
                </div>
                <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="btn-secondary"
                    style={{ padding: '4px 10px', fontSize: '0.75rem' }}
                    disabled={uploading}
                  >
                    Change Image
                  </button>
                  <button
                    type="button"
                    onClick={handleRemove}
                    style={{ background: 'rgba(255, 0, 60, 0.1)', color: 'var(--primary)', border: '1px solid rgba(255, 0, 60, 0.3)', borderRadius: '4px', padding: '4px 10px', fontSize: '0.75rem', cursor: 'pointer' }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div
              onClick={() => fileInputRef.current?.click()}
              style={{
                border: '2px dashed var(--border-light)',
                borderRadius: 'var(--radius-sm)',
                padding: '24px 16px',
                textAlign: 'center',
                cursor: 'pointer',
                background: 'rgba(255, 255, 255, 0.02)',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--primary)'; e.currentTarget.style.background = 'rgba(255, 0, 60, 0.05)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-light)'; e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)'; }}
            >
              <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'rgba(255, 0, 60, 0.12)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px auto' }}>
                <UploadCloud size={20} />
              </div>
              <div style={{ fontSize: '0.9rem', color: '#FFF', fontWeight: '600', marginBottom: '4px' }}>
                {uploading ? 'Processing Image File...' : 'Click to Upload Image File'}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                {hint}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const AdminPortal = () => {
  // Authentication State with Role Tracking
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('sbc_admin_auth') === 'true';
  });
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const stored = sessionStorage.getItem('sbc_admin_user');
      return stored ? JSON.parse(stored) : { role: 'Super Admin', full_name: 'Super Admin' };
    } catch (e) {
      return { role: 'Super Admin', full_name: 'Super Admin' };
    }
  });

  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState('');

  // Active Tab
  const [activeTab, setActiveTab] = useState('overview');

  // Collections Data
  const [queries, setQueries] = useState([]);
  const [matches, setMatches] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [plans, setPlans] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [adminUsers, setAdminUsers] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(false);

  // Search & Filter States
  const [leadFilter, setLeadFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [galleryCategoryFilter, setGalleryCategoryFilter] = useState('All');

  // Modal State for Add / Edit
  const [modalType, setModalType] = useState(null);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({});

  // Supabase Config State
  const [supabaseUrl, setSupabaseUrlState] = useState('');
  const [supabaseKey, setSupabaseKeyState] = useState('');
  const [connectionStatus, setConnectionStatus] = useState(null);
  const [copiedSql, setCopiedSql] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Active Role
  const currentRole = currentUser?.role || 'Super Admin';

  // Role Access Checker
  // Developer: All pages (including Supabase Config)
  // Super Admin: All pages EXCEPT Supabase Config
  // Coach: Matches, Achievements, Gallery, Programs, Schedules, Announcements, Leads (Inquiries) - Denied: Plans, Trainers, User Management, Supabase Config
  const canAccessTab = (tabKey) => {
    if (currentRole === 'Developer') return true;
    if (currentRole === 'Super Admin') return tabKey !== 'supabase';
    if (currentRole === 'Coach') {
      return ['overview', 'matches', 'achievements', 'gallery', 'programs', 'schedules', 'announcements', 'leads'].includes(tabKey);
    }
    return false;
  };

  // Load all data
  const loadAllData = async () => {
    setLoading(true);
    try {
      const [q, m, a, p, s, pl, t, ann, u, g] = await Promise.all([
        DataService.getAll('queries'),
        DataService.getAll('matches'),
        DataService.getAll('achievements'),
        DataService.getAll('programs'),
        DataService.getAll('schedules'),
        DataService.getAll('plans'),
        DataService.getAll('trainers'),
        DataService.getAll('announcements'),
        DataService.getAll('admin_users'),
        DataService.getAll('gallery')
      ]);
      setQueries(q || []);
      setMatches(m || []);
      setAchievements(a || []);
      setPrograms(p || []);
      setSchedules(s || []);
      setPlans(pl || []);
      setTrainers(t || []);
      setAnnouncements(ann || []);
      setAdminUsers(u || []);
      setGallery(g || []);
    } catch (err) {
      console.error('Error loading admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadAllData();
      const cfg = getSupabaseConfig();
      setSupabaseUrlState(cfg.supabaseUrl || '');
      setSupabaseKeyState(cfg.supabaseKey || '');
    }
  }, [isAuthenticated]);

  // Auth Handler
  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthError('');
    const inputPass = passcode.trim();
    const inputUser = loginIdentifier.trim().toLowerCase();

    // Check against live admin_users table
    try {
      const users = await DataService.getAll('admin_users');
      const matched = users.find(u => 
        u.is_active !== false && (
          (inputUser && (u.username.toLowerCase() === inputUser || (u.email && u.email.toLowerCase() === inputUser)) && u.passcode === inputPass) ||
          (!inputUser && u.passcode === inputPass)
        )
      );

      if (matched) {
        setIsAuthenticated(true);
        setCurrentUser(matched);
        sessionStorage.setItem('sbc_admin_auth', 'true');
        sessionStorage.setItem('sbc_admin_user', JSON.stringify(matched));
        return;
      }
    } catch (err) {
      console.warn('Live user check error:', err);
    }

    // Direct role bypass for standard default credentials
    if (inputPass === 'dev123' || inputPass === 'developer') {
      const devUser = { username: 'developer', full_name: 'Lead Developer', role: 'Developer' };
      setIsAuthenticated(true);
      setCurrentUser(devUser);
      sessionStorage.setItem('sbc_admin_auth', 'true');
      sessionStorage.setItem('sbc_admin_user', JSON.stringify(devUser));
    } else if (inputPass === '1234' || inputPass === 'admin123' || inputPass.toLowerCase() === 'samidurai') {
      const adminUser = { username: 'samidurai', full_name: 'Coach Samidurai (Founder)', role: 'Super Admin' };
      setIsAuthenticated(true);
      setCurrentUser(adminUser);
      sessionStorage.setItem('sbc_admin_auth', 'true');
      sessionStorage.setItem('sbc_admin_user', JSON.stringify(adminUser));
    } else if (inputPass === 'coach123' || inputPass === 'coach') {
      const coachUser = { username: 'coach', full_name: 'Assistant Boxing Coach', role: 'Coach' };
      setIsAuthenticated(true);
      setCurrentUser(coachUser);
      sessionStorage.setItem('sbc_admin_auth', 'true');
      sessionStorage.setItem('sbc_admin_user', JSON.stringify(coachUser));
    } else {
      setAuthError('Invalid username or passcode. (Default passcodes: Super Admin: "1234", Developer: "dev123", Coach: "coach123")');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    sessionStorage.removeItem('sbc_admin_auth');
    sessionStorage.removeItem('sbc_admin_user');
  };

  // Quick switch role for testing
  const handleQuickLoginRole = (role, defaultPass) => {
    setPasscode(defaultPass);
    setLoginIdentifier(role.toLowerCase().replace(' ', ''));
  };

  // Test Supabase Connection
  const handleTestConnection = async () => {
    setConnectionStatus({ testing: true, message: 'Testing connection to Supabase...' });
    const res = await DataService.testConnection();
    setConnectionStatus({ testing: false, success: res.success, message: res.message });
  };

  const handleSaveSupabaseConfig = (e) => {
    e.preventDefault();
    setSupabaseConfig(supabaseUrl, supabaseKey);
    handleTestConnection();
    loadAllData();
  };

  // Lead Actions
  const handleUpdateLeadStatus = async (id, status) => {
    await DataService.update('queries', id, { status });
    loadAllData();
  };

  const handleDeleteLead = async (id) => {
    if (window.confirm('Are you sure you want to delete this inquiry?')) {
      await DataService.delete('queries', id);
      loadAllData();
    }
  };

  const handleExportLeadsCSV = () => {
    if (queries.length === 0) return alert('No leads to export.');
    const headers = ['ID', 'Date', 'Name', 'Phone', 'Email', 'Experience', 'Program', 'Status', 'Message', 'Notes'];
    const rows = queries.map(q => [
      q.id,
      new Date(q.created_at || Date.now()).toLocaleDateString(),
      `"${q.name || ''}"`,
      `"${q.phone || ''}"`,
      `"${q.email || ''}"`,
      `"${q.experience || ''}"`,
      `"${q.interest_program || ''}"`,
      `"${q.status || ''}"`,
      `"${(q.message || '').replace(/"/g, '""')}"`,
      `"${(q.notes || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `salem_boxing_leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Generic Open Modal for Create / Edit
  const openModal = (type, item = null) => {
    setModalType(type);
    setEditingItem(item);
    if (item) {
      const normalized = { ...item };
      if (type === 'achievement') {
        const photo = item.athlete_photo || item.image_url || '';
        normalized.athlete_photo = photo;
        normalized.image_url = photo;
      } else if (type === 'match') {
        const flyer = item.brochure_url || item.image_url || item.event_image || '';
        normalized.brochure_url = flyer;
        normalized.image_url = flyer;
      } else if (type === 'trainer') {
        const coachImg = item.photo_url || item.image_url || '';
        normalized.photo_url = coachImg;
        normalized.image_url = coachImg;
      } else if (type === 'gallery') {
        normalized.image_url = item.image_url || '';
      }
      setFormData(normalized);
    } else {
      if (type === 'match') {
        setFormData({
          title: '',
          event_name: '',
          category: 'Senior & Junior Divisions',
          match_date: new Date().toISOString().slice(0, 10),
          match_time: '06:00 PM',
          venue: 'Indoor Sports Stadium, Salem',
          brochure_url: '',
          image_url: '',
          status: 'Upcoming',
          description: '',
          registration_link: ''
        });
      } else if (type === 'achievement') {
        setFormData({
          title: '',
          athlete_name: '',
          athlete_photo: '',
          image_url: '',
          category: 'Senior Men Welterweight (69kg)',
          medal_type: 'Gold',
          year: new Date().getFullYear().toString(),
          event_name: 'State Boxing Championship',
          description: ''
        });
      } else if (type === 'gallery') {
        setFormData({
          title: '',
          image_url: '',
          category: 'Training',
          caption: '',
          is_featured: true
        });
      } else if (type === 'user') {
        setFormData({
          full_name: '',
          username: '',
          role: 'Coach',
          passcode: '',
          email: '',
          phone: '',
          is_active: true
        });
      } else if (type === 'program') {
        setFormData({
          title: '',
          tagline: '',
          description: '',
          level: 'All Levels',
          duration: '60 Mins',
          intensity: 'High Intensity',
          benefits: 'Ring Strategy, Sparring Drills, Footwork Mastery'
        });
      } else if (type === 'schedule') {
        setFormData({
          day_of_week: 'Monday',
          time_slot: '05:30 AM - 07:00 AM',
          period: 'Morning',
          program_title: 'Pro Combat Boxing',
          trainer_name: 'Mr. Samidurai',
          room: 'Main Ring A'
        });
      } else if (type === 'plan') {
        setFormData({
          name: '',
          price: 2000,
          duration: '1 Month',
          description: '',
          features: 'Full gym access, Heavy bag training, Sparring sessions',
          badge: '',
          is_popular: false
        });
      } else if (type === 'trainer') {
        setFormData({
          name: '',
          role: 'Boxing Coach',
          specialty: 'Fight Strategy & Pad Work',
          experience_years: '5+ Years',
          fight_record: 'Amateur Veteran',
          bio: '',
          photo_url: '',
          image_url: ''
        });
      } else if (type === 'announcement') {
        setFormData({
          title: '',
          message: '',
          badge: 'Alert',
          is_active: true,
          link_url: '/#join'
        });
      }
    }
  };

  const closeModal = () => {
    setModalType(null);
    setEditingItem(null);
    setFormData({});
  };

  // Generic Save for Items
  const handleSaveItem = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      let payload = { ...formData };

      if (modalType === 'program' && typeof payload.benefits === 'string') {
        payload.benefits = payload.benefits.split(',').map(s => s.trim()).filter(Boolean);
      }
      if (modalType === 'plan' && typeof payload.features === 'string') {
        payload.features = payload.features.split(',').map(s => s.trim()).filter(Boolean);
      }
      if (modalType === 'achievement') {
        const photo = payload.athlete_photo || payload.image_url || '';
        payload.athlete_photo = photo;
        payload.image_url = photo;
      }
      if (modalType === 'match') {
        const flyer = payload.brochure_url || payload.image_url || '';
        payload.brochure_url = flyer;
        payload.image_url = flyer;
      }
      if (modalType === 'trainer') {
        const coachImg = payload.photo_url || payload.image_url || '';
        payload.photo_url = coachImg;
        payload.image_url = coachImg;
      }

      const tableMap = {
        match: 'matches',
        achievement: 'achievements',
        gallery: 'gallery',
        user: 'admin_users',
        program: 'programs',
        schedule: 'schedules',
        plan: 'plans',
        trainer: 'trainers',
        announcement: 'announcements'
      };

      const table = tableMap[modalType];

      if (editingItem) {
        await DataService.update(table, editingItem.id, payload);
      } else {
        await DataService.create(table, payload);
      }

      closeModal();
      await loadAllData();
    } catch (err) {
      console.error('Error saving item:', err);
      alert('Error saving record: ' + (err.message || 'Check database connection'));
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteItem = async (table, id) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      await DataService.delete(table, id);
      loadAllData();
    }
  };

  const handleCopySql = () => {
    const sqlText = `-- SALEM BOXING CLUB - SUPABASE DATABASE MASTER SCHEMA\n-- Run this in your Supabase SQL Editor\n\n` +
      `CREATE EXTENSION IF NOT EXISTS "pgcrypto";\n\n` +
      `CREATE TABLE IF NOT EXISTS public.queries (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), created_at TIMESTAMPTZ DEFAULT now(), name TEXT NOT NULL, phone TEXT NOT NULL, email TEXT, experience TEXT, interest_program TEXT, message TEXT, status TEXT DEFAULT 'New', notes TEXT);\n` +
      `CREATE TABLE IF NOT EXISTS public.matches (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), created_at TIMESTAMPTZ DEFAULT now(), title TEXT NOT NULL, event_name TEXT, category TEXT, match_date DATE, match_time TEXT, venue TEXT, brochure_url TEXT, image_url TEXT, status TEXT DEFAULT 'Upcoming', description TEXT, registration_link TEXT, is_featured BOOLEAN DEFAULT true);\n` +
      `CREATE TABLE IF NOT EXISTS public.achievements (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), created_at TIMESTAMPTZ DEFAULT now(), title TEXT NOT NULL, athlete_name TEXT, athlete_photo TEXT, image_url TEXT, category TEXT, medal_type TEXT, year TEXT, event_name TEXT, description TEXT, is_highlight BOOLEAN DEFAULT true);\n` +
      `CREATE TABLE IF NOT EXISTS public.programs (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), created_at TIMESTAMPTZ DEFAULT now(), title TEXT NOT NULL, tagline TEXT, description TEXT NOT NULL, level TEXT, duration TEXT, intensity TEXT, benefits TEXT[], image_url TEXT, display_order INT DEFAULT 0);\n` +
      `CREATE TABLE IF NOT EXISTS public.schedules (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), created_at TIMESTAMPTZ DEFAULT now(), day_of_week TEXT NOT NULL, time_slot TEXT NOT NULL, period TEXT, program_title TEXT NOT NULL, trainer_name TEXT NOT NULL, room TEXT, max_capacity INT DEFAULT 15);\n` +
      `CREATE TABLE IF NOT EXISTS public.trainers (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), created_at TIMESTAMPTZ DEFAULT now(), name TEXT NOT NULL, role TEXT NOT NULL, specialty TEXT, experience_years TEXT, fight_record TEXT, bio TEXT, photo_url TEXT, image_url TEXT, social_handle TEXT);\n` +
      `CREATE TABLE IF NOT EXISTS public.plans (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), created_at TIMESTAMPTZ DEFAULT now(), name TEXT NOT NULL, price INT NOT NULL, duration TEXT NOT NULL, description TEXT, features TEXT[], is_popular BOOLEAN DEFAULT false, badge TEXT);\n` +
      `CREATE TABLE IF NOT EXISTS public.announcements (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), created_at TIMESTAMPTZ DEFAULT now(), title TEXT NOT NULL, message TEXT NOT NULL, badge TEXT, is_active BOOLEAN DEFAULT true, link_url TEXT);\n` +
      `CREATE TABLE IF NOT EXISTS public.admin_users (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), created_at TIMESTAMPTZ DEFAULT now(), username TEXT NOT NULL UNIQUE, full_name TEXT NOT NULL, role TEXT NOT NULL, passcode TEXT NOT NULL, email TEXT, phone TEXT, is_active BOOLEAN DEFAULT true);\n` +
      `CREATE TABLE IF NOT EXISTS public.gallery (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), created_at TIMESTAMPTZ DEFAULT now(), title TEXT NOT NULL, image_url TEXT NOT NULL, category TEXT DEFAULT 'Training', caption TEXT, is_featured BOOLEAN DEFAULT true);\n\n` +
      `-- Automatic Column Migrations\n` +
      `ALTER TABLE public.matches ADD COLUMN IF NOT EXISTS brochure_url TEXT;\n` +
      `ALTER TABLE public.matches ADD COLUMN IF NOT EXISTS image_url TEXT;\n` +
      `ALTER TABLE public.achievements ADD COLUMN IF NOT EXISTS athlete_name TEXT;\n` +
      `ALTER TABLE public.achievements ADD COLUMN IF NOT EXISTS athlete_photo TEXT;\n` +
      `ALTER TABLE public.achievements ADD COLUMN IF NOT EXISTS image_url TEXT;\n` +
      `ALTER TABLE public.trainers ADD COLUMN IF NOT EXISTS photo_url TEXT;\n` +
      `ALTER TABLE public.trainers ADD COLUMN IF NOT EXISTS image_url TEXT;\n\n` +
      `-- Row Level Security & Policies\n` +
      `ALTER TABLE public.queries ENABLE ROW LEVEL SECURITY;\n` +
      `ALTER TABLE public.matches ENABLE ROW LEVEL SECURITY;\n` +
      `ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;\n` +
      `ALTER TABLE public.programs ENABLE ROW LEVEL SECURITY;\n` +
      `ALTER TABLE public.schedules ENABLE ROW LEVEL SECURITY;\n` +
      `ALTER TABLE public.trainers ENABLE ROW LEVEL SECURITY;\n` +
      `ALTER TABLE public.plans ENABLE ROW LEVEL SECURITY;\n` +
      `ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;\n` +
      `ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;\n` +
      `ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;\n\n` +
      `DROP POLICY IF EXISTS "Public full access queries" ON public.queries; CREATE POLICY "Public full access queries" ON public.queries FOR ALL USING (true) WITH CHECK (true);\n` +
      `DROP POLICY IF EXISTS "Public full access matches" ON public.matches; CREATE POLICY "Public full access matches" ON public.matches FOR ALL USING (true) WITH CHECK (true);\n` +
      `DROP POLICY IF EXISTS "Public full access achievements" ON public.achievements; CREATE POLICY "Public full access achievements" ON public.achievements FOR ALL USING (true) WITH CHECK (true);\n` +
      `DROP POLICY IF EXISTS "Public full access programs" ON public.programs; CREATE POLICY "Public full access programs" ON public.programs FOR ALL USING (true) WITH CHECK (true);\n` +
      `DROP POLICY IF EXISTS "Public full access schedules" ON public.schedules; CREATE POLICY "Public full access schedules" ON public.schedules FOR ALL USING (true) WITH CHECK (true);\n` +
      `DROP POLICY IF EXISTS "Public full access trainers" ON public.trainers; CREATE POLICY "Public full access trainers" ON public.trainers FOR ALL USING (true) WITH CHECK (true);\n` +
      `DROP POLICY IF EXISTS "Public full access plans" ON public.plans; CREATE POLICY "Public full access plans" ON public.plans FOR ALL USING (true) WITH CHECK (true);\n` +
      `DROP POLICY IF EXISTS "Public full access announcements" ON public.announcements; CREATE POLICY "Public full access announcements" ON public.announcements FOR ALL USING (true) WITH CHECK (true);\n` +
      `DROP POLICY IF EXISTS "Public full access admin_users" ON public.admin_users; CREATE POLICY "Public full access admin_users" ON public.admin_users FOR ALL USING (true) WITH CHECK (true);\n` +
      `DROP POLICY IF EXISTS "Public full access gallery" ON public.gallery; CREATE POLICY "Public full access gallery" ON public.gallery FOR ALL USING (true) WITH CHECK (true);\n\n` +
      `-- Supabase Media Storage Bucket\n` +
      `INSERT INTO storage.buckets (id, name, public) VALUES ('sbc-media', 'sbc-media', true) ON CONFLICT (id) DO NOTHING;\n` +
      `DROP POLICY IF EXISTS "Public SBC Media Storage Access" ON storage.objects;\n` +
      `CREATE POLICY "Public SBC Media Storage Access" ON storage.objects FOR ALL USING (bucket_id = 'sbc-media') WITH CHECK (bucket_id = 'sbc-media');`;

    navigator.clipboard.writeText(sqlText);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2500);
  };

  // LOGIN SCREEN
  if (!isAuthenticated) {
    return (
      <div className="admin-wrapper" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: 'radial-gradient(circle at 50% 50%, #151822 0%, #08090C 100%)', padding: '20px' }}>
        <div style={{ maxWidth: '480px', width: '100%', padding: '36px', background: 'rgba(18, 20, 27, 0.95)', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-md)', boxShadow: '0 20px 60px rgba(0,0,0,0.8)' }}>
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <img 
              src={`${process.env.PUBLIC_URL}/SBC logo.png`} 
              alt="Salem Boxing Club" 
              style={{ width: '68px', height: '68px', objectFit: 'contain', margin: '0 auto 12px auto', display: 'block', filter: 'drop-shadow(0 0 12px rgba(255,0,60,0.4))' }} 
            />
            <h2 style={{ fontSize: '1.45rem', color: '#FFF', fontFamily: 'Orbitron', marginBottom: '6px' }}>
              SALEM BOXING CLUB
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.82rem' }}>
              Role-Based Admin & Staff Portal
            </p>
          </div>

          {/* Quick Role Select Buttons */}
          <div style={{ marginBottom: '20px' }}>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '0.5px' }}>
              Quick Fill Role Credentials:
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
              <button 
                type="button" 
                onClick={() => handleQuickLoginRole('Super Admin', '1234')}
                className="btn-secondary" 
                style={{ padding: '8px 4px', fontSize: '0.72rem', flexDirection: 'column', gap: '2px', borderColor: 'rgba(255, 184, 0, 0.4)', color: 'var(--gold)' }}
              >
                <Crown size={14} /> Super Admin
              </button>
              <button 
                type="button" 
                onClick={() => handleQuickLoginRole('Developer', 'dev123')}
                className="btn-secondary" 
                style={{ padding: '8px 4px', fontSize: '0.72rem', flexDirection: 'column', gap: '2px', borderColor: 'rgba(96, 165, 250, 0.4)', color: '#60A5FA' }}
              >
                <Wrench size={14} /> Developer
              </button>
              <button 
                type="button" 
                onClick={() => handleQuickLoginRole('Coach', 'coach123')}
                className="btn-secondary" 
                style={{ padding: '8px 4px', fontSize: '0.72rem', flexDirection: 'column', gap: '2px', borderColor: 'rgba(255, 0, 60, 0.4)', color: 'var(--primary)' }}
              >
                <Shield size={14} /> Coach
              </button>
            </div>
          </div>

          {authError && (
            <div style={{ background: 'rgba(255, 0, 60, 0.2)', border: '1px solid var(--primary)', padding: '10px 14px', borderRadius: 'var(--radius-sm)', color: '#FFF', fontSize: '0.82rem', marginBottom: '20px' }}>
              {authError}
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div className="form-group" style={{ marginBottom: '14px' }}>
              <label className="form-label">Username / Staff ID (Optional)</label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g. samidurai, developer, coach"
                value={loginIdentifier}
                onChange={(e) => setLoginIdentifier(e.target.value)}
              />
            </div>

            <div className="form-group" style={{ marginBottom: '18px' }}>
              <label className="form-label">Passcode / Password *</label>
              <input
                type="password"
                required
                className="form-control"
                placeholder="Enter passcode (e.g. 1234, dev123, coach123)"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                autoFocus
              />
            </div>

            <button type="submit" className="btn-primary" style={{ width: '100%', padding: '14px', marginTop: '6px' }}>
              AUTHENTICATE & ENTER
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <Link to="/" style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <ArrowLeft size={14} /> Back to Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const filteredQueries = queries
    .filter(q => leadFilter === 'All' || q.status === leadFilter)
    .filter(q => {
      if (!searchQuery) return true;
      const term = searchQuery.toLowerCase();
      return (
        (q.name && q.name.toLowerCase().includes(term)) ||
        (q.phone && q.phone.includes(term)) ||
        (q.email && q.email.toLowerCase().includes(term)) ||
        (q.interest_program && q.interest_program.toLowerCase().includes(term))
      );
    });

  const filteredGallery = galleryCategoryFilter === 'All'
    ? gallery
    : gallery.filter(g => (g.category || '').toLowerCase() === galleryCategoryFilter.toLowerCase());

  return (
    <div className="admin-wrapper">
      {/* Top Bar */}
      <header className="admin-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Link to="/" style={{ textDecoration: 'none', color: '#FFF', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img 
              src={`${process.env.PUBLIC_URL}/SBC logo.png`} 
              alt="Salem Boxing Club" 
              style={{ width: '36px', height: '36px', objectFit: 'contain' }} 
            />
            <span style={{ fontFamily: 'Orbitron', fontWeight: '900', fontSize: '1.15rem', color: '#FFF' }}>
              SALEM <span style={{ color: 'var(--primary)' }}>BOXING</span>
            </span>
          </Link>

          {/* User Role Badge */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{
              fontSize: '0.75rem',
              fontWeight: '700',
              padding: '4px 10px',
              borderRadius: '20px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              background: currentRole === 'Developer' ? 'rgba(96, 165, 250, 0.15)' : currentRole === 'Super Admin' ? 'rgba(255, 184, 0, 0.15)' : 'rgba(255, 0, 60, 0.15)',
              color: currentRole === 'Developer' ? '#60A5FA' : currentRole === 'Super Admin' ? 'var(--gold)' : 'var(--primary)',
              border: `1px solid ${currentRole === 'Developer' ? 'rgba(96, 165, 250, 0.3)' : currentRole === 'Super Admin' ? 'rgba(255, 184, 0, 0.3)' : 'rgba(255, 0, 60, 0.3)'}`
            }}>
              {currentRole === 'Developer' && <Wrench size={12} />}
              {currentRole === 'Super Admin' && <Crown size={12} />}
              {currentRole === 'Coach' && <Shield size={12} />}
              {currentRole} ({currentUser?.full_name || currentUser?.username || 'Staff'})
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Link to="/" className="btn-secondary" style={{ padding: '8px 14px', fontSize: '0.78rem' }}>
            View Public Site
          </Link>
          <button onClick={loadAllData} className="btn-secondary" style={{ padding: '8px 12px' }} title="Refresh Data">
            <RefreshCw size={14} className={loading ? 'pulse-glow' : ''} />
          </button>
          <button onClick={handleLogout} className="btn-outline-danger" style={{ padding: '8px 14px', fontSize: '0.78rem' }}>
            <LogOut size={14} /> Logout
          </button>
        </div>
      </header>

      {/* Role-Filtered Admin Navigation Tabs */}
      <nav className="admin-nav-tabs">
        {canAccessTab('overview') && (
          <button className={`admin-tab-btn ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>
            <Shield size={16} /> Overview
          </button>
        )}
        {canAccessTab('leads') && (
          <button className={`admin-tab-btn ${activeTab === 'leads' ? 'active' : ''}`} onClick={() => setActiveTab('leads')}>
            <Users size={16} /> Inquiries ({queries.length})
          </button>
        )}
        {canAccessTab('matches') && (
          <button className={`admin-tab-btn ${activeTab === 'matches' ? 'active' : ''}`} onClick={() => setActiveTab('matches')}>
            <Swords size={16} /> Matches ({matches.length})
          </button>
        )}
        {canAccessTab('achievements') && (
          <button className={`admin-tab-btn ${activeTab === 'achievements' ? 'active' : ''}`} onClick={() => setActiveTab('achievements')}>
            <Trophy size={16} /> Achievements ({achievements.length})
          </button>
        )}
        {canAccessTab('gallery') && (
          <button className={`admin-tab-btn ${activeTab === 'gallery' ? 'active' : ''}`} onClick={() => setActiveTab('gallery')}>
            <Camera size={16} /> Custom Gallery ({gallery.length})
          </button>
        )}
        {canAccessTab('programs') && (
          <button className={`admin-tab-btn ${activeTab === 'programs' ? 'active' : ''}`} onClick={() => setActiveTab('programs')}>
            <Dumbbell size={16} /> Programs ({programs.length})
          </button>
        )}
        {canAccessTab('schedules') && (
          <button className={`admin-tab-btn ${activeTab === 'schedules' ? 'active' : ''}`} onClick={() => setActiveTab('schedules')}>
            <Calendar size={16} /> Timetable ({schedules.length})
          </button>
        )}
        {canAccessTab('plans') && (
          <button className={`admin-tab-btn ${activeTab === 'plans' ? 'active' : ''}`} onClick={() => setActiveTab('plans')}>
            <CreditCard size={16} /> Membership Plans ({plans.length})
          </button>
        )}
        {canAccessTab('trainers') && (
          <button className={`admin-tab-btn ${activeTab === 'trainers' ? 'active' : ''}`} onClick={() => setActiveTab('trainers')}>
            <UserCheck size={16} /> Coaches ({trainers.length})
          </button>
        )}
        {canAccessTab('announcements') && (
          <button className={`admin-tab-btn ${activeTab === 'announcements' ? 'active' : ''}`} onClick={() => setActiveTab('announcements')}>
            <Bell size={16} /> Flash Alerts ({announcements.length})
          </button>
        )}
        {canAccessTab('users') && (
          <button className={`admin-tab-btn ${activeTab === 'users' ? 'active' : ''}`} onClick={() => setActiveTab('users')}>
            <UserPlus size={16} /> User Management ({adminUsers.length})
          </button>
        )}
        {canAccessTab('supabase') && (
          <button className={`admin-tab-btn ${activeTab === 'supabase' ? 'active' : ''}`} onClick={() => setActiveTab('supabase')}>
            <Database size={16} /> Supabase Config
          </button>
        )}
      </nav>

      {/* Main Content Area */}
      <main className="admin-content-area">
        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div>
            <div style={{ marginBottom: '24px' }}>
              <h2 style={{ fontSize: '1.75rem', fontFamily: 'Orbitron', color: '#FFF' }}>
                {currentRole.toUpperCase()} <span className="text-gradient">DASHBOARD</span>
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                Logged in as <strong>{currentUser?.full_name || currentUser?.username}</strong> with <strong>{currentRole}</strong> access privileges.
              </p>
            </div>

            <div className="admin-stats-grid">
              <div className="admin-stat-card" style={{ borderLeft: '4px solid var(--primary)' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Trial Inquiries</div>
                <div style={{ fontSize: '2.4rem', fontFamily: 'Orbitron', fontWeight: '900', color: '#FFF', margin: '8px 0' }}>
                  {queries.length}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--primary)' }}>
                  {queries.filter(q => q.status === 'New').length} New Leads
                </div>
              </div>

              <div className="admin-stat-card" style={{ borderLeft: '4px solid var(--gold)' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Tournaments & Bouts</div>
                <div style={{ fontSize: '2.4rem', fontFamily: 'Orbitron', fontWeight: '900', color: '#FFF', margin: '8px 0' }}>
                  {matches.length}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--gold)' }}>
                  {matches.filter(m => m.status === 'Upcoming' || m.status === 'Registrations Open').length} Active Schedules
                </div>
              </div>

              <div className="admin-stat-card" style={{ borderLeft: '4px solid #10B981' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Champions Hall of Fame</div>
                <div style={{ fontSize: '2.4rem', fontFamily: 'Orbitron', fontWeight: '900', color: '#FFF', margin: '8px 0' }}>
                  {achievements.length}
                </div>
                <div style={{ fontSize: '0.8rem', color: '#10B981' }}>
                  Medals with Boxer Photos
                </div>
              </div>

              <div className="admin-stat-card" style={{ borderLeft: '4px solid #F472B6' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Custom Gallery</div>
                <div style={{ fontSize: '2.4rem', fontFamily: 'Orbitron', fontWeight: '900', color: '#FFF', margin: '8px 0' }}>
                  {gallery.length}
                </div>
                <div style={{ fontSize: '0.8rem', color: '#F472B6' }}>
                  Live Photos & Media
                </div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
              <div className="admin-table-wrapper" style={{ padding: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <h3 style={{ fontSize: '1.15rem', color: '#FFF', fontFamily: 'Orbitron' }}>Recent Trial Inquiries</h3>
                  <button onClick={() => setActiveTab('leads')} className="btn-secondary" style={{ padding: '6px 14px', fontSize: '0.75rem' }}>
                    View Inquiries &rarr;
                  </button>
                </div>

                {queries.slice(0, 5).map((q) => (
                  <div key={q.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                    <div>
                      <div style={{ fontWeight: '700', color: '#FFF', fontSize: '0.95rem' }}>{q.name}</div>
                      <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>{q.phone} • {q.interest_program || 'Boxing'}</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span className={`status-tag ${q.status ? q.status.toLowerCase().replace(' ', '') : 'new'}`}>{q.status || 'New'}</span>
                      <a 
                        href={`https://wa.me/${(q.phone || '').replace(/[^0-9]/g, '')}?text=Hi%20${encodeURIComponent(q.name)},%20this%20is%20Coach%20Samidurai%20from%20Salem%20Boxing%20Club.`}
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="btn-secondary" 
                        style={{ padding: '6px 10px', color: '#25D366' }}
                      >
                        <MessageSquare size={14} />
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ background: '#12141C', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-md)', padding: '24px' }}>
                <h3 style={{ fontSize: '1.15rem', color: '#FFF', fontFamily: 'Orbitron', marginBottom: '16px' }}>Quick Actions</h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <button onClick={() => openModal('match')} className="btn-secondary" style={{ justifyContent: 'flex-start' }}>
                    <Swords size={16} color="var(--primary)" /> Add Match Schedule
                  </button>
                  <button onClick={() => openModal('achievement')} className="btn-secondary" style={{ justifyContent: 'flex-start' }}>
                    <Trophy size={16} color="var(--gold)" /> Add Boxer Honor
                  </button>
                  <button onClick={() => openModal('gallery')} className="btn-secondary" style={{ justifyContent: 'flex-start' }}>
                    <Camera size={16} color="#F472B6" /> Upload Gallery Photo
                  </button>
                  {canAccessTab('users') && (
                    <button onClick={() => openModal('user')} className="btn-secondary" style={{ justifyContent: 'flex-start' }}>
                      <UserPlus size={16} color="#34D399" /> Create Admin / Staff User
                    </button>
                  )}
                  {canAccessTab('supabase') && (
                    <button onClick={() => setActiveTab('supabase')} className="btn-secondary" style={{ justifyContent: 'flex-start' }}>
                      <Database size={16} color="#60A5FA" /> Supabase Connection
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: LEADS CRM */}
        {activeTab === 'leads' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <h2 style={{ fontSize: '1.75rem', fontFamily: 'Orbitron', color: '#FFF' }}>
                  LEADS & <span className="text-gradient">INQUIRIES CRM</span>
                </h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                  Track incoming trial requests, follow up with athletes on WhatsApp, and manage statuses.
                </p>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button onClick={handleExportLeadsCSV} className="btn-secondary" style={{ fontSize: '0.85rem' }}>
                  <Download size={14} /> Export CSV
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '16px', marginBottom: '20px', flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: '240px', position: 'relative' }}>
                <Search size={16} style={{ position: 'absolute', left: '14px', top: '16px', color: 'var(--text-muted)' }} />
                <input
                  type="text"
                  className="form-control"
                  style={{ paddingLeft: '40px' }}
                  placeholder="Search by name, phone, program..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div style={{ display: 'flex', gap: '8px', overflowX: 'auto' }}>
                {['All', 'New', 'Contacted', 'Trial Scheduled', 'Enrolled', 'Closed'].map((st) => (
                  <button
                    key={st}
                    className={`filter-btn ${leadFilter === st ? 'active' : ''}`}
                    onClick={() => setLeadFilter(st)}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            <div className="admin-table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Lead Name</th>
                    <th>Phone / WhatsApp</th>
                    <th>Program & Level</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Message</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredQueries.length === 0 ? (
                    <tr>
                      <td colSpan="7" style={{ textAlign: 'center', padding: '30px', color: 'var(--text-muted)' }}>
                        No inquiries found matching current filters.
                      </td>
                    </tr>
                  ) : (
                    filteredQueries.map((q) => (
                      <tr key={q.id}>
                        <td>
                          <strong style={{ color: '#FFF' }}>{q.name}</strong>
                          {q.email && <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{q.email}</div>}
                        </td>
                        <td>
                          <a href={`tel:${q.phone}`} style={{ color: '#FFF', textDecoration: 'none' }}>{q.phone}</a>
                        </td>
                        <td>
                          <div style={{ fontWeight: '600' }}>{q.interest_program || 'Pro Boxing'}</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Level: {q.experience}</div>
                        </td>
                        <td style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                          {new Date(q.created_at || Date.now()).toLocaleDateString()}
                        </td>
                        <td>
                          <select
                            value={q.status || 'New'}
                            onChange={(e) => handleUpdateLeadStatus(q.id, e.target.value)}
                            className="form-control"
                            style={{ padding: '4px 8px', fontSize: '0.8rem', width: 'auto', background: '#0F1118' }}
                          >
                            <option value="New">New</option>
                            <option value="Contacted">Contacted</option>
                            <option value="Trial Scheduled">Trial Scheduled</option>
                            <option value="Enrolled">Enrolled</option>
                            <option value="Closed">Closed</option>
                          </select>
                        </td>
                        <td style={{ maxWidth: '200px', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                          {q.message || '—'}
                        </td>
                        <td>
                          <div style={{ display: 'flex', gap: '8px' }}>
                            <a
                              href={`https://wa.me/${(q.phone || '').replace(/[^0-9]/g, '')}?text=Hi%20${encodeURIComponent(q.name || 'Champion')},%20this%20is%20Coach%20Samidurai%20from%20Salem%20Boxing%20Club.%20We%20received%20your%20trial%20inquiry!`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn-secondary"
                              style={{ padding: '6px 10px', color: '#25D366' }}
                              title="Message on WhatsApp"
                            >
                              <MessageSquare size={14} />
                            </a>
                            <a
                              href={`tel:${q.phone}`}
                              className="btn-secondary"
                              style={{ padding: '6px 10px' }}
                              title="Call"
                            >
                              <PhoneCall size={14} />
                            </a>
                            <button
                              onClick={() => handleDeleteLead(q.id)}
                              className="btn-secondary"
                              style={{ padding: '6px 10px', color: 'var(--primary)' }}
                              title="Delete Lead"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: MATCHES & TOURNAMENTS (WITH BROCHURE) */}
        {activeTab === 'matches' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <h2 style={{ fontSize: '1.75rem', fontFamily: 'Orbitron', color: '#FFF' }}>
                  TOURNAMENT SCHEDULES & <span className="text-gradient">BROCHURES</span>
                </h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                  Add upcoming match schedules, venues, dates, and upload/attach tournament brochures and flyers.
                </p>
              </div>

              <button onClick={() => openModal('match')} className="btn-primary" style={{ fontSize: '0.85rem' }}>
                <Plus size={16} /> Add New Tournament / Match
              </button>
            </div>

            <div className="admin-table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Tournament Title</th>
                    <th>Date & Time</th>
                    <th>Venue</th>
                    <th>Divisions</th>
                    <th>Brochure Flyer</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {matches.map((m) => (
                    <tr key={m.id}>
                      <td>
                        <strong style={{ color: '#FFF' }}>{m.title}</strong>
                        <div style={{ fontSize: '0.75rem', color: 'var(--primary)' }}>{m.event_name}</div>
                      </td>
                      <td>
                        <div>{m.match_date}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{m.match_time}</div>
                      </td>
                      <td style={{ fontSize: '0.85rem' }}>{m.venue}</td>
                      <td><span className="boxing-category-tag" style={{ fontSize: '0.75rem', padding: '2px 8px' }}>{m.category || m.weight_category}</span></td>
                      <td>
                        {(m.brochure_url || m.image_url) ? (
                          <span style={{ color: '#10B981', display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem' }}>
                            <FileText size={14} /> Attached
                          </span>
                        ) : (
                          <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>No flyer</span>
                        )}
                      </td>
                      <td>
                        <span className={`match-badge ${m.status === 'Completed' ? 'badge-completed' : 'badge-upcoming'}`}>
                          {m.status}
                        </span>
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button onClick={() => openModal('match', m)} className="btn-secondary" style={{ padding: '6px 10px' }} title="Edit">
                            <Edit2 size={14} />
                          </button>
                          <button onClick={() => handleDeleteItem('matches', m.id)} className="btn-secondary" style={{ padding: '6px 10px', color: 'var(--primary)' }} title="Delete">
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: ACHIEVEMENTS & BOXER PHOTOS */}
        {activeTab === 'achievements' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <h2 style={{ fontSize: '1.75rem', fontFamily: 'Orbitron', color: '#FFF' }}>
                  ACHIEVEMENTS & <span className="text-gold-gradient">BOXERS HALL OF FAME</span>
                </h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                  Manage medal winners, state champions, and upload athlete portrait photos.
                </p>
              </div>

              <button onClick={() => openModal('achievement')} className="btn-primary" style={{ fontSize: '0.85rem' }}>
                <Plus size={16} /> Add Boxer Achievement
              </button>
            </div>

            <div className="admin-table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Boxer Photo</th>
                    <th>Athlete Name</th>
                    <th>Medal & Honor</th>
                    <th>Event & Year</th>
                    <th>Category</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {achievements.map((a) => (
                    <tr key={a.id}>
                      <td>
                        {(a.athlete_photo || a.image_url) ? (
                          <img src={a.athlete_photo || a.image_url} alt={a.athlete_name} style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--gold)' }} />
                        ) : (
                          <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#222', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>🥊</div>
                        )}
                      </td>
                      <td>
                        <strong style={{ color: '#FFF', fontSize: '1rem' }}>{a.athlete_name}</strong>
                        <div style={{ fontSize: '0.78rem', color: 'var(--gold)' }}>{a.title}</div>
                      </td>
                      <td>
                        <span style={{ fontSize: '1.3rem' }}>
                          {a.medal_type === 'Gold' ? '🥇' : a.medal_type === 'Silver' ? '🥈' : a.medal_type === 'Bronze' ? '🥉' : '🏆'}
                        </span>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{a.medal_type}</div>
                      </td>
                      <td>
                        <div>{a.event_name}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Year: {a.year}</div>
                      </td>
                      <td style={{ fontSize: '0.85rem' }}>{a.category}</td>
                      <td>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button onClick={() => openModal('achievement', a)} className="btn-secondary" style={{ padding: '6px 10px' }} title="Edit">
                            <Edit2 size={14} />
                          </button>
                          <button onClick={() => handleDeleteItem('achievements', a.id)} className="btn-secondary" style={{ padding: '6px 10px', color: 'var(--primary)' }} title="Delete">
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 5: CUSTOM GALLERY MANAGER */}
        {activeTab === 'gallery' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <h2 style={{ fontSize: '1.75rem', fontFamily: 'Orbitron', color: '#FFF' }}>
                  CUSTOM <span className="text-gradient">GALLERY MANAGER</span>
                </h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                  Upload club photos, sparring action, equipment facilities, and championship ceremonies directly to the public website.
                </p>
              </div>

              <button onClick={() => openModal('gallery')} className="btn-primary" style={{ fontSize: '0.85rem' }}>
                <Plus size={16} /> Upload Gallery Photo
              </button>
            </div>

            {/* Filter */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
              {['All', 'Training', 'Sparring', 'Facilities', 'Championships', 'Community'].map((cat) => (
                <button
                  key={cat}
                  className={`filter-btn ${galleryCategoryFilter === cat ? 'active' : ''}`}
                  onClick={() => setGalleryCategoryFilter(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="admin-table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Photo</th>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Caption</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredGallery.length === 0 ? (
                    <tr>
                      <td colSpan="5" style={{ textAlign: 'center', padding: '30px', color: 'var(--text-muted)' }}>
                        No gallery photos found. Click "Upload Gallery Photo" to add one!
                      </td>
                    </tr>
                  ) : (
                    filteredGallery.map((item) => (
                      <tr key={item.id}>
                        <td>
                          <img 
                            src={item.image_url} 
                            alt={item.title} 
                            style={{ width: '64px', height: '48px', objectFit: 'cover', borderRadius: '4px', border: '1px solid #333' }} 
                          />
                        </td>
                        <td>
                          <strong style={{ color: '#FFF' }}>{item.title}</strong>
                        </td>
                        <td>
                          <span style={{ fontSize: '0.75rem', background: 'rgba(255,0,60,0.15)', color: 'var(--primary)', padding: '3px 8px', borderRadius: '4px', border: '1px solid rgba(255,0,60,0.3)' }}>
                            {item.category || 'Training'}
                          </span>
                        </td>
                        <td style={{ maxWidth: '300px', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                          {item.caption || '—'}
                        </td>
                        <td>
                          <div style={{ display: 'flex', gap: '8px' }}>
                            <button onClick={() => openModal('gallery', item)} className="btn-secondary" style={{ padding: '6px 10px' }} title="Edit">
                              <Edit2 size={14} />
                            </button>
                            <button onClick={() => handleDeleteItem('gallery', item.id)} className="btn-secondary" style={{ padding: '6px 10px', color: 'var(--primary)' }} title="Delete">
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 6: PROGRAMS */}
        {activeTab === 'programs' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <div>
                <h2 style={{ fontSize: '1.75rem', fontFamily: 'Orbitron', color: '#FFF' }}>
                  TRAINING <span className="text-gradient">PROGRAMS</span>
                </h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Manage combat disciplines displayed on the public site.</p>
              </div>
              <button onClick={() => openModal('program')} className="btn-primary" style={{ fontSize: '0.85rem' }}>
                <Plus size={16} /> Add Program
              </button>
            </div>

            <div className="admin-table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Program Title</th>
                    <th>Intensity & Duration</th>
                    <th>Level</th>
                    <th>Description</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {programs.map((p) => (
                    <tr key={p.id}>
                      <td>
                        <strong style={{ color: '#FFF' }}>{p.title}</strong>
                        <div style={{ fontSize: '0.75rem', color: 'var(--primary)' }}>{p.tagline}</div>
                      </td>
                      <td>
                        <div>{p.intensity}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>⏱ {p.duration}</div>
                      </td>
                      <td>{p.level}</td>
                      <td style={{ maxWidth: '300px', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                        {p.description}
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button onClick={() => openModal('program', p)} className="btn-secondary" style={{ padding: '6px 10px' }}>
                            <Edit2 size={14} />
                          </button>
                          <button onClick={() => handleDeleteItem('programs', p.id)} className="btn-secondary" style={{ padding: '6px 10px', color: 'var(--primary)' }}>
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 7: TIMETABLE SCHEDULES */}
        {activeTab === 'schedules' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <div>
                <h2 style={{ fontSize: '1.75rem', fontFamily: 'Orbitron', color: '#FFF' }}>
                  TIMETABLE & <span className="text-gradient">BATCH SLOTS</span>
                </h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Configure weekly morning and evening workout slots.</p>
              </div>
              <button onClick={() => openModal('schedule')} className="btn-primary" style={{ fontSize: '0.85rem' }}>
                <Plus size={16} /> Add Batch Slot
              </button>
            </div>

            <div className="admin-table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Day</th>
                    <th>Time Slot</th>
                    <th>Program</th>
                    <th>Coach</th>
                    <th>Ring / Area</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {schedules.map((s) => (
                    <tr key={s.id}>
                      <td><strong style={{ color: 'var(--primary)' }}>{s.day_of_week}</strong></td>
                      <td>{s.time_slot}</td>
                      <td style={{ color: '#FFF', fontWeight: '700' }}>{s.program_title}</td>
                      <td>{s.trainer_name}</td>
                      <td>{s.room || 'Main Ring'}</td>
                      <td>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button onClick={() => openModal('schedule', s)} className="btn-secondary" style={{ padding: '6px 10px' }}>
                            <Edit2 size={14} />
                          </button>
                          <button onClick={() => handleDeleteItem('schedules', s.id)} className="btn-secondary" style={{ padding: '6px 10px', color: 'var(--primary)' }}>
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 8: PLANS (Restricted for Coach) */}
        {activeTab === 'plans' && canAccessTab('plans') && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <div>
                <h2 style={{ fontSize: '1.75rem', fontFamily: 'Orbitron', color: '#FFF' }}>
                  MEMBERSHIP <span className="text-gold-gradient">PLANS & PACKAGES</span>
                </h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Configure pricing tiers, month duration, and perks.</p>
              </div>
              <button onClick={() => openModal('plan')} className="btn-primary" style={{ fontSize: '0.85rem' }}>
                <Plus size={16} /> Add Membership Plan
              </button>
            </div>

            <div className="admin-table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Plan Name</th>
                    <th>Price (INR)</th>
                    <th>Duration</th>
                    <th>Badge</th>
                    <th>Features</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {plans.map((pl) => (
                    <tr key={pl.id}>
                      <td>
                        <strong style={{ color: '#FFF' }}>{pl.name}</strong>
                        {pl.is_popular && <span style={{ marginLeft: '8px', fontSize: '0.7rem', background: 'var(--primary)', color: '#FFF', padding: '2px 6px', borderRadius: '3px' }}>Popular</span>}
                      </td>
                      <td style={{ color: 'var(--gold)', fontWeight: '700', fontSize: '1.1rem' }}>
                        ₹{pl.price}
                      </td>
                      <td>{pl.duration}</td>
                      <td>{pl.badge || '—'}</td>
                      <td style={{ maxWidth: '280px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                        {Array.isArray(pl.features) ? pl.features.join(' • ') : pl.features}
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button onClick={() => openModal('plan', pl)} className="btn-secondary" style={{ padding: '6px 10px' }}>
                            <Edit2 size={14} />
                          </button>
                          <button onClick={() => handleDeleteItem('plans', pl.id)} className="btn-secondary" style={{ padding: '6px 10px', color: 'var(--primary)' }}>
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 9: TRAINERS & COACHES (Restricted for Coach) */}
        {activeTab === 'trainers' && canAccessTab('trainers') && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <div>
                <h2 style={{ fontSize: '1.75rem', fontFamily: 'Orbitron', color: '#FFF' }}>
                  COACHING <span className="text-gradient">STAFF & TRAINERS</span>
                </h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Manage boxing coaching credentials and fight backgrounds.</p>
              </div>
              <button onClick={() => openModal('trainer')} className="btn-primary" style={{ fontSize: '0.85rem' }}>
                <Plus size={16} /> Add Coach Profile
              </button>
            </div>

            <div className="admin-table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Photo</th>
                    <th>Coach Name</th>
                    <th>Role</th>
                    <th>Specialty</th>
                    <th>Experience</th>
                    <th>Fight Record</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {trainers.map((t) => (
                    <tr key={t.id}>
                      <td>
                        {(t.photo_url || t.image_url) ? (
                          <img src={t.photo_url || t.image_url} alt={t.name} style={{ width: '42px', height: '42px', borderRadius: '50%', objectFit: 'cover' }} />
                        ) : (
                          <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: '#222', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>🥊</div>
                        )}
                      </td>
                      <td><strong style={{ color: '#FFF' }}>{t.name}</strong></td>
                      <td><span style={{ color: 'var(--primary)' }}>{t.role}</span></td>
                      <td>{t.specialty}</td>
                      <td>{t.experience_years}</td>
                      <td style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{t.fight_record || '—'}</td>
                      <td>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button onClick={() => openModal('trainer', t)} className="btn-secondary" style={{ padding: '6px 10px' }}>
                            <Edit2 size={14} />
                          </button>
                          <button onClick={() => handleDeleteItem('trainers', t.id)} className="btn-secondary" style={{ padding: '6px 10px', color: 'var(--primary)' }}>
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 10: FLASH ANNOUNCEMENTS */}
        {activeTab === 'announcements' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <div>
                <h2 style={{ fontSize: '1.75rem', fontFamily: 'Orbitron', color: '#FFF' }}>
                  HEADER <span className="text-gradient">FLASH ANNOUNCEMENTS</span>
                </h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Post urgent banners that display directly across the website header.</p>
              </div>
              <button onClick={() => openModal('announcement')} className="btn-primary" style={{ fontSize: '0.85rem' }}>
                <Plus size={16} /> New Alert Banner
              </button>
            </div>

            <div className="admin-table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Status</th>
                    <th>Badge</th>
                    <th>Title & Message</th>
                    <th>Action Link</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {announcements.map((ann) => (
                    <tr key={ann.id}>
                      <td>
                        <span style={{
                          padding: '4px 8px',
                          borderRadius: '4px',
                          fontSize: '0.75rem',
                          background: ann.is_active ? 'rgba(16, 185, 129, 0.15)' : 'rgba(255,255,255,0.05)',
                          color: ann.is_active ? '#10B981' : 'var(--text-muted)'
                        }}>
                          {ann.is_active ? 'Active' : 'Disabled'}
                        </span>
                      </td>
                      <td><span className="announcement-badge">{ann.badge || 'Alert'}</span></td>
                      <td>
                        <strong style={{ color: '#FFF' }}>{ann.title}</strong>
                        <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>{ann.message}</div>
                      </td>
                      <td style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{ann.link_url || '/#join'}</td>
                      <td>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button onClick={() => openModal('announcement', ann)} className="btn-secondary" style={{ padding: '6px 10px' }}>
                            <Edit2 size={14} />
                          </button>
                          <button onClick={() => handleDeleteItem('announcements', ann.id)} className="btn-secondary" style={{ padding: '6px 10px', color: 'var(--primary)' }}>
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 11: USER MANAGEMENT (Restricted to Developer & Super Admin) */}
        {activeTab === 'users' && canAccessTab('users') && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <h2 style={{ fontSize: '1.75rem', fontFamily: 'Orbitron', color: '#FFF' }}>
                  ADMIN & STAFF <span className="text-gradient">USER MANAGEMENT</span>
                </h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                  Create and manage staff accounts with customized access roles (Developer, Super Admin, Coach).
                </p>
              </div>

              <button onClick={() => openModal('user')} className="btn-primary" style={{ fontSize: '0.85rem' }}>
                <UserPlus size={16} /> Create Admin / Staff User
              </button>
            </div>

            {/* Role Permissions Guide */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '24px' }}>
              <div style={{ background: '#12141C', border: '1px solid rgba(96, 165, 250, 0.3)', borderRadius: 'var(--radius-sm)', padding: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#60A5FA', fontWeight: '700', marginBottom: '6px' }}>
                  <Wrench size={16} /> Developer Role
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', lineHeight: '1.5' }}>
                  Full system access across all pages, database schema management, and live Supabase API configurations.
                </p>
              </div>

              <div style={{ background: '#12141C', border: '1px solid rgba(255, 184, 0, 0.3)', borderRadius: 'var(--radius-sm)', padding: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--gold)', fontWeight: '700', marginBottom: '6px' }}>
                  <Crown size={16} /> Super Admin Role
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', lineHeight: '1.5' }}>
                  Full administrative control over all boxing content, leads CRM, gallery, and user creation (excluding Supabase technical config).
                </p>
              </div>

              <div style={{ background: '#12141C', border: '1px solid rgba(255, 0, 60, 0.3)', borderRadius: 'var(--radius-sm)', padding: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary)', fontWeight: '700', marginBottom: '6px' }}>
                  <Shield size={16} /> Coach Role
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', lineHeight: '1.5' }}>
                  Operational access to Matches, Achievements, Timetable, Programs, Gallery, and Inquiries (restricted from pricing plans, coach profiles, and user creation).
                </p>
              </div>
            </div>

            <div className="admin-table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Staff Name & Username</th>
                    <th>Assigned Role</th>
                    <th>Passcode</th>
                    <th>Email & Contact</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {adminUsers.map((u) => (
                    <tr key={u.id}>
                      <td>
                        <strong style={{ color: '#FFF' }}>{u.full_name}</strong>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>@{u.username}</div>
                      </td>
                      <td>
                        <span style={{
                          fontSize: '0.75rem',
                          fontWeight: '700',
                          padding: '3px 8px',
                          borderRadius: '4px',
                          background: u.role === 'Developer' ? 'rgba(96, 165, 250, 0.15)' : u.role === 'Super Admin' ? 'rgba(255, 184, 0, 0.15)' : 'rgba(255, 0, 60, 0.15)',
                          color: u.role === 'Developer' ? '#60A5FA' : u.role === 'Super Admin' ? 'var(--gold)' : 'var(--primary)',
                          border: `1px solid ${u.role === 'Developer' ? 'rgba(96, 165, 250, 0.3)' : u.role === 'Super Admin' ? 'rgba(255, 184, 0, 0.3)' : 'rgba(255, 0, 60, 0.3)'}`
                        }}>
                          {u.role}
                        </span>
                      </td>
                      <td>
                        <code style={{ background: '#000', padding: '3px 6px', borderRadius: '4px', fontSize: '0.8rem', color: '#10B981' }}>
                          {u.passcode ? '••••••••' : 'Default'}
                        </code>
                      </td>
                      <td>
                        <div style={{ fontSize: '0.82rem', color: '#FFF' }}>{u.email || '—'}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{u.phone || '—'}</div>
                      </td>
                      <td>
                        <span style={{
                          padding: '3px 8px',
                          borderRadius: '4px',
                          fontSize: '0.75rem',
                          background: u.is_active !== false ? 'rgba(16, 185, 129, 0.15)' : 'rgba(255, 0, 60, 0.15)',
                          color: u.is_active !== false ? '#10B981' : 'var(--primary)'
                        }}>
                          {u.is_active !== false ? 'Active' : 'Suspended'}
                        </span>
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button onClick={() => openModal('user', u)} className="btn-secondary" style={{ padding: '6px 10px' }} title="Edit User">
                            <Edit2 size={14} />
                          </button>
                          <button onClick={() => handleDeleteItem('admin_users', u.id)} className="btn-secondary" style={{ padding: '6px 10px', color: 'var(--primary)' }} title="Delete User">
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 12: SUPABASE CONFIGURATION (Only for Developer) */}
        {activeTab === 'supabase' && canAccessTab('supabase') && (
          <div>
            <div style={{ marginBottom: '24px' }}>
              <h2 style={{ fontSize: '1.75rem', fontFamily: 'Orbitron', color: '#FFF' }}>
                SUPABASE <span className="text-gradient">DATABASE & STORAGE</span>
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                Developer level database synchronization and API credentials.
              </p>
            </div>

            <div style={{ background: '#12141C', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-md)', padding: '24px', marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  <h3 style={{ fontSize: '1.1rem', color: '#FFF', fontFamily: 'Orbitron' }}>
                    PostgreSQL Database Status
                  </h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                    Verify real-time read and write connectivity to Supabase cloud database.
                  </p>
                </div>
                <button onClick={handleTestConnection} className="btn-secondary" style={{ fontSize: '0.8rem', padding: '8px 16px' }}>
                  <RefreshCw size={14} /> Test Connection
                </button>
              </div>

              {connectionStatus && (
                <div style={{
                  padding: '12px 16px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.85rem',
                  background: connectionStatus.success ? 'rgba(16, 185, 129, 0.15)' : 'rgba(255, 0, 60, 0.15)',
                  border: `1px solid ${connectionStatus.success ? 'rgba(16, 185, 129, 0.4)' : 'rgba(255, 0, 60, 0.4)'}`,
                  color: connectionStatus.success ? '#10B981' : 'var(--primary)'
                }}>
                  {connectionStatus.message}
                </div>
              )}
            </div>

            <div style={{ background: '#12141C', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-md)', padding: '24px', marginBottom: '24px' }}>
              <h3 style={{ fontSize: '1.1rem', color: '#FFF', fontFamily: 'Orbitron', marginBottom: '16px' }}>
                Live Credentials Setup
              </h3>
              
              <form onSubmit={handleSaveSupabaseConfig}>
                <div className="form-group">
                  <label className="form-label">Supabase Project URL</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="https://xyzcompany.supabase.co"
                    value={supabaseUrl}
                    onChange={(e) => setSupabaseUrlState(e.target.value)}
                  />
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Found in Project Settings &rarr; API &rarr; Project URL</span>
                </div>

                <div className="form-group">
                  <label className="form-label">Supabase Anon / Public Key</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="eyJhbGciOi..."
                    value={supabaseKey}
                    onChange={(e) => setSupabaseKeyState(e.target.value)}
                  />
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Found in Project Settings &rarr; API &rarr; Project API Keys &rarr; anon public</span>
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                  <button type="submit" className="btn-primary" style={{ padding: '12px 24px', fontSize: '0.85rem' }}>
                    Save & Connect Database
                  </button>
                  <button 
                    type="button" 
                    onClick={() => {
                      if (window.confirm('Reset local storage to original sample data?')) {
                        DataService.resetDefaults();
                        loadAllData();
                        alert('Sample data restored!');
                      }
                    }} 
                    className="btn-secondary"
                    style={{ fontSize: '0.85rem' }}
                  >
                    Restore Sample Seed Data
                  </button>
                </div>
              </form>
            </div>

            <div style={{ background: '#12141C', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-md)', padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <h3 style={{ fontSize: '1.1rem', color: '#FFF', fontFamily: 'Orbitron' }}>
                  1-Click SQL Database Schema
                </h3>
                <button onClick={handleCopySql} className="btn-secondary" style={{ fontSize: '0.8rem', padding: '6px 14px', color: copiedSql ? '#10B981' : '#FFF' }}>
                  {copiedSql ? <><Check size={14} /> Copied!</> : <><Copy size={14} /> Copy SQL Script</>}
                </button>
              </div>

              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '14px' }}>
                Paste this script into your Supabase Dashboard under <strong>SQL Editor</strong> &rarr; Click <strong>Run</strong> to automatically generate all 10 tables, storage buckets, and RLS policies.
              </p>
            </div>
          </div>
        )}
      </main>

      {/* EDIT / CREATE MODAL */}
      {modalType && (
        <div className="modal-backdrop" onClick={closeModal}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h3 style={{ fontSize: '1.3rem', color: '#FFF', fontFamily: 'Orbitron' }}>
                {editingItem ? 'EDIT' : 'ADD NEW'} {modalType.toUpperCase()}
              </h3>
              <button onClick={closeModal} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', fontSize: '1.5rem', cursor: 'pointer' }}>
                &times;
              </button>
            </div>

            <form onSubmit={handleSaveItem}>
              {/* MATCH / TOURNAMENT FORM FIELDS */}
              {modalType === 'match' && (
                <>
                  <div className="form-group">
                    <label className="form-label">Tournament / Match Title *</label>
                    <input type="text" required className="form-control" value={formData.title || ''} onChange={(e) => setFormData({ ...formData, title: e.target.value })} placeholder="e.g. Tamil Nadu State Boxing Championship 2026" />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div className="form-group">
                      <label className="form-label">Event / League Header</label>
                      <input type="text" className="form-control" value={formData.event_name || ''} onChange={(e) => setFormData({ ...formData, event_name: e.target.value })} placeholder="e.g. State Level Championship" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Weight Categories / Divisions</label>
                      <input type="text" className="form-control" value={formData.category || formData.weight_category || ''} onChange={(e) => setFormData({ ...formData, category: e.target.value, weight_category: e.target.value })} placeholder="e.g. Junior & Senior (52kg - 91kg)" />
                    </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div className="form-group">
                      <label className="form-label">Date *</label>
                      <input type="date" required className="form-control" value={formData.match_date || ''} onChange={(e) => setFormData({ ...formData, match_date: e.target.value })} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Time Slot</label>
                      <input type="text" className="form-control" value={formData.match_time || ''} onChange={(e) => setFormData({ ...formData, match_time: e.target.value })} placeholder="06:00 PM" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Venue Location *</label>
                    <input type="text" required className="form-control" value={formData.venue || ''} onChange={(e) => setFormData({ ...formData, venue: e.target.value })} placeholder="e.g. Indoor Sports Stadium, Salem" />
                  </div>
                  
                  {/* File Upload for Match Brochure / Flyer */}
                  <ImageUploadField
                    label="Tournament Brochure / Fight Flyer Poster"
                    value={formData.brochure_url || formData.image_url || ''}
                    onChange={(url) => setFormData({ ...formData, brochure_url: url, image_url: url })}
                    folder="matches"
                    hint="Upload official tournament brochure flyer (PNG, JPG, WEBP)"
                  />

                  <div className="form-group">
                    <label className="form-label">Tournament Description</label>
                    <textarea rows="3" className="form-control" value={formData.description || ''} onChange={(e) => setFormData({ ...formData, description: e.target.value })} placeholder="Event rules, eligibility, prizes..." style={{ resize: 'none' }}></textarea>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div className="form-group">
                      <label className="form-label">Status</label>
                      <select className="form-control" value={formData.status || 'Upcoming'} onChange={(e) => setFormData({ ...formData, status: e.target.value })} style={{ background: '#0F1118' }}>
                        <option value="Upcoming">Upcoming</option>
                        <option value="Registrations Open">Registrations Open</option>
                        <option value="Completed">Completed</option>
                        <option value="Postponed">Postponed</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Registration Action Link</label>
                      <input type="text" className="form-control" value={formData.registration_link || ''} onChange={(e) => setFormData({ ...formData, registration_link: e.target.value })} placeholder="WhatsApp or Form URL" />
                    </div>
                  </div>
                </>
              )}

              {/* ACHIEVEMENT FORM FIELDS (WITH BOXER PHOTO) */}
              {modalType === 'achievement' && (
                <>
                  <div className="form-group">
                    <label className="form-label">Achievement Honor / Title *</label>
                    <input type="text" required className="form-control" value={formData.title || ''} onChange={(e) => setFormData({ ...formData, title: e.target.value })} placeholder="e.g. Gold Medal - State Level Welterweight" />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div className="form-group">
                      <label className="form-label">Boxer / Athlete Name *</label>
                      <input type="text" required className="form-control" value={formData.athlete_name || ''} onChange={(e) => setFormData({ ...formData, athlete_name: e.target.value })} placeholder="e.g. Kaviarasan S." />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Medal / Honor Type</label>
                      <select className="form-control" value={formData.medal_type || 'Gold'} onChange={(e) => setFormData({ ...formData, medal_type: e.target.value })} style={{ background: '#0F1118' }}>
                        <option value="Gold">Gold Medal (🥇)</option>
                        <option value="Silver">Silver Medal (🥈)</option>
                        <option value="Bronze">Bronze Medal (🥉)</option>
                        <option value="Trophy">Trophy / Club Recognition (🏆)</option>
                      </select>
                    </div>
                  </div>
                  
                  {/* File Upload for Boxer Photo */}
                  <ImageUploadField
                    label="Boxer Portrait Photo / Champion Picture"
                    value={formData.athlete_photo || formData.image_url || ''}
                    onChange={(url) => setFormData({ ...formData, athlete_photo: url, image_url: url })}
                    folder="athletes"
                    hint="Upload portrait photo of the boxer/champion (PNG, JPG, WEBP)"
                  />

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div className="form-group">
                      <label className="form-label">Tournament / Event Name</label>
                      <input type="text" className="form-control" value={formData.event_name || ''} onChange={(e) => setFormData({ ...formData, event_name: e.target.value })} placeholder="e.g. Tamil Nadu State Boxing Cup" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Year</label>
                      <input type="text" className="form-control" value={formData.year || ''} onChange={(e) => setFormData({ ...formData, year: e.target.value })} placeholder="2025" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Category / Weight Class</label>
                    <input type="text" className="form-control" value={formData.category || ''} onChange={(e) => setFormData({ ...formData, category: e.target.value })} placeholder="Senior Men Welterweight (69kg)" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Fight Highlights / Description</label>
                    <textarea rows="3" className="form-control" value={formData.description || ''} onChange={(e) => setFormData({ ...formData, description: e.target.value })} placeholder="Knockout victories, championship performance..." style={{ resize: 'none' }}></textarea>
                  </div>
                </>
              )}

              {/* GALLERY FORM FIELDS */}
              {modalType === 'gallery' && (
                <>
                  <div className="form-group">
                    <label className="form-label">Photo Title / Action Name *</label>
                    <input type="text" required className="form-control" value={formData.title || ''} onChange={(e) => setFormData({ ...formData, title: e.target.value })} placeholder="e.g. Main Sparring Ring Session" />
                  </div>

                  <ImageUploadField
                    label="Gallery Photo Image File *"
                    value={formData.image_url || ''}
                    onChange={(url) => setFormData({ ...formData, image_url: url })}
                    folder="gallery"
                    hint="Upload high resolution action/facility photo"
                  />

                  <div className="form-group">
                    <label className="form-label">Category Section</label>
                    <select className="form-control" value={formData.category || 'Training'} onChange={(e) => setFormData({ ...formData, category: e.target.value })} style={{ background: '#0F1118' }}>
                      <option value="Training">Training (Speed & Pad Drills)</option>
                      <option value="Sparring">Sparring (Ring & Bout Action)</option>
                      <option value="Facilities">Facilities (Ring & Gym Equipment)</option>
                      <option value="Championships">Championships (Medals & Ceremonies)</option>
                      <option value="Community">Community (Athletes & Cadets)</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Caption / Description</label>
                    <textarea rows="3" className="form-control" value={formData.caption || ''} onChange={(e) => setFormData({ ...formData, caption: e.target.value })} placeholder="Short description of the photo moment..." style={{ resize: 'none' }}></textarea>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                    <input type="checkbox" id="is_featured_check" checked={formData.is_featured !== false} onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })} />
                    <label htmlFor="is_featured_check" style={{ color: '#FFF', fontSize: '0.9rem' }}>Featured on public gallery</label>
                  </div>
                </>
              )}

              {/* USER MANAGEMENT FORM FIELDS (Developer & Super Admin) */}
              {modalType === 'user' && (
                <>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div className="form-group">
                      <label className="form-label">Full Name *</label>
                      <input type="text" required className="form-control" value={formData.full_name || ''} onChange={(e) => setFormData({ ...formData, full_name: e.target.value })} placeholder="e.g. Coach Arun Kumar" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Username (Login ID) *</label>
                      <input type="text" required className="form-control" value={formData.username || ''} onChange={(e) => setFormData({ ...formData, username: e.target.value.toLowerCase().replace(/\s+/g, '') })} placeholder="e.g. arun_coach" />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div className="form-group">
                      <label className="form-label">Access Role *</label>
                      <select className="form-control" value={formData.role || 'Coach'} onChange={(e) => setFormData({ ...formData, role: e.target.value })} style={{ background: '#0F1118' }}>
                        <option value="Coach">🥊 Coach (Matches, Achievements, Gallery, Timetable)</option>
                        <option value="Super Admin">👑 Super Admin (All except Supabase config)</option>
                        <option value="Developer">🛠️ Developer (Full System Access)</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Login Passcode / PIN *</label>
                      <input type="text" required className="form-control" value={formData.passcode || ''} onChange={(e) => setFormData({ ...formData, passcode: e.target.value })} placeholder="e.g. coach789 or secretPIN" />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div className="form-group">
                      <label className="form-label">Email Address</label>
                      <input type="email" className="form-control" value={formData.email || ''} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="coach@salemboxingclub.in" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Phone Number</label>
                      <input type="text" className="form-control" value={formData.phone || ''} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} placeholder="+91 9500273164" />
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                    <input type="checkbox" id="is_user_active_check" checked={formData.is_active !== false} onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })} />
                    <label htmlFor="is_user_active_check" style={{ color: '#FFF', fontSize: '0.9rem' }}>Account Active (Allows Login)</label>
                  </div>
                </>
              )}

              {/* TRAINER FORM FIELDS */}
              {modalType === 'trainer' && (
                <>
                  <div className="form-group">
                    <label className="form-label">Coach Name *</label>
                    <input type="text" required className="form-control" value={formData.name || ''} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Coach Name" />
                  </div>

                  <ImageUploadField
                    label="Coach Photo / Avatar"
                    value={formData.photo_url || formData.image_url || ''}
                    onChange={(url) => setFormData({ ...formData, photo_url: url, image_url: url })}
                    folder="trainers"
                    hint="Upload portrait photo of the coach"
                  />
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div className="form-group">
                      <label className="form-label">Role</label>
                      <input type="text" className="form-control" value={formData.role || ''} onChange={(e) => setFormData({ ...formData, role: e.target.value })} placeholder="Head Coach / Specialist" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Experience Years</label>
                      <input type="text" className="form-control" value={formData.experience_years || ''} onChange={(e) => setFormData({ ...formData, experience_years: e.target.value })} placeholder="10+ Years" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Specialty</label>
                    <input type="text" className="form-control" value={formData.specialty || ''} onChange={(e) => setFormData({ ...formData, specialty: e.target.value })} placeholder="Technical Boxing, Sparring" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Fight Record / Honors</label>
                    <input type="text" className="form-control" value={formData.fight_record || ''} onChange={(e) => setFormData({ ...formData, fight_record: e.target.value })} placeholder="State & National Veteran" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Biography</label>
                    <textarea rows="3" className="form-control" value={formData.bio || ''} onChange={(e) => setFormData({ ...formData, bio: e.target.value })} placeholder="Coach background..." style={{ resize: 'none' }}></textarea>
                  </div>
                </>
              )}

              {/* PROGRAM FORM FIELDS */}
              {modalType === 'program' && (
                <>
                  <div className="form-group">
                    <label className="form-label">Program Name *</label>
                    <input type="text" required className="form-control" value={formData.title || ''} onChange={(e) => setFormData({ ...formData, title: e.target.value })} placeholder="e.g. Pro Combat Boxing" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Tagline</label>
                    <input type="text" className="form-control" value={formData.tagline || ''} onChange={(e) => setFormData({ ...formData, tagline: e.target.value })} placeholder="Master the sweet science like a champion" />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div className="form-group">
                      <label className="form-label">Target Level</label>
                      <input type="text" className="form-control" value={formData.level || ''} onChange={(e) => setFormData({ ...formData, level: e.target.value })} placeholder="Beginner to Pro" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Duration</label>
                      <input type="text" className="form-control" value={formData.duration || ''} onChange={(e) => setFormData({ ...formData, duration: e.target.value })} placeholder="60 Mins" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Description</label>
                    <textarea rows="3" className="form-control" value={formData.description || ''} onChange={(e) => setFormData({ ...formData, description: e.target.value })} style={{ resize: 'none' }}></textarea>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Benefits (comma-separated)</label>
                    <input type="text" className="form-control" value={Array.isArray(formData.benefits) ? formData.benefits.join(', ') : formData.benefits || ''} onChange={(e) => setFormData({ ...formData, benefits: e.target.value })} placeholder="Footwork, Sparring, Speed Drills" />
                  </div>
                </>
              )}

              {/* TIMETABLE FORM FIELDS */}
              {modalType === 'schedule' && (
                <>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div className="form-group">
                      <label className="form-label">Day of Week</label>
                      <select className="form-control" value={formData.day_of_week || 'Monday'} onChange={(e) => setFormData({ ...formData, day_of_week: e.target.value })} style={{ background: '#0F1118' }}>
                        {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(d => <option key={d} value={d}>{d}</option>)}
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Time Slot *</label>
                      <input type="text" required className="form-control" value={formData.time_slot || ''} onChange={(e) => setFormData({ ...formData, time_slot: e.target.value })} placeholder="05:30 AM - 07:00 AM" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Program Name *</label>
                    <input type="text" required className="form-control" value={formData.program_title || ''} onChange={(e) => setFormData({ ...formData, program_title: e.target.value })} placeholder="Pro Combat Boxing" />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div className="form-group">
                      <label className="form-label">Trainer Name</label>
                      <input type="text" className="form-control" value={formData.trainer_name || ''} onChange={(e) => setFormData({ ...formData, trainer_name: e.target.value })} placeholder="Mr. Samidurai" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Room / Ring Area</label>
                      <input type="text" className="form-control" value={formData.room || ''} onChange={(e) => setFormData({ ...formData, room: e.target.value })} placeholder="Main Ring A" />
                    </div>
                  </div>
                </>
              )}

              {/* PLAN FORM FIELDS */}
              {modalType === 'plan' && (
                <>
                  <div className="form-group">
                    <label className="form-label">Plan Name *</label>
                    <input type="text" required className="form-control" value={formData.name || ''} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Champion Quarterly" />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div className="form-group">
                      <label className="form-label">Price (in INR) *</label>
                      <input type="number" required className="form-control" value={formData.price || ''} onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })} placeholder="4800" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Duration</label>
                      <input type="text" className="form-control" value={formData.duration || ''} onChange={(e) => setFormData({ ...formData, duration: e.target.value })} placeholder="3 Months" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Badge (Optional)</label>
                    <input type="text" className="form-control" value={formData.badge || ''} onChange={(e) => setFormData({ ...formData, badge: e.target.value })} placeholder="Most Popular" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Description</label>
                    <input type="text" className="form-control" value={formData.description || ''} onChange={(e) => setFormData({ ...formData, description: e.target.value })} placeholder="Plan overview..." />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Included Features (comma-separated)</label>
                    <textarea rows="3" className="form-control" value={Array.isArray(formData.features) ? formData.features.join(', ') : formData.features || ''} onChange={(e) => setFormData({ ...formData, features: e.target.value })} placeholder="Full access, Sparring sessions, Free wraps" style={{ resize: 'none' }}></textarea>
                  </div>
                </>
              )}

              {/* ANNOUNCEMENT FORM FIELDS */}
              {modalType === 'announcement' && (
                <>
                  <div className="form-group">
                    <label className="form-label">Announcement Title *</label>
                    <input type="text" required className="form-control" value={formData.title || ''} onChange={(e) => setFormData({ ...formData, title: e.target.value })} placeholder="e.g. New Batch Admissions Open" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Badge Label</label>
                    <input type="text" className="form-control" value={formData.badge || ''} onChange={(e) => setFormData({ ...formData, badge: e.target.value })} placeholder="Alert / Admissions Open" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Message Content *</label>
                    <textarea rows="3" required className="form-control" value={formData.message || ''} onChange={(e) => setFormData({ ...formData, message: e.target.value })} placeholder="Morning and Evening batches available..." style={{ resize: 'none' }}></textarea>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Action Link URL</label>
                    <input type="text" className="form-control" value={formData.link_url || ''} onChange={(e) => setFormData({ ...formData, link_url: e.target.value })} placeholder="/#join" />
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                    <input type="checkbox" id="is_active_check" checked={formData.is_active !== false} onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })} />
                    <label htmlFor="is_active_check" style={{ color: '#FFF', fontSize: '0.9rem' }}>Active on website header</label>
                  </div>
                </>
              )}

              <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
                <button type="submit" className="btn-primary" disabled={isSaving} style={{ flex: 1, padding: '14px', opacity: isSaving ? 0.7 : 1, cursor: isSaving ? 'wait' : 'pointer' }}>
                  {isSaving ? 'SAVING TO DATABASE...' : 'SAVE RECORD'}
                </button>
                <button type="button" onClick={closeModal} className="btn-secondary" disabled={isSaving}>
                  CANCEL
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPortal;

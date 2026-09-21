import { getSupabase } from '../supabaseClient';
import img1 from '../Images/Salem-Boxing-Club_1.jpg';
import img2 from '../Images/Salem-Boxing-Club_2.jpg';
import img3 from '../Images/Salem-Boxing-Club_3.jpg';
import trainingImg from '../Images/training.png';
import heroImg from '../Images/hero.png';

// Default initial data for seamless offline & local operation
const INITIAL_DATA = {
  queries: [
    {
      id: 'q-1',
      name: 'Vigneshwaran M',
      phone: '+91 98421-44550',
      email: 'vignesh.m@gmail.com',
      experience: 'Beginner',
      interest_program: 'Pro Combat Boxing',
      message: 'Looking for evening batch training for weight loss and basic boxing.',
      status: 'New',
      notes: 'Wants to visit Saturday 6 PM',
      created_at: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString()
    },
    {
      id: 'q-2',
      name: 'Keerthana S',
      phone: '+91 97902-88123',
      email: 'keerthana.sbc@yahoo.com',
      experience: 'Beginner',
      interest_program: 'Women Self Defense & Kick-Fit',
      message: 'Interested in Tuesday/Thursday morning batches.',
      status: 'Contacted',
      notes: 'Sent trial pass on WhatsApp',
      created_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString()
    },
    {
      id: 'q-3',
      name: 'Saravanan R',
      phone: '+91 94432-11002',
      email: 'saravanan.boxer@gmail.com',
      experience: 'Intermediate',
      interest_program: 'Pro Combat Boxing',
      message: 'Have 2 years sparring experience, wanting to compete in district level.',
      status: 'Trial Scheduled',
      notes: 'Scheduled for Friday sparring session',
      created_at: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString()
    }
  ],
  matches: [
    {
      id: 'm-1',
      title: 'Tamil Nadu State Boxing Championship 2026',
      event_name: 'TN State Amateur Boxing Meet',
      category: 'Senior & Junior Divisions (52kg - 91kg)',
      match_date: '2026-10-15',
      match_time: '06:00 PM',
      venue: 'Indoor Sports Stadium, Salem, Tamil Nadu',
      brochure_url: img1,
      status: 'Registrations Open',
      description: 'Official State Level Championship organized under Tamil Nadu Boxing Association. Open to registered district boxers and club athletes.',
      registration_link: 'https://wa.me/919500273164?text=Hi%20Salem%20Boxing%20Club,%20I%20want%20tournament%20details%20for%20State%20Boxing%20Championship',
      is_featured: true
    },
    {
      id: 'm-2',
      title: 'Salem District Open Boxing Title & Belt Championship',
      event_name: 'Kongu Boxing League 2026',
      category: 'Youth & Elite Men (57kg, 63kg, 69kg, 75kg)',
      match_date: '2026-11-02',
      match_time: '05:30 PM',
      venue: 'Nirmal Skywin Arena, Salem',
      brochure_url: img2,
      status: 'Upcoming',
      description: 'District level fight night showcasing top talents from Salem, Erode, Namakkal, and Coimbatore clubs with championship belts.',
      registration_link: 'https://wa.me/919500273164?text=Hi%20Salem%20Boxing%20Club,%20I%20want%20to%20register%20for%20District%20Open%20Bout',
      is_featured: true
    },
    {
      id: 'm-3',
      title: 'South Zone Inter-Club Boxing Series 2026',
      event_name: 'South India Combat Series',
      category: 'All Weight Categories (Men & Women)',
      match_date: '2026-11-20',
      match_time: '07:00 PM',
      venue: 'Nehru Indoor Stadium, Coimbatore',
      brochure_url: img3,
      status: 'Upcoming',
      description: 'Inter-club tournament series focused on youth talent discovery and national boxing ranking qualifiers.',
      registration_link: 'https://wa.me/919500273164?text=Hi%20Salem%20Boxing%20Club,%20I%20am%20interested%20in%20South%20Zone%20Combat%20Series',
      is_featured: false
    }
  ],
  achievements: [
    {
      id: 'a-1',
      title: 'Gold Medal - State Welterweight Champion',
      athlete_name: 'Kaviarasan S.',
      athlete_photo: img1,
      category: 'Senior Men Welterweight (69kg)',
      medal_type: 'Gold',
      year: '2025',
      event_name: 'Tamil Nadu State Boxing Cup',
      description: 'Dominated with 3 consecutive knockout victories to secure the championship gold for Salem Boxing Club.',
      is_highlight: true
    },
    {
      id: 'a-2',
      title: 'Silver Medal - All India Open Championship',
      athlete_name: 'Dinesh Kumar',
      athlete_photo: trainingImg,
      category: 'Youth Lightweight (60kg)',
      medal_type: 'Silver',
      year: '2025',
      event_name: 'National Youth Boxing Meet',
      description: 'Spectacular finalist performance representing Salem District with technical knockout mastery.',
      is_highlight: true
    },
    {
      id: 'a-3',
      title: 'Gold Medal - South Zone Inter-District',
      athlete_name: 'S. Praveen Raj',
      athlete_photo: img2,
      category: 'Middleweight Division (75kg)',
      medal_type: 'Gold',
      year: '2024',
      event_name: 'Kongu Boxing Championship',
      description: 'Flawless tournament victory with technical superiority decision throughout all brackets.',
      is_highlight: true
    },
    {
      id: 'a-4',
      title: 'Best Boxing Academy of the Year',
      athlete_name: 'Salem Boxing Club Team',
      athlete_photo: img3,
      category: 'Academy Trophy',
      medal_type: 'Trophy',
      year: '2024',
      event_name: 'Tamil Nadu Boxing Federation',
      description: 'Honored for exceptional grassroots coaching and champion development under Coach Samidurai.',
      is_highlight: true
    }
  ],
  programs: [
    {
      id: 'p-1',
      title: 'Pro Combat Boxing',
      tagline: 'Master the Sweet Science from Basics to Sparring',
      description: 'Full-spectrum boxing curriculum covering footwork, stance, jab-cross combinations, body hooks, defensive slips, heavy bag drills, and controlled ring sparring.',
      level: 'Beginner to Advanced',
      duration: '75 Mins',
      intensity: 'High Intensity',
      benefits: ['Footwork & Stance Mastery', 'Controlled Ring Sparring', 'Reaction Drills & Pad Work', 'Hand Speed & Punch Power'],
      display_order: 1
    },
    {
      id: 'p-2',
      title: 'MMA & Striking Conditioning',
      tagline: 'High-Octane Explosive Power & Fat Burn',
      description: 'High-intensity interval conditioning combining boxing punches, agility ladders, slam balls, battle ropes, and rotational core stamina.',
      level: 'All Fitness Levels',
      duration: '60 Mins',
      intensity: 'Extreme Intensity',
      benefits: ['Burn 700+ Calories/Session', 'Full Body Athletic Tone', 'Cardio Stamina & Endurance', 'Core & Rotational Power'],
      display_order: 2
    },
    {
      id: 'p-3',
      title: 'Kids & Youth Boxing Academy',
      tagline: 'Discipline, Athleticism & Real Confidence',
      description: 'Safe, structured, and inspiring training designed for youngsters (Ages 7-16) to build confidence, posture, agility, anti-bullying defense, and focus.',
      level: 'Youth (Ages 7 - 16)',
      duration: '50 Mins',
      intensity: 'Moderate',
      benefits: ['Discipline & Mental Focus', 'Anti-Bullying Self Defense', 'Motor Skills & Posture', 'Youth Athletic Foundation'],
      display_order: 3
    },
    {
      id: 'p-4',
      title: 'Women Self Defense & Kick-Fit',
      tagline: 'Empowerment, Safety, Toning & Stamina',
      description: 'High-energy striking, practical self-defense escapes, and kickboxing drills tailored for agility, toning, and real-world personal safety.',
      level: 'All Levels (Women Only)',
      duration: '60 Mins',
      intensity: 'High',
      benefits: ['Practical Street Defense', 'Total Body Toning', 'Stress Relief & Stamina', 'Supportive Community'],
      display_order: 4
    }
  ],
  schedules: [
    { id: 's-1', day_of_week: 'Monday', time_slot: '05:30 AM - 07:00 AM', period: 'Morning', program_title: 'Pro Combat Boxing', trainer_name: 'Mr. Samidurai (Head Coach)', room: 'Main Ring A', max_capacity: 15 },
    { id: 's-2', day_of_week: 'Monday', time_slot: '07:00 AM - 08:30 AM', period: 'Morning', program_title: 'MMA & Striking Conditioning', trainer_name: 'Coach Arun Kumar', room: 'Conditioning Floor', max_capacity: 20 },
    { id: 's-3', day_of_week: 'Monday', time_slot: '05:30 PM - 07:00 PM', period: 'Evening', program_title: 'Kids & Youth Boxing', trainer_name: 'Coach Samidurai', room: 'Ring B', max_capacity: 12 },
    { id: 's-4', day_of_week: 'Monday', time_slot: '07:00 PM - 08:30 PM', period: 'Evening', program_title: 'Pro Combat Boxing & Sparring', trainer_name: 'Mr. Samidurai', room: 'Main Ring A', max_capacity: 15 },
    { id: 's-5', day_of_week: 'Tuesday', time_slot: '05:30 AM - 07:00 AM', period: 'Morning', program_title: 'MMA & Striking Conditioning', trainer_name: 'Coach Arun Kumar', room: 'Conditioning Floor', max_capacity: 20 },
    { id: 's-6', day_of_week: 'Tuesday', time_slot: '06:00 PM - 07:30 PM', period: 'Evening', program_title: 'Women Self Defense & Kick-Fit', trainer_name: 'Coach Arun Kumar', room: 'Studio Floor', max_capacity: 15 },
    { id: 's-7', day_of_week: 'Wednesday', time_slot: '05:30 AM - 07:00 AM', period: 'Morning', program_title: 'Pro Combat Boxing', trainer_name: 'Mr. Samidurai', room: 'Main Ring A', max_capacity: 15 },
    { id: 's-8', day_of_week: 'Wednesday', time_slot: '07:00 PM - 08:30 PM', period: 'Evening', program_title: 'Heavy Bag & Pad Drills', trainer_name: 'Mr. Samidurai', room: 'Bag Area', max_capacity: 20 },
    { id: 's-9', day_of_week: 'Thursday', time_slot: '05:30 AM - 07:00 AM', period: 'Morning', program_title: 'MMA & Striking Conditioning', trainer_name: 'Coach Arun Kumar', room: 'Conditioning Floor', max_capacity: 20 },
    { id: 's-10', day_of_week: 'Friday', time_slot: '05:30 AM - 07:00 AM', period: 'Morning', program_title: 'Pro Combat Boxing', trainer_name: 'Mr. Samidurai', room: 'Main Ring A', max_capacity: 15 },
    { id: 's-11', day_of_week: 'Friday', time_slot: '07:00 PM - 08:30 PM', period: 'Evening', program_title: 'Championship Sparring Night', trainer_name: 'Mr. Samidurai & Coaches', room: 'Main Ring A', max_capacity: 15 },
    { id: 's-12', day_of_week: 'Saturday', time_slot: '06:00 AM - 08:00 AM', period: 'Morning', program_title: 'Weekend Warrior Masterclass', trainer_name: 'Mr. Samidurai', room: 'All Arenas', max_capacity: 30 }
  ],
  trainers: [
    {
      id: 't-1',
      name: 'Mr. Samidurai',
      role: 'Head Coach & Founder',
      specialty: 'Technical Boxing, Fight Strategy & Championship Sparring',
      experience_years: '15+ Years',
      fight_record: 'State & National Boxing Veteran',
      bio: 'Renowned boxing mentor in Salem dedicated to training state champions, novice fighters, and fitness athletes with absolute discipline and supreme technique.',
      social_handle: '@salemboxingclub'
    },
    {
      id: 't-2',
      name: 'Coach Arun Kumar',
      role: 'Senior Combat Conditioning Coach',
      specialty: 'Heavy Bag Pad Work, Functional MMA Stamina',
      experience_years: '8+ Years',
      fight_record: '18 Amateur Bouts (15 Wins)',
      bio: 'Specialist in high-tempo pad drills, boxing agility, and explosive athletic strength development.',
      social_handle: '@arun_boxing_sbc'
    }
  ],
  plans: [
    {
      id: 'pl-1',
      name: 'Monthly Fighter',
      price: 1800,
      duration: '1 Month',
      description: 'Ideal for beginners starting their boxing journey.',
      features: ['Access to 6 Days/Week Training', 'Boxing Stance & Footwork Coaching', 'Heavy Bag & Pad Work', 'Locker & Dressing Room Access'],
      is_popular: false,
      badge: 'Starter'
    },
    {
      id: 'pl-2',
      name: 'Champion Quarterly',
      price: 4800,
      duration: '3 Months',
      description: 'Our most popular program for serious fitness & combat skill gains.',
      features: ['Full Boxing & Sparring Training', 'Custom Nutrition & Weight Guidance', 'Ringside Pad Sessions with Head Coach', 'Free Hand Wraps & Club Gear Discount', 'Access to Sunday Sparring Workshops'],
      is_popular: true,
      badge: 'Most Popular'
    },
    {
      id: 'pl-3',
      name: 'Pro Annual VIP',
      price: 16000,
      duration: '12 Months',
      description: 'Full year elite training for aspiring champions & dedicated athletes.',
      features: ['Unlimited All-Access Year Pass', '1-on-1 Personal Fight Technique Reviews', 'Tournament Registration Support', 'Official Salem Boxing Club Kit Included', 'Priority Ring Time & Conditioning'],
      is_popular: false,
      badge: 'Elite Value'
    }
  ],
  announcements: [
    {
      id: 'ann-1',
      title: '🥊 New Admission Batches Open for October!',
      message: 'Morning (5:30 AM) and Evening (5:30 PM) batches now open at Nirmal Skywin Mall, Salem. Book a free trial today!',
      badge: 'Admissions Open',
      is_active: true,
      link_url: '/#join'
    },
    {
      id: 'ann-2',
      title: '🏆 State Championship Fight Night on Oct 15!',
      message: 'Cheer for Salem Boxing Club warriors at the upcoming State Boxing Finals in Salem Indoor Stadium.',
      badge: 'Fight Night Alert',
      is_active: true,
      link_url: '/#matches'
    }
  ],
  admin_users: [
    {
      id: 'usr-dev-1',
      username: 'developer',
      full_name: 'Lead System Developer',
      role: 'Developer',
      passcode: 'dev123',
      email: 'dev@salemboxingclub.in',
      phone: '+91 9500273164',
      is_active: true,
      created_at: new Date().toISOString()
    },
    {
      id: 'usr-admin-1',
      username: 'samidurai',
      full_name: 'Coach Samidurai (Founder)',
      role: 'Super Admin',
      passcode: 'admin123',
      email: 'samidurai@salemboxingclub.in',
      phone: '+91 9500273164',
      is_active: true,
      created_at: new Date().toISOString()
    },
    {
      id: 'usr-coach-1',
      username: 'coach',
      full_name: 'Assistant Boxing Coach',
      role: 'Coach',
      passcode: 'coach123',
      email: 'coach@salemboxingclub.in',
      phone: '+91 9500273164',
      is_active: true,
      created_at: new Date().toISOString()
    }
  ],
  gallery: [
    {
      id: 'gal-1',
      title: 'Main Sparring Ring Arena',
      image_url: heroImg,
      category: 'Facilities',
      caption: 'Full-size competition boxing ring with custom shock-absorbing floor at Nirmal Skywin Mall.',
      is_featured: true,
      created_at: new Date().toISOString()
    },
    {
      id: 'gal-2',
      title: 'Speed & Pad Work Drills',
      image_url: trainingImg,
      category: 'Training',
      caption: 'Coach-assisted focus mitt combination training developing lightning-fast counter reflexes.',
      is_featured: true,
      created_at: new Date().toISOString()
    },
    {
      id: 'gal-3',
      title: 'State Championship Prep Sparring',
      image_url: img1,
      category: 'Sparring',
      caption: 'Full-gear technical sparring rounds refining defensive slips and power hooks.',
      is_featured: true,
      created_at: new Date().toISOString()
    },
    {
      id: 'gal-4',
      title: 'Fighter Brotherhood & Cadet Squad',
      image_url: img2,
      category: 'Community',
      caption: 'Youth cadets and senior amateur warriors training with unmatched discipline.',
      is_featured: true,
      created_at: new Date().toISOString()
    },
    {
      id: 'gal-5',
      title: 'Heavy Bag & Power Punching Station',
      image_url: img3,
      category: 'Facilities',
      caption: 'Water-filled teardrop and 6ft leather heavy bags for brutal punch impact conditioning.',
      is_featured: true,
      created_at: new Date().toISOString()
    },
    {
      id: 'gal-6',
      title: 'Gold Medal Podium Celebrations',
      image_url: img1,
      category: 'Championships',
      caption: 'Salem Boxing Club warriors securing top honors at Tamil Nadu state championships.',
      is_featured: true,
      created_at: new Date().toISOString()
    }
  ]
};

// Local storage helper
const getLocalCollection = (collection) => {
  const data = localStorage.getItem(`sbc_${collection}`);
  if (!data) {
    if (INITIAL_DATA[collection]) {
      localStorage.setItem(`sbc_${collection}`, JSON.stringify(INITIAL_DATA[collection]));
      return INITIAL_DATA[collection];
    }
    return [];
  }
  try {
    return JSON.parse(data);
  } catch (e) {
    return INITIAL_DATA[collection] || [];
  }
};

const saveLocalCollection = (collection, items) => {
  localStorage.setItem(`sbc_${collection}`, JSON.stringify(items));
};

const isUUID = (str) => typeof str === 'string' && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(str);

// Generic Data Service with seamless Supabase + Local Storage fallback
export const DataService = {
  async testConnection() {
    const supabase = getSupabase();
    if (!supabase) {
      return { success: false, message: 'Supabase credentials not configured yet. Operating in Local Data Mode.' };
    }
    try {
      const { error } = await supabase.from('queries').select('id').limit(1);
      if (error) throw error;
      return { success: true, message: 'Connected successfully to Supabase PostgreSQL database!' };
    } catch (err) {
      return { success: false, message: err.message || 'Failed to connect to Supabase.' };
    }
  },

  async getAll(table) {
    const supabase = getSupabase();
    if (supabase) {
      try {
        let query = supabase.from(table).select('*');
        if (table === 'matches') {
          query = query.order('match_date', { ascending: true });
        } else if (table === 'achievements') {
          query = query.order('year', { ascending: false });
        } else {
          query = query.order('created_at', { ascending: false });
        }

        const { data, error } = await query;
        if (!error && data) {
          if (data.length > 0) {
            saveLocalCollection(table, data);
            return data;
          } else {
            // Table exists in DB but is empty. Return empty list (or fallback if first launch)
            const local = getLocalCollection(table);
            return local;
          }
        } else if (error) {
          console.warn(`Supabase fetch failed for ${table}:`, error.message);
        }
      } catch (e) {
        console.warn(`Supabase fetch exception for ${table}, using local data:`, e);
      }
    }
    return getLocalCollection(table);
  },

  async create(table, item) {
    const supabase = getSupabase();
    let savedData = null;

    if (supabase) {
      try {
        let dbPayload = { ...item };
        // Strip non-UUID id so Postgres auto-generates gen_random_uuid()
        if (!isUUID(dbPayload.id)) {
          delete dbPayload.id;
        }
        delete dbPayload.created_at;

        // Try primary insert
        let { data, error } = await supabase.from(table).insert([dbPayload]).select().single();

        // If error indicates a missing column name, adapt payload and retry
        if (error && (error.message.includes('column') || error.message.includes('does not exist') || error.code === 'PGRST204')) {
          console.warn(`[Supabase ${table} column adaptation retry]:`, error.message);
          let retryPayload = { ...dbPayload };

          if (table === 'achievements') {
            const photoVal = retryPayload.athlete_photo || retryPayload.image_url;
            if (error.message.includes('athlete_photo')) {
              delete retryPayload.athlete_photo;
              retryPayload.image_url = photoVal;
            } else if (error.message.includes('image_url')) {
              delete retryPayload.image_url;
              retryPayload.athlete_photo = photoVal;
            }
          } else if (table === 'matches') {
            const brochureVal = retryPayload.brochure_url || retryPayload.image_url;
            if (error.message.includes('brochure_url')) {
              delete retryPayload.brochure_url;
              retryPayload.image_url = brochureVal;
            } else if (error.message.includes('image_url')) {
              delete retryPayload.image_url;
              retryPayload.brochure_url = brochureVal;
            }
          } else if (table === 'trainers') {
            const coachPhoto = retryPayload.photo_url || retryPayload.image_url;
            if (error.message.includes('photo_url')) {
              delete retryPayload.photo_url;
              retryPayload.image_url = coachPhoto;
            } else if (error.message.includes('image_url')) {
              delete retryPayload.image_url;
              retryPayload.photo_url = coachPhoto;
            }
          }

          const retryRes = await supabase.from(table).insert([retryPayload]).select().single();
          if (!retryRes.error && retryRes.data) {
            data = retryRes.data;
            error = null;
          } else if (retryRes.error) {
            console.error(`❌ [Supabase Insert Retry Failed for ${table}]:`, retryRes.error.message);
          }
        }

        if (!error && data) {
          console.log(`✅ [Supabase Insert Success into ${table}]:`, data.id);
          savedData = data;
        }
      } catch (err) {
        console.error(`❌ [Supabase Insert Exception in ${table}]:`, err);
      }
    }

    const finalItem = savedData || {
      ...item,
      id: item.id || `sbc-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      created_at: new Date().toISOString()
    };

    const current = getLocalCollection(table);
    const updated = [finalItem, ...current.filter(c => c.id !== finalItem.id)];
    saveLocalCollection(table, updated);
    return finalItem;
  },

  async update(table, id, updates) {
    const supabase = getSupabase();
    let savedData = null;

    if (supabase) {
      try {
        let dbPayload = { ...updates };
        delete dbPayload.id;
        delete dbPayload.created_at;

        if (isUUID(id)) {
          let { data, error } = await supabase.from(table).update(dbPayload).eq('id', id).select().single();

          if (error && (error.message.includes('column') || error.message.includes('does not exist') || error.code === 'PGRST204')) {
            console.warn(`[Supabase ${table} column adaptation update retry]:`, error.message);
            let retryPayload = { ...dbPayload };

            if (table === 'achievements') {
              const photoVal = retryPayload.athlete_photo || retryPayload.image_url;
              if (error.message.includes('athlete_photo')) {
                delete retryPayload.athlete_photo;
                retryPayload.image_url = photoVal;
              } else if (error.message.includes('image_url')) {
                delete retryPayload.image_url;
                retryPayload.athlete_photo = photoVal;
              }
            } else if (table === 'matches') {
              const brochureVal = retryPayload.brochure_url || retryPayload.image_url;
              if (error.message.includes('brochure_url')) {
                delete retryPayload.brochure_url;
                retryPayload.image_url = brochureVal;
              } else if (error.message.includes('image_url')) {
                delete retryPayload.image_url;
                retryPayload.brochure_url = brochureVal;
              }
            } else if (table === 'trainers') {
              const coachPhoto = retryPayload.photo_url || retryPayload.image_url;
              if (error.message.includes('photo_url')) {
                delete retryPayload.photo_url;
                retryPayload.image_url = coachPhoto;
              } else if (error.message.includes('image_url')) {
                delete retryPayload.image_url;
                retryPayload.photo_url = coachPhoto;
              }
            }

            const retryRes = await supabase.from(table).update(retryPayload).eq('id', id).select().single();
            if (!retryRes.error && retryRes.data) {
              data = retryRes.data;
              error = null;
            }
          }

          if (!error && data) {
            console.log(`✅ [Supabase Update Success in ${table}]:`, data.id);
            savedData = data;
          }
        } else {
          // If the item had a legacy/mock non-UUID id, insert it into Supabase as a new live DB row
          const { data, error } = await supabase.from(table).insert([dbPayload]).select().single();
          if (!error && data) {
            console.log(`✅ [Supabase Converted & Inserted in ${table}]:`, data.id);
            savedData = data;
          }
        }
      } catch (err) {
        console.error(`❌ [Supabase Update Exception in ${table}]:`, err);
      }
    }

    const current = getLocalCollection(table);
    const fallbackItem = { ...(current.find(i => i.id === id) || {}), ...updates, id: savedData ? savedData.id : id };
    const finalItem = savedData || fallbackItem;

    const updated = current.map(item => item.id === id ? finalItem : item);
    saveLocalCollection(table, updated);
    return finalItem;
  },

  async delete(table, id) {
    const supabase = getSupabase();
    if (supabase && isUUID(id)) {
      try {
        const { error } = await supabase.from(table).delete().eq('id', id);
        if (error) {
          console.error(`❌ [Supabase Delete Error in ${table}]:`, error.message);
        } else {
          console.log(`✅ [Supabase Deleted from ${table}]:`, id);
        }
      } catch (err) {
        console.error(`❌ [Supabase Delete Exception in ${table}]:`, err);
      }
    }

    const current = getLocalCollection(table);
    const updated = current.filter(item => item.id !== id);
    saveLocalCollection(table, updated);
    return true;
  },

  async uploadImage(file, folder = 'uploads') {
    if (!file) return null;
    const supabase = getSupabase();

    // 1. Try Supabase Storage Upload if configured
    if (supabase && supabase.storage) {
      try {
        const fileExt = file.name.split('.').pop() || 'jpg';
        const cleanName = `${Date.now()}_${Math.random().toString(36).substring(2, 7)}.${fileExt}`;
        const filePath = `${folder}/${cleanName}`;

        const { data, error } = await supabase.storage
          .from('sbc-media')
          .upload(filePath, file, {
            cacheControl: '3600',
            upsert: true
          });

        if (!error && data) {
          const { data: urlData } = supabase.storage.from('sbc-media').getPublicUrl(filePath);
          if (urlData && urlData.publicUrl) {
            console.log('✅ Uploaded to Supabase Storage bucket:', urlData.publicUrl);
            return { success: true, url: urlData.publicUrl, source: 'supabase_storage' };
          }
        } else if (error) {
          console.warn('⚠️ Supabase storage upload failed, compressing for database storage:', error.message || error);
        }
      } catch (err) {
        console.warn('⚠️ Supabase storage exception:', err);
      }
    }

    // 2. Fallback: Compress image via canvas and return optimized Data URL (stored directly in DB table column)
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const maxDim = 1200;
          let w = img.width;
          let h = img.height;

          if (w > maxDim || h > maxDim) {
            if (w > h) {
              h = Math.round((h * maxDim) / w);
              w = maxDim;
            } else {
              w = Math.round((w * maxDim) / h);
              h = maxDim;
            }
          }

          canvas.width = w;
          canvas.height = h;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, w, h);

          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.82);
          resolve({ success: true, url: compressedDataUrl, source: 'compressed_base64' });
        };
        img.onerror = () => {
          resolve({ success: true, url: e.target.result, source: 'raw_base64' });
        };
        img.src = e.target.result;
      };
      reader.onerror = () => {
        resolve({ success: false, error: 'Failed to read image file' });
      };
      reader.readAsDataURL(file);
    });
  },

  resetDefaults() {
    Object.keys(INITIAL_DATA).forEach(key => {
      localStorage.setItem(`sbc_${key}`, JSON.stringify(INITIAL_DATA[key]));
    });
  }
};

export default DataService;

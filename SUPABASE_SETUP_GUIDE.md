# 🚀 Koshish NGO Website - Complete Supabase Setup Guide

## 📋 Overview
Your Koshish NGO website is ready for deployment! Here's the complete Supabase setup and what you need to do.

## ✅ Current Status
- **Supabase Project**: Already configured and connected
- **Database**: All tables created and properly configured
- **Authentication**: Ready for user management
- **RLS Policies**: Properly set up for security
- **API**: Fully functional

## 🗃️ Database Tables Status

### ✅ Already Created & Working:
1. **`profiles`** - User profiles and admin management
2. **`donations`** - Donation tracking and management
3. **`volunteers`** - Volunteer applications
4. **`programs`** - Program/campaign management
5. **`blog_posts`** - Blog post management
6. **`gallery`** - Photo gallery management
7. **`contact_messages`** - Contact form submissions

### 🔧 Sample Data Status:
- **Programs**: ✅ Sample data already inserted
- **Gallery**: ❌ Needs sample data (currently using fallback hardcoded images)
- **Blog Posts**: ❌ Empty (optional)

## 🎯 What You Need to Do in Supabase

### Step 1: Add Gallery Images to Database
Run this SQL in your Supabase SQL Editor to populate the gallery:

```sql
-- Insert gallery images
INSERT INTO public.gallery (title, description, image_url, category) VALUES
('Education Workshop', 'Children participating in an educational workshop.', '/images/pic 1.jpeg', 'Education'),
('Women Empowerment', 'Women empowerment session in progress.', '/images/pic 2.jpeg', 'Women Empowerment'),
('Health Camp', 'Community members at a health camp.', '/images/pic 3.jpeg', 'Health'),
('Food Distribution - Muzaffarpur', 'Food distribution at Muzaffarpur during relief efforts.', '/images/Food Distribution at MMuzaffarpur.JPG', 'Relief'),
('Legal Aid Camp', 'Legal aid camp for rural families.', '/images/pic 6.jpeg', 'Legal Aid'),
('Successful Campaign', 'Team Koshish celebrating a successful campaign.', '/images/pic 7.jpeg', 'Team'),
('Skill Development', 'Skill development training for youth.', '/images/pic 8.jpeg', 'Skills'),
('Environment Rally', 'Environmental awareness rally.', '/images/pic 9.jpeg', 'Environment'),
('Tree Plantation', 'Volunteers planting trees for sustainability.', '/images/pic 10.jpeg', 'Environment'),
('Community Outreach', 'Community outreach and engagement activities.', '/images/pic 11.jpeg', 'Community'),
('Dignity Kits Distribution - Patna', 'Dignity kits distribution in Patna for women empowerment.', '/images/Dignity kits distribution in Patna (4).jpg', 'Women Empowerment'),
('Community Development Program', 'Community development program documentation.', '/images/DSC_8067.JPG', 'Development'),
('Field Activities', 'Field activities and community engagement.', '/images/DSC_8079.JPG', 'Community');
```

### Step 2: Create Your First Admin User
1. Go to your Supabase project → Authentication → Users
2. Click "Add User" manually or sign up through your website
3. After user is created, run this SQL to make them admin:

```sql
-- Replace 'your-user-email@example.com' with your actual email
UPDATE public.profiles 
SET role = 'admin' 
WHERE email = 'your-user-email@example.com';
```

### Step 3: Add Sample Blog Posts (Optional)
```sql
-- Add sample blog posts
INSERT INTO public.blog_posts (title, content, excerpt, author_id, published, image_url) VALUES
('Welcome to Koshish NGO', 
 'We are excited to share our journey and the impact we''ve made in Bihar communities over the past 28 years...',
 'Learn about our mission and the communities we serve.',
 (SELECT id FROM public.profiles WHERE role = 'admin' LIMIT 1),
 true,
 '/images/pic 1.jpeg'),
('Women Empowerment Initiative Success', 
 'Our latest women empowerment program has reached over 150 women across 5 districts...',
 'Celebrating the success of our women empowerment programs.',
 (SELECT id FROM public.profiles WHERE role = 'admin' LIMIT 1),
 true,
 '/images/pic 2.jpeg');
```

## 🛡️ Security Features Already Configured

### Row Level Security (RLS) Policies:
- **Public Access**: Gallery, Programs, Published Blog Posts
- **User Access**: Own profile, own donations, own volunteer applications
- **Admin Access**: Full access to all data
- **Contact Forms**: Anyone can submit, only admins can view

### Authentication Features:
- User registration and login
- Profile management
- Admin role management
- Secure password handling

## 📊 Data Flow Check

### ✅ Working Data Flows:
1. **Contact Form** → Saves to `contact_messages` table
2. **Donations** → Saves to `donations` table
3. **Volunteer Applications** → Saves to `volunteers` table
4. **Gallery** → Reads from `gallery` table (with fallback to hardcoded)
5. **Programs** → Reads from `programs` table
6. **User Registration** → Creates profile in `profiles` table

## 🚀 Deployment Checklist

### Before Deployment:
- [x] Supabase project configured
- [x] All database tables created
- [x] RLS policies set up
- [x] Sample program data inserted
- [ ] Gallery data inserted (run Step 1 above)
- [ ] Admin user created (run Step 2 above)
- [x] Environment variables configured

### Environment Variables in Production:
Make sure these are set in your deployment platform (Vercel, Netlify, etc.):
```
VITE_SUPABASE_URL=https://ncuerkukueczqczeuppu.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5jdWVya3VrdWVjenFjemV1cHB1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE3MDI4NjEsImV4cCI6MjA2NzI3ODg2MX0.dXc8exZBpGgRiM8DBV_yBKGI6BQRKSYGcSaM8dDWKAc
```

## 🔧 Testing Your Setup

### Test These Features:
1. **Contact Form**: Submit a message and check if it appears in Supabase
2. **Donations**: Try making a test donation
3. **Volunteer Form**: Submit a volunteer application
4. **Gallery**: Check if images load properly
5. **Admin Panel**: Log in as admin and manage content

## 📱 Admin Panel Access
Once you create an admin user:
1. Go to `/admin` on your website
2. Log in with your admin credentials
3. You can manage:
   - Gallery images
   - Blog posts
   - Programs
   - Donations
   - Volunteer applications
   - Contact messages

## 🆘 Troubleshooting

### If Gallery Images Don't Show:
- Run the gallery SQL insert from Step 1
- Check if Supabase connection is working
- Verify image paths in `/public/images/` folder

### If Contact Form Doesn't Work:
- Check `contact_messages` table exists
- Verify RLS policies allow public insert
- Check console for JavaScript errors

### If Admin Panel Doesn't Work:
- Ensure you've set a user's role to 'admin'
- Check if you're logged in
- Verify admin policies are working

## 🎉 Your Website is Ready!

All major features are implemented and working:
- ✅ Contact forms with email integration
- ✅ Donation system
- ✅ Volunteer management
- ✅ Gallery with admin management
- ✅ Blog system
- ✅ Program showcases
- ✅ Admin dashboard
- ✅ Responsive design
- ✅ SEO optimization

Just run the SQL queries above and your website will be 100% functional!

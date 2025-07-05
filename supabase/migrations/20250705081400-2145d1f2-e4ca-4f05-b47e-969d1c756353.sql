
-- Create profiles table for user management
CREATE TABLE public.profiles (
  id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  email TEXT,
  phone TEXT,
  role TEXT DEFAULT 'user' CHECK (role IN ('admin', 'volunteer', 'donor', 'user')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create donations table
CREATE TABLE public.donations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  donor_name TEXT NOT NULL,
  donor_email TEXT NOT NULL,
  donor_phone TEXT,
  amount DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'INR',
  cause TEXT NOT NULL,
  frequency TEXT DEFAULT 'one-time' CHECK (frequency IN ('one-time', 'monthly', 'yearly')),
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'completed', 'failed', 'refunded')),
  payment_id TEXT,
  receipt_sent BOOLEAN DEFAULT false,
  anonymous BOOLEAN DEFAULT false,
  user_id UUID REFERENCES auth.users,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create volunteers table
CREATE TABLE public.volunteers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  skills TEXT,
  availability TEXT,
  motivation TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  user_id UUID REFERENCES auth.users,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create programs table
CREATE TABLE public.programs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  goal_amount DECIMAL(10,2),
  raised_amount DECIMAL(10,2) DEFAULT 0,
  target_beneficiaries INTEGER,
  current_beneficiaries INTEGER DEFAULT 0,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'completed', 'paused')),
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create blog posts table
CREATE TABLE public.blog_posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  image_url TEXT,
  tags TEXT[],
  published BOOLEAN DEFAULT false,
  author_id UUID REFERENCES auth.users NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create gallery table
CREATE TABLE public.gallery (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL,
  category TEXT,
  tags TEXT[],
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.donations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.volunteers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;

-- Create function to check if user is admin
CREATE OR REPLACE FUNCTION public.is_admin(user_id UUID)
RETURNS BOOLEAN
LANGUAGE SQL
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = user_id AND role = 'admin'
  );
$$;

-- RLS Policies for profiles
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles" ON public.profiles
  FOR SELECT USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can update all profiles" ON public.profiles
  FOR UPDATE USING (public.is_admin(auth.uid()));

-- RLS Policies for donations
CREATE POLICY "Admins can view all donations" ON public.donations
  FOR SELECT USING (public.is_admin(auth.uid()));

CREATE POLICY "Users can view their own donations" ON public.donations
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Anyone can insert donations" ON public.donations
  FOR INSERT WITH CHECK (true);

-- RLS Policies for volunteers
CREATE POLICY "Admins can view all volunteers" ON public.volunteers
  FOR SELECT USING (public.is_admin(auth.uid()));

CREATE POLICY "Users can view their volunteer application" ON public.volunteers
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Anyone can apply as volunteer" ON public.volunteers
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can update volunteer status" ON public.volunteers
  FOR UPDATE USING (public.is_admin(auth.uid()));

-- RLS Policies for programs
CREATE POLICY "Anyone can view active programs" ON public.programs
  FOR SELECT USING (status = 'active' OR public.is_admin(auth.uid()));

CREATE POLICY "Admins can manage programs" ON public.programs
  FOR ALL USING (public.is_admin(auth.uid()));

-- RLS Policies for blog posts
CREATE POLICY "Anyone can view published posts" ON public.blog_posts
  FOR SELECT USING (published = true OR public.is_admin(auth.uid()));

CREATE POLICY "Admins can manage blog posts" ON public.blog_posts
  FOR ALL USING (public.is_admin(auth.uid()));

-- RLS Policies for gallery
CREATE POLICY "Anyone can view gallery" ON public.gallery
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage gallery" ON public.gallery
  FOR ALL USING (public.is_admin(auth.uid()));

-- Create trigger to automatically create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email, role)
  VALUES (
    new.id,
    new.raw_user_meta_data->>'full_name',
    new.email,
    'user'
  );
  RETURN new;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Insert some sample data
INSERT INTO public.programs (title, description, goal_amount, raised_amount, target_beneficiaries, current_beneficiaries, status) VALUES
('Street Education Campaign', 'Providing education to underprivileged children on streets', 100000, 45000, 200, 85, 'active'),
('Women Empowerment Initiative', 'Skill development and training for women', 75000, 32000, 150, 60, 'active'),
('Legal Aid Support', 'Free legal assistance for migrant workers', 50000, 28000, 100, 45, 'active'),
('Emergency Relief Fund', 'Immediate assistance during disasters', 200000, 125000, 500, 300, 'active');

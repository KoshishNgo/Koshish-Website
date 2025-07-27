-- Create volunteer_applications table
CREATE TABLE public.volunteer_applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  age TEXT,
  skills TEXT,
  availability TEXT,
  interests TEXT[],
  experience TEXT,
  why TEXT,
  location TEXT,
  type TEXT DEFAULT 'volunteer' CHECK (type IN ('volunteer', 'internship')),
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'under_review', 'accepted', 'rejected')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create trigger for updated_at
CREATE TRIGGER update_volunteer_applications_updated_at
BEFORE UPDATE ON public.volunteer_applications
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable RLS (Row Level Security)
ALTER TABLE public.volunteer_applications ENABLE ROW LEVEL SECURITY;

-- Create policy for public insert access (anyone can submit applications)
CREATE POLICY "Allow public insert on volunteer_applications" ON public.volunteer_applications
FOR INSERT WITH CHECK (true);

-- Create policy for admin read/update access
CREATE POLICY "Allow admin full access on volunteer_applications" ON public.volunteer_applications
FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  )
);

-- Create policy for users to view their own applications
CREATE POLICY "Allow users to view own applications" ON public.volunteer_applications
FOR SELECT USING (auth.email() = email);

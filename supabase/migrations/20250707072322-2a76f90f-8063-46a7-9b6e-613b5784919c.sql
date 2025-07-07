
-- First, let's ensure we have a proper admin user setup
-- Insert admin user profile (this will work if the user exists in auth.users)
INSERT INTO public.profiles (id, email, full_name, role) 
VALUES (
  '00000000-0000-0000-0000-000000000001'::uuid,
  'koshishngopatna@gmail.com',
  'Koshish Admin',
  'admin'
) 
ON CONFLICT (id) DO UPDATE SET 
  email = EXCLUDED.email,
  role = 'admin',
  full_name = EXCLUDED.full_name;

-- Update the is_admin function to also check by email for flexibility
CREATE OR REPLACE FUNCTION public.is_admin(user_id uuid)
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
AS $function$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE (id = user_id OR email = 'koshishngopatna@gmail.com') 
    AND role = 'admin'
  );
$function$;

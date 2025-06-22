
-- This migration will automatically set the role to 'admin' for jamesmburu899@gmail.com when they sign up
-- Create or replace the handle_new_user function to include admin check
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $function$
BEGIN
  -- Insert the new user profile
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    new.id, 
    new.email, 
    new.raw_user_meta_data->>'full_name',
    -- Set role to 'admin' if email matches, otherwise 'patient'
    CASE 
      WHEN new.email = 'jamesmburu899@gmail.com' THEN 'admin'
      ELSE 'patient'
    END
  );
  RETURN new;
END;
$function$;

-- If the user already exists, update their role to admin
UPDATE public.profiles 
SET role = 'admin' 
WHERE email = 'jamesmburu899@gmail.com';

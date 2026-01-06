-- Create user role enum
CREATE TYPE public.user_role AS ENUM ('user', 'admin');

-- Create profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  username TEXT UNIQUE,
  role public.user_role NOT NULL DEFAULT 'user',
  language TEXT NOT NULL DEFAULT 'en',
  university_id TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create universities table
CREATE TABLE public.universities (
  id TEXT PRIMARY KEY,
  name_en TEXT NOT NULL,
  name_ar TEXT NOT NULL,
  grade_rules JSONB NOT NULL,
  classification_rules JSONB NOT NULL,
  min_pass_gpa DECIMAL(3,2) NOT NULL DEFAULT 2.00,
  warning_threshold DECIMAL(3,2) NOT NULL DEFAULT 2.30,
  probation_threshold DECIMAL(3,2) NOT NULL DEFAULT 2.00,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create courses table
CREATE TABLE public.courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  university_id TEXT NOT NULL REFERENCES public.universities(id),
  course_code TEXT NOT NULL,
  course_name TEXT NOT NULL,
  credit_hours INTEGER NOT NULL CHECK (credit_hours > 0),
  grade TEXT NOT NULL,
  grade_points DECIMAL(3,2) NOT NULL,
  semester TEXT NOT NULL,
  year INTEGER NOT NULL,
  is_retake BOOLEAN NOT NULL DEFAULT FALSE,
  original_course_id UUID REFERENCES public.courses(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create scenarios table
CREATE TABLE public.scenarios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  courses JSONB NOT NULL,
  predicted_gpa DECIMAL(3,2) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_courses_user_id ON public.courses(user_id);
CREATE INDEX idx_courses_semester ON public.courses(year, semester);
CREATE INDEX idx_scenarios_user_id ON public.scenarios(user_id);

-- Create helper function for admin check
CREATE OR REPLACE FUNCTION public.is_admin(uid UUID)
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles p
    WHERE p.id = uid AND p.role = 'admin'::user_role
  );
$$;

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.universities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scenarios ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Admins have full access to profiles"
  ON public.profiles FOR ALL
  TO authenticated
  USING (public.is_admin(auth.uid()));

CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (role IS NOT DISTINCT FROM (SELECT role FROM public.profiles WHERE id = auth.uid()));

-- Universities policies (public read)
CREATE POLICY "Anyone can view universities"
  ON public.universities FOR SELECT
  TO authenticated
  USING (TRUE);

CREATE POLICY "Admins can manage universities"
  ON public.universities FOR ALL
  TO authenticated
  USING (public.is_admin(auth.uid()));

-- Courses policies
CREATE POLICY "Users can view their own courses"
  ON public.courses FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own courses"
  ON public.courses FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own courses"
  ON public.courses FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own courses"
  ON public.courses FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Admins have full access to courses"
  ON public.courses FOR ALL
  TO authenticated
  USING (public.is_admin(auth.uid()));

-- Scenarios policies
CREATE POLICY "Users can view their own scenarios"
  ON public.scenarios FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own scenarios"
  ON public.scenarios FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own scenarios"
  ON public.scenarios FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own scenarios"
  ON public.scenarios FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create trigger for user sync
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
DECLARE
  user_count INT;
BEGIN
  SELECT COUNT(*) INTO user_count FROM public.profiles;
  
  INSERT INTO public.profiles (id, email, username, role)
  VALUES (
    NEW.id,
    NEW.email,
    SPLIT_PART(NEW.email, '@', 1),
    CASE WHEN user_count = 0 THEN 'admin'::user_role ELSE 'user'::user_role END
  );
  
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_confirmed ON auth.users;
CREATE TRIGGER on_auth_user_confirmed
  AFTER UPDATE ON auth.users
  FOR EACH ROW
  WHEN (OLD.confirmed_at IS NULL AND NEW.confirmed_at IS NOT NULL)
  EXECUTE FUNCTION public.handle_new_user();

-- Insert default university
INSERT INTO public.universities (id, name_en, name_ar, grade_rules, classification_rules)
VALUES (
  'default-university',
  'Default University',
  'الجامعة الافتراضية',
  '[
    {"symbol":"A","points":4.0,"minPercentage":90,"maxPercentage":100,"nameEn":"Excellent","nameAr":"ممتاز"},
    {"symbol":"A-","points":3.7,"minPercentage":85,"maxPercentage":89,"nameEn":"Excellent","nameAr":"ممتاز"},
    {"symbol":"B+","points":3.3,"minPercentage":80,"maxPercentage":84,"nameEn":"Very Good","nameAr":"جيد جداً"},
    {"symbol":"B","points":3.0,"minPercentage":75,"maxPercentage":79,"nameEn":"Very Good","nameAr":"جيد جداً"},
    {"symbol":"B-","points":2.7,"minPercentage":70,"maxPercentage":74,"nameEn":"Good","nameAr":"جيد"},
    {"symbol":"C+","points":2.3,"minPercentage":65,"maxPercentage":69,"nameEn":"Good","nameAr":"جيد"},
    {"symbol":"C","points":2.0,"minPercentage":62,"maxPercentage":64,"nameEn":"Pass","nameAr":"مقبول"},
    {"symbol":"D","points":1.7,"minPercentage":60,"maxPercentage":61,"nameEn":"Pass","nameAr":"مقبول"},
    {"symbol":"F","points":0.0,"minPercentage":0,"maxPercentage":59,"nameEn":"Fail","nameAr":"راسب"}
  ]'::jsonb,
  '[
    {"classification":"excellent","minGPA":3.5,"maxGPA":null,"nameEn":"Excellent","nameAr":"ممتاز"},
    {"classification":"very_good","minGPA":2.75,"maxGPA":3.49,"nameEn":"Very Good","nameAr":"جيد جداً"},
    {"classification":"good","minGPA":2.3,"maxGPA":2.74,"nameEn":"Good","nameAr":"جيد"},
    {"classification":"pass","minGPA":2.0,"maxGPA":2.29,"nameEn":"Pass","nameAr":"مقبول"},
    {"classification":"fail","minGPA":0,"maxGPA":1.99,"nameEn":"Fail","nameAr":"راسب"}
  ]'::jsonb
);
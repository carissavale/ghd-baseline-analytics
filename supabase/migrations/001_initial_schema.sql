-- ====================================================================
-- Baseline Analytics Stakeholder Portal — Initial Schema
-- Run this in: Supabase Dashboard → SQL Editor → New query
-- ====================================================================

-- ── PROFILES (extends auth.users) ────────────────────────────────────
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'investor' CHECK (role IN ('admin', 'investor')),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'Investor'),
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'role', 'investor')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles"
  ON public.profiles FOR SELECT
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

CREATE POLICY "Admins can manage profiles"
  ON public.profiles FOR ALL
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

-- ── MEETINGS ─────────────────────────────────────────────────────────
-- V4 category palette: investor / advisory / strategy / board
CREATE TABLE public.meetings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  meeting_date DATE NOT NULL,
  category TEXT NOT NULL DEFAULT 'board' CHECK (category IN (
    'investor', 'advisory', 'strategy', 'board'
  )),
  summary TEXT NOT NULL,
  content TEXT NOT NULL,
  attendees TEXT[],
  organization_name TEXT,
  -- Single-letter avatar shown on activity + meeting cards in V4
  organization_initial TEXT,
  logo_url TEXT,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_meetings_date ON public.meetings(meeting_date DESC);
CREATE INDEX idx_meetings_category ON public.meetings(category);

ALTER TABLE public.meetings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view meetings"
  ON public.meetings FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Admins can manage meetings"
  ON public.meetings FOR ALL
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

-- ── CYCLE SUMMARIES (rolling summary block on Meetings page) ─────────
CREATE TABLE public.cycle_summaries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  content TEXT NOT NULL,
  last_updated TIMESTAMPTZ DEFAULT now(),
  updated_by UUID REFERENCES auth.users(id),
  is_active BOOLEAN DEFAULT true
);

CREATE INDEX idx_cycle_summaries_active ON public.cycle_summaries(is_active, last_updated DESC);

ALTER TABLE public.cycle_summaries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view summaries"
  ON public.cycle_summaries FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Admins can manage summaries"
  ON public.cycle_summaries FOR ALL
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

-- ── DEALS (Deal Intel comparables) ───────────────────────────────────
CREATE TABLE public.deals (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  value_amount NUMERIC NOT NULL,
  value_unit TEXT NOT NULL,
  deal_year INT NOT NULL,
  deal_type TEXT NOT NULL,
  note TEXT,
  is_highlight BOOLEAN DEFAULT false,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_deals_sort ON public.deals(sort_order);

ALTER TABLE public.deals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view deals"
  ON public.deals FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Admins can manage deals"
  ON public.deals FOR ALL
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

-- ── DOCUMENTS (Vault) ────────────────────────────────────────────────
CREATE TABLE public.documents (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_type TEXT,
  pages TEXT,
  uploaded_at TIMESTAMPTZ DEFAULT now(),
  uploaded_by UUID REFERENCES auth.users(id)
);

CREATE INDEX idx_documents_category ON public.documents(category);
CREATE INDEX idx_documents_uploaded ON public.documents(uploaded_at DESC);

ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view documents"
  ON public.documents FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Admins can manage documents"
  ON public.documents FOR ALL
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

-- ── IAB MEMBERS (Advisory Board) ─────────────────────────────────────
CREATE TABLE public.iab_members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  affiliation TEXT NOT NULL,
  description TEXT,
  initials TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'pending', 'upcoming_offer')),
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_iab_display_order ON public.iab_members(display_order);

ALTER TABLE public.iab_members ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view IAB members"
  ON public.iab_members FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Admins can manage IAB members"
  ON public.iab_members FOR ALL
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

-- ── MILESTONES (Progress Ladder) ─────────────────────────────────────
CREATE TABLE public.milestones (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  target_date DATE NOT NULL,
  status TEXT NOT NULL DEFAULT 'planned' CHECK (status IN ('planned', 'in_progress', 'completed')),
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_milestones_order ON public.milestones(display_order);

ALTER TABLE public.milestones ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view milestones"
  ON public.milestones FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Admins can manage milestones"
  ON public.milestones FOR ALL
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

-- ── AUDIT LOG (track admin actions) ──────────────────────────────────
CREATE TABLE public.audit_log (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  action TEXT NOT NULL,
  resource_type TEXT NOT NULL,
  resource_id UUID,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_audit_log_user ON public.audit_log(user_id, created_at DESC);
CREATE INDEX idx_audit_log_resource ON public.audit_log(resource_type, resource_id);

ALTER TABLE public.audit_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view audit log"
  ON public.audit_log FOR SELECT
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

CREATE POLICY "System can insert audit log"
  ON public.audit_log FOR INSERT
  WITH CHECK (true);

-- ── STORAGE BUCKET for Vault documents ───────────────────────────────
INSERT INTO storage.buckets (id, name, public)
VALUES ('documents', 'documents', false)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Authenticated users can view documents"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'documents' AND auth.role() = 'authenticated');

CREATE POLICY "Admins can upload documents"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'documents' AND
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Admins can delete documents"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'documents' AND
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

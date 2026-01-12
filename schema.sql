-- CMMC Directory Database Schema for Vercel Postgres
-- Run this SQL in the Vercel Postgres Query Console

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- USERS TABLE (synced with Clerk)
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  clerk_id TEXT UNIQUE NOT NULL,
  email TEXT NOT NULL,
  first_name TEXT,
  last_name TEXT,
  stripe_customer_id TEXT,
  subscription_status TEXT DEFAULT 'inactive' CHECK (subscription_status IN ('active', 'inactive', 'past_due', 'canceled')),
  subscription_end_date TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- NAICS CODES TABLE
CREATE TABLE naics_codes (
  code TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  sector TEXT
);

-- COMPANIES TABLE
CREATE TABLE companies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  description TEXT,
  website TEXT,
  email TEXT,
  phone TEXT,

  -- Address
  address_line1 TEXT,
  address_line2 TEXT,
  city TEXT,
  state TEXT,
  zip_code TEXT,
  country TEXT DEFAULT 'USA',

  -- CMMC Certification
  cmmc_level INTEGER NOT NULL CHECK (cmmc_level IN (1, 2, 3)),
  certification_date DATE,
  certification_expiry DATE,
  assessment_type TEXT CHECK (assessment_type IN ('self', 'c3pao', 'dibcac')),
  c3pao_name TEXT,

  -- Status
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'verified', 'rejected', 'expired')),
  verified_at TIMESTAMPTZ,
  verified_by UUID REFERENCES users(id),

  -- Metadata
  logo_url TEXT,
  is_featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- COMPANY NAICS JUNCTION TABLE
CREATE TABLE company_naics (
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
  naics_code TEXT REFERENCES naics_codes(code) ON DELETE CASCADE,
  PRIMARY KEY (company_id, naics_code)
);

-- COMPLIANCE EVIDENCE TABLE
CREATE TABLE compliance_evidence (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
  document_type TEXT NOT NULL CHECK (document_type IN ('certificate', 'assessment_report', 'ssp', 'poam', 'other')),
  file_name TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_size INTEGER,
  mime_type TEXT,
  description TEXT,
  uploaded_by UUID REFERENCES users(id),
  uploaded_at TIMESTAMPTZ DEFAULT NOW()
);

-- SUBSCRIPTIONS TABLE (synced with Stripe)
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  stripe_subscription_id TEXT UNIQUE NOT NULL,
  stripe_price_id TEXT NOT NULL,
  status TEXT NOT NULL,
  current_period_start TIMESTAMPTZ,
  current_period_end TIMESTAMPTZ,
  cancel_at_period_end BOOLEAN DEFAULT FALSE,
  canceled_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- INDEXES
CREATE INDEX idx_companies_cmmc_level ON companies(cmmc_level);
CREATE INDEX idx_companies_status ON companies(status);
CREATE INDEX idx_companies_state ON companies(state);
CREATE INDEX idx_companies_user_id ON companies(user_id);
CREATE INDEX idx_users_clerk_id ON users(clerk_id);
CREATE INDEX idx_users_stripe_customer_id ON users(stripe_customer_id);

-- UPDATED_AT TRIGGER FUNCTION
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- APPLY TRIGGERS
CREATE TRIGGER users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER companies_updated_at BEFORE UPDATE ON companies
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER subscriptions_updated_at BEFORE UPDATE ON subscriptions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- SEED NAICS CODES (Common Defense/Cybersecurity)
INSERT INTO naics_codes (code, title, description, sector) VALUES
('541512', 'Computer Systems Design Services', 'Establishments primarily engaged in planning and designing computer systems', 'Professional Services'),
('541519', 'Other Computer Related Services', 'Computer related services not elsewhere classified', 'Professional Services'),
('541330', 'Engineering Services', 'Professional engineering services', 'Professional Services'),
('541511', 'Custom Computer Programming Services', 'Custom computer programming services', 'Professional Services'),
('541611', 'Administrative Management Consulting', 'Administrative and general management consulting', 'Professional Services'),
('518210', 'Data Processing and Hosting Services', 'Data processing, hosting, and related services', 'Information'),
('517110', 'Wired Telecommunications Carriers', 'Wired telecommunications carriers', 'Information'),
('517210', 'Wireless Telecommunications Carriers', 'Wireless telecommunications carriers', 'Information'),
('541690', 'Other Scientific and Technical Consulting', 'Scientific and technical consulting services', 'Professional Services'),
('541990', 'All Other Professional, Scientific, and Technical Services', 'Miscellaneous professional services', 'Professional Services'),
('334111', 'Electronic Computer Manufacturing', 'Electronic computer manufacturing', 'Manufacturing'),
('334118', 'Computer Terminal and Other Peripheral Equipment', 'Computer peripheral equipment manufacturing', 'Manufacturing'),
('334210', 'Telephone Apparatus Manufacturing', 'Telephone apparatus manufacturing', 'Manufacturing'),
('334220', 'Radio and Television Broadcasting Equipment', 'Broadcast equipment manufacturing', 'Manufacturing'),
('334290', 'Other Communications Equipment Manufacturing', 'Other communications equipment', 'Manufacturing'),
('334310', 'Audio and Video Equipment Manufacturing', 'Audio and video equipment', 'Manufacturing'),
('336411', 'Aircraft Manufacturing', 'Aircraft manufacturing', 'Manufacturing'),
('336412', 'Aircraft Engine and Parts Manufacturing', 'Aircraft engine and parts', 'Manufacturing'),
('336413', 'Other Aircraft Parts Manufacturing', 'Other aircraft parts', 'Manufacturing'),
('336414', 'Guided Missile and Space Vehicle Manufacturing', 'Missiles and space vehicles', 'Manufacturing'),
('611420', 'Computer Training', 'Computer training services', 'Education'),
('561611', 'Investigation Services', 'Investigation and detective services', 'Administrative Services'),
('561612', 'Security Guards and Patrol Services', 'Security guard and patrol services', 'Administrative Services'),
('561621', 'Security Systems Services', 'Security systems services', 'Administrative Services');

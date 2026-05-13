-- EuskApp Database Schema for Supabase
-- This file contains all the SQL commands to set up your database

-- =====================================================
-- TABLE 1: phrases
-- Stores all Basque-Spanish phrase pairs
-- =====================================================
CREATE TABLE phrases (
    id BIGSERIAL PRIMARY KEY,
    euskera TEXT NOT NULL,
    castellano TEXT NOT NULL,
    euskera_alternatives TEXT[], -- Array of alternative Basque translations
    note TEXT, -- Optional notes about the phrase
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Index for faster queries
CREATE INDEX idx_phrases_id ON phrases(id);

-- Enable Row Level Security (RLS)
ALTER TABLE phrases ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read phrases (even non-authenticated users for now)
CREATE POLICY "Anyone can read phrases" ON phrases
    FOR SELECT
    TO public
    USING (true);

-- Policy: Only authenticated users can insert phrases (for future admin features)
CREATE POLICY "Authenticated users can insert phrases" ON phrases
    FOR INSERT
    TO authenticated
    WITH CHECK (true);


-- =====================================================
-- TABLE 2: user_progress
-- Tracks each user's progress on individual phrases
-- =====================================================
CREATE TABLE user_progress (
    id BIGSERIAL PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    phrase_id BIGINT NOT NULL REFERENCES phrases(id) ON DELETE CASCADE,
    correct_count INTEGER DEFAULT 0 NOT NULL,
    incorrect_count INTEGER DEFAULT 0 NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    UNIQUE(user_id, phrase_id) -- One record per user per phrase
);

-- Indexes for faster queries
CREATE INDEX idx_user_progress_user_id ON user_progress(user_id);
CREATE INDEX idx_user_progress_phrase_id ON user_progress(phrase_id);

-- Enable Row Level Security
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only read their own progress
CREATE POLICY "Users can read own progress" ON user_progress
    FOR SELECT
    TO authenticated
    USING (auth.uid() = user_id);

-- Policy: Users can insert their own progress
CREATE POLICY "Users can insert own progress" ON user_progress
    FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = user_id);

-- Policy: Users can update their own progress
CREATE POLICY "Users can update own progress" ON user_progress
    FOR UPDATE
    TO authenticated
    USING (auth.uid() = user_id);


-- =====================================================
-- TABLE 3: daily_progress
-- Tracks daily statistics per user
-- =====================================================
CREATE TABLE daily_progress (
    id BIGSERIAL PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    correct_count INTEGER DEFAULT 0 NOT NULL,
    incorrect_count INTEGER DEFAULT 0 NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    UNIQUE(user_id, date) -- One record per user per day
);

-- Indexes for faster queries
CREATE INDEX idx_daily_progress_user_id ON daily_progress(user_id);
CREATE INDEX idx_daily_progress_date ON daily_progress(date);
CREATE INDEX idx_daily_progress_user_date ON daily_progress(user_id, date);

-- Enable Row Level Security
ALTER TABLE daily_progress ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only read their own daily progress
CREATE POLICY "Users can read own daily progress" ON daily_progress
    FOR SELECT
    TO authenticated
    USING (auth.uid() = user_id);

-- Policy: Users can insert their own daily progress
CREATE POLICY "Users can insert own daily progress" ON daily_progress
    FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = user_id);

-- Policy: Users can update their own daily progress
CREATE POLICY "Users can update own daily progress" ON daily_progress
    FOR UPDATE
    TO authenticated
    USING (auth.uid() = user_id);


-- =====================================================
-- FUNCTIONS: Auto-update timestamps
-- =====================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers to auto-update updated_at
CREATE TRIGGER update_phrases_updated_at BEFORE UPDATE ON phrases
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_progress_updated_at BEFORE UPDATE ON user_progress
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_daily_progress_updated_at BEFORE UPDATE ON daily_progress
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();


-- =====================================================
-- SEED DATA: Insert initial phrases
-- =====================================================
INSERT INTO phrases (id, euskera, castellano, euskera_alternatives, note) VALUES
(1, 'Nola duzu izena?', 'Como te llamas?', NULL, NULL),
(7, 'Ez nuen ezer', 'No tenía nada', NULL, NULL),
(8, 'Gaur gauza asko egin dituzu', 'Hoy has hecho muchas cosas', ARRAY['Gaur gauza asko egin duzu'], '"duzu" es válido porque tenemos "asko" (mugagabe)');

-- Reset the sequence to continue from the highest ID
SELECT setval('phrases_id_seq', (SELECT MAX(id) FROM phrases));

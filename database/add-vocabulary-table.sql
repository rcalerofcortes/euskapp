-- =====================================================
-- Migration: add the vocabulary table
-- Run this in the Supabase SQL editor if your database was
-- created before the vocabulary feature existed.
-- Safe to run once; it assumes update_updated_at_column() already
-- exists (created by supabase-schema.sql).
-- =====================================================

CREATE TABLE IF NOT EXISTS vocabulary (
    id BIGSERIAL PRIMARY KEY,
    euskera TEXT NOT NULL,
    castellano TEXT NOT NULL,
    euskera_alternatives TEXT[],
    castellano_alternatives TEXT[],
    example TEXT,
    note TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_vocabulary_id ON vocabulary(id);

ALTER TABLE vocabulary ENABLE ROW LEVEL SECURITY;

-- Recreate policies safely
DROP POLICY IF EXISTS "Anyone can read vocabulary" ON vocabulary;
CREATE POLICY "Anyone can read vocabulary" ON vocabulary
    FOR SELECT
    TO public
    USING (true);

DROP POLICY IF EXISTS "Authenticated users can insert vocabulary" ON vocabulary;
CREATE POLICY "Authenticated users can insert vocabulary" ON vocabulary
    FOR INSERT
    TO authenticated
    WITH CHECK (true);

DROP TRIGGER IF EXISTS update_vocabulary_updated_at ON vocabulary;
CREATE TRIGGER update_vocabulary_updated_at BEFORE UPDATE ON vocabulary
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

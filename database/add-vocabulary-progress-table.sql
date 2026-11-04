-- =====================================================
-- Migration: vocabulary practice progress
-- Creates user_vocabulary_progress so the Study -> Vocabulary
-- practice can track correct/incorrect answers per user per word.
-- Run this once in the Supabase SQL editor.
-- Assumes update_updated_at_column() already exists (from supabase-schema.sql).
-- =====================================================

CREATE TABLE IF NOT EXISTS user_vocabulary_progress (
    id BIGSERIAL PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    vocabulary_id BIGINT NOT NULL REFERENCES vocabulary(id) ON DELETE CASCADE,
    correct_count INTEGER DEFAULT 0 NOT NULL,
    incorrect_count INTEGER DEFAULT 0 NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    UNIQUE(user_id, vocabulary_id)
);

CREATE INDEX IF NOT EXISTS idx_user_vocab_progress_user_id ON user_vocabulary_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_user_vocab_progress_vocab_id ON user_vocabulary_progress(vocabulary_id);

ALTER TABLE user_vocabulary_progress ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can read own vocab progress" ON user_vocabulary_progress;
CREATE POLICY "Users can read own vocab progress" ON user_vocabulary_progress
    FOR SELECT
    TO authenticated
    USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own vocab progress" ON user_vocabulary_progress;
CREATE POLICY "Users can insert own vocab progress" ON user_vocabulary_progress
    FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own vocab progress" ON user_vocabulary_progress;
CREATE POLICY "Users can update own vocab progress" ON user_vocabulary_progress
    FOR UPDATE
    TO authenticated
    USING (auth.uid() = user_id);

DROP TRIGGER IF EXISTS update_user_vocab_progress_updated_at ON user_vocabulary_progress;
CREATE TRIGGER update_user_vocab_progress_updated_at BEFORE UPDATE ON user_vocabulary_progress
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

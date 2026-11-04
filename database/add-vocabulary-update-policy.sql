-- =====================================================
-- Migration: allow editing vocabulary words
-- Adds an UPDATE policy to the vocabulary table so authenticated
-- users can edit words from the "All Words" list.
-- Run this once in the Supabase SQL editor.
-- Without it, edits fail silently (RLS blocks the update).
-- =====================================================

DROP POLICY IF EXISTS "Authenticated users can update vocabulary" ON vocabulary;
CREATE POLICY "Authenticated users can update vocabulary" ON vocabulary
    FOR UPDATE
    TO authenticated
    USING (true)
    WITH CHECK (true);

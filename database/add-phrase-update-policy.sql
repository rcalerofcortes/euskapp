-- =====================================================
-- Migration: allow editing phrases
-- Adds an UPDATE policy to the phrases table so authenticated
-- users can edit phrases from the "All Phrases" list.
-- Run this once in the Supabase SQL editor.
-- Without it, edits fail silently (RLS blocks the update).
-- =====================================================

DROP POLICY IF EXISTS "Authenticated users can update phrases" ON phrases;
CREATE POLICY "Authenticated users can update phrases" ON phrases
    FOR UPDATE
    TO authenticated
    USING (true)
    WITH CHECK (true);

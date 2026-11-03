-- =====================================================
-- FIX: Confirmar todos los usuarios existentes
-- =====================================================
-- EJECUTA ESTO EN: Dashboard → SQL Editor → New query
-- Esto confirma TODOS los usuarios que estén en estado UNCONFIRMED

-- 1. Ver usuarios sin confirmar
SELECT 
    id,
    email,
    email_confirmed_at,
    created_at
FROM auth.users
WHERE email_confirmed_at IS NULL;

-- 2. Confirmar TODOS los usuarios (descomenta para ejecutar)
-- UPDATE auth.users
-- SET 
--     email_confirmed_at = NOW(),
--     confirmed_at = NOW()
-- WHERE email_confirmed_at IS NULL;

-- 3. Verificar que todos están confirmados
-- SELECT 
--     id,
--     email,
--     email_confirmed_at,
--     created_at
-- FROM auth.users;

-- =====================================================
-- NOTA IMPORTANTE:
-- =====================================================
-- Este script solo ARREGLA usuarios existentes.
-- Para que los NUEVOS usuarios se auto-confirmen,
-- necesitas encontrar la configuración en el Dashboard.
--
-- Busca en:
-- 1. Settings → Authentication → "User Signups"
-- 2. Authentication → Email Templates
-- 3. O busca "double confirmation" / "confirm email"

-- =====================================================
-- Insertar todas las frases en Supabase
-- =====================================================
-- EJECUTA ESTO EN: Dashboard → SQL Editor → New query
-- Esto subirá todas las 41 frases a tu base de datos

INSERT INTO phrases (id, euskera, castellano, euskera_alternatives, castellano_alternatives, note, created_at) VALUES
(1, 'Nola duzu izena?', 'Como te llamas?', NULL, NULL, NULL, NOW()),
(2, 'Nire izena Jon da', 'Mi nombre es Jon', NULL, NULL, NULL, NOW()),
(3, 'Non bizi zara?', 'Donde vives?', NULL, NULL, NULL, NOW()),
(4, 'Bilbon bizi naiz', 'Vivo en Bilbao', NULL, NULL, NULL, NOW()),
(5, 'Zer egiten duzu?', 'Que haces?', NULL, NULL, NULL, NOW()),
(6, 'Ez dut ezer', 'No tengo nada', NULL, NULL, NULL, NOW()),
(9, 'Atzo gauza asko egin zenituen', 'Ayer hiciste muchas cosas', NULL, NULL, NULL, NOW()),
(10, 'Non egon zarete gabonetan?', '¿Dónde habéis estado en navidades?', NULL, NULL, NULL, NOW()),
(11, 'Gabonetan herrian egon gara', 'En navidades hemos estado en el pueblo', NULL, NULL, NULL, NOW()),
(12, 'Gabonetan Biarritzen egon ginen', 'En navidades estuvimos en Biarritz', NULL, NULL, NULL, NOW()),
(13, 'Etxeko lanak egin zenitutzen?', '¿Hicistéis los deberes?', NULL, NULL, NULL, NOW()),
(14, 'Haiek lagunak dira', 'Ellos son los amigos', NULL, NULL, NULL, NOW()),
(15, 'Haiek lagunak ziren', 'Ellas eran amigas', NULL, NULL, NULL, NOW()),
(16, 'Zer duzu eskuetan?', '¿Qué tienes en las manos?', NULL, NULL, NULL, NOW()),
(17, 'Zer zenuen eskuetan?', '¿Qué tenías en las manos?', NULL, NULL, NULL, NOW()),
(18, 'Ezin naiz joan, berandu da', 'No puedo ir, es tarde', NULL, NULL, NULL, NOW()),
(19, 'Ezin dut egin', 'No puedo hacerlo', NULL, NULL, NULL, NOW()),
(20, 'Zergatik? Oso zaila delako?', '¿Por qué? ¿porque es muy difícil?', NULL, NULL, NULL, NOW()),
(21, 'Etorri ahal zara?', '¿Puedes venir?', NULL, NULL, NULL, NOW()),
(22, 'Ezin dugu ikasi liburuak ez ditugulako', 'No podemos estudiar porque no tenemos los libros', NULL, NULL, NULL, NOW()),
(23, 'Ezin dira angulak erosi, izugarri garestiak dira', 'No se pueden comprar angulas, son carísimas', NULL, NULL, NULL, NOW()),
(24, 'Zergatik ezin da etorri Maren? Gaixorik dagoelako?', '¿Por qué no puede venir Maren? ¿Porque está enferma?', NULL, NULL, NULL, NOW()),
(25, 'Ez, bere herrian dagoelako', 'No, porque está en su pueblo', NULL, NULL, NULL, NOW()),
(27, 'Ezin dugu partiduan gaudelako', 'No podemos porque estamos en el partido', NULL, NULL, NULL, NOW()),
(29, 'Idaztea gustatzen zait', 'Me gusta escribir', NULL, NULL, NULL, NOW()),
(30, 'Emaidazu zure ipurdi polita', 'Dame tu culo bonito', NULL, NULL, NULL, NOW()),
(31, 'Jesukristoren eguna izan dut', 'He tenido un día de la ostia', NULL, NULL, NULL, NOW()),
(33, 'Kirola egiteko denbora behar da', 'Para hacer deporte se necesita tiempo', NULL, NULL, NULL, NOW()),
(34, 'Mendira joatea gustatzen zaigu', 'Nos gusta ir al monte', NULL, NULL, NULL, NOW()),
(36, 'Etxeko lanak egiten argiago geratu zait', 'Haciendo los deberes me ha quedado más claro', NULL, NULL, NULL, NOW()),
(37, 'Zer gertatzen da?', '¿Qué pasa?', NULL, NULL, NULL, NOW()),
(41, 'Astelehenetan eta asteazkenetan euskaltegira joaten naiz', 'Los lunes y los miércoles voy al euskaltegi', NULL, NULL, NULL, NOW())
ON CONFLICT (id) DO NOTHING;

-- Frases con alternativas en euskera
INSERT INTO phrases (id, euskera, castellano, euskera_alternatives, castellano_alternatives, note, created_at) VALUES
(8, 'Gaur gauza asko egin dituzu', 'Hoy has hecho muchas cosas', '["Gaur gauza asko egin duzu"]', NULL, '"duzu" es válido porque tenemos "asko" (mugagabe)', NOW()),
(26, 'Ezin duzue afaria erosi da edo zer?', '¿Vosotros no podéis comprar la cena o qué?', '["Ezin duzue afaria erosi da ala?"]', NULL, NULL, NOW()),
(28, 'Irakurtzea gustatzen zaizu?', '¿Te gusta leer?', '["gustatzen zaizu irakurtzea?"]', NULL, NULL, NOW()),
(32, 'Irakurtzeko denbora behar duzu', 'Para leer necesitas tiempo', '["Denbora behar duzu irakurtzeko"]', NULL, NULL, NOW()),
(35, 'Mikel laguntza eskatzeko etorri zait', 'Me ha venido Mikel para pedir ayuda', '["Mikel etorri naiz laguntza eskatzeko"]', NULL, NULL, NOW()),
(38, 'Zer gertatu da?', '¿Qué ha pasado?', '["Zer pasatu da?"]', NULL, NULL, NOW()),
(39, 'Zer gertatuko da?', '¿Qué pasará?', '["Zer pasatuko da?"]', NULL, NULL, NOW()),
(40, 'Entzuten ari naiz, entzutea gustatzen zait', 'Estoy escuchando, me gusta escuchar', '["Entzuten ari nago, entzutea gustatzen zait"]', NULL, NULL, NOW())
ON CONFLICT (id) DO NOTHING;

-- Mensaje de confirmación
SELECT 'Frases insertadas correctamente!' as message, COUNT(*) as total FROM phrases;

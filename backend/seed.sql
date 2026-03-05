-- OceanView Reservation System — Dummy Data Seed Script
-- Run: psql -U postgres -d ocean_view_db -f seed.sql
-- ─────────────────────────────────────────────────────

-- ── Users ─────────────────────────────────────────────────────────────────────
-- Passwords are BCrypt hashes:
--   admin123  → $2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iAt6YHTK
--   alice123  → same pattern, generated below
-- Using pre-computed BCrypt(10) hashes for each password

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'users_username_key'
      AND conrelid = 'users'::regclass
  ) THEN
    ALTER TABLE users ADD CONSTRAINT users_username_key UNIQUE (username);
  END IF;
END$$;

INSERT INTO users (username, password, full_name, email, phone_number) VALUES
  ('admin', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.', 'Admin User',    'admin@oceanview.com',  '+1234567890'),
  ('alice', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.', 'Alice Johnson', 'alice@example.com',    '+1987654321'),
  ('bob',   '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.', 'Bob Smith',     'bob@example.com',      '+1122334455'),
  ('carol', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.', 'Carol White',   'carol@example.com',    '+1555666777'),
  ('david', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.', 'David Brown',   'david@example.com',    '+1444333222')
ON CONFLICT (username) DO NOTHING;

-- ── User Roles ────────────────────────────────────────────────────────────────
INSERT INTO user_roles (user_id, roles)
SELECT id, 'ROLE_USER' FROM users
WHERE username IN ('admin','alice','bob','carol','david')
  AND id NOT IN (SELECT user_id FROM user_roles WHERE roles = 'ROLE_USER');

INSERT INTO user_roles (user_id, roles)
SELECT id, 'ROLE_ADMIN' FROM users
WHERE username = 'admin'
  AND id NOT IN (SELECT user_id FROM user_roles WHERE roles = 'ROLE_ADMIN');

-- ── Rooms ─────────────────────────────────────────────────────────────────────
INSERT INTO rooms (room_number, room_type, description, image_url, floor, max_occupancy, price_per_night, available) VALUES
  ('101', 'SINGLE',    'Cozy single room with a garden view. Perfect for solo travelers seeking comfort and peace.',                                          'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800', 1, 1,  80.00, true),
  ('102', 'SINGLE',    'Bright single room with a pool-view balcony. Ideal for business travelers.',                                                          'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800', 1, 1,  80.00, true),
  ('201', 'DOUBLE',    'Spacious double room with a king-size bed and city view. Great for couples.',                                                         'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800', 2, 2, 120.00, true),
  ('202', 'DOUBLE',    'Modern double room with two queen beds and a private terrace.',                                                                       'https://images.unsplash.com/photo-1505693314120-0d443867891c?w=800', 2, 2, 120.00, false),
  ('301', 'SUITE',     'Elegant suite with a separate living area and ocean-view jacuzzi. An unforgettable experience.',                                      'https://images.unsplash.com/photo-1591088398332-8596b4524e8a?w=800', 3, 2, 200.00, true),
  ('302', 'SUITE',     'Luxury suite with a panoramic sea view, plush furnishings, and gourmet mini-bar.',                                                   'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800', 3, 2, 200.00, true),
  ('401', 'DELUXE',    'Deluxe king room with a full ocean view, premium bedding, and a private butler service.',                                            'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800', 4, 3, 300.00, true),
  ('402', 'DELUXE',    'Stunning deluxe room with a wrap-around balcony, rainfall shower, and sunset views.',                                                'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800', 4, 3, 300.00, true),
  ('501', 'PENTHOUSE', 'The crown jewel of OceanView — a full-floor penthouse with a private pool, chef''s kitchen, and 360° ocean panorama.',               'https://images.unsplash.com/photo-1631049552057-403cdb8f0658?w=800', 5, 4, 500.00, true),
  ('502', 'PENTHOUSE', 'Exclusive penthouse with a rooftop terrace, private cinema, and concierge access 24/7.',                                             'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800', 5, 4, 500.00, false)
ON CONFLICT (room_number) DO NOTHING;

-- ── Reservations ──────────────────────────────────────────────────────────────
INSERT INTO reservations (reservation_number, user_id, room_id, guest_name, guest_address, contact_number, check_in_date, check_out_date, total_cost, status, created_at)
SELECT
  gen_random_uuid(),
  (SELECT id FROM users WHERE username = 'alice'),
  (SELECT id FROM rooms WHERE room_number = '201'),
  'Alice Johnson', '45 Maple Street, New York, NY 10001', '+1987654321',
  '2026-01-10', '2026-01-15', 600.00, 'CHECKED_OUT', NOW()
WHERE NOT EXISTS (SELECT 1 FROM reservations WHERE guest_name = 'Alice Johnson' AND check_in_date = '2026-01-10');

INSERT INTO reservations (reservation_number, user_id, room_id, guest_name, guest_address, contact_number, check_in_date, check_out_date, total_cost, status, created_at)
SELECT
  gen_random_uuid(),
  (SELECT id FROM users WHERE username = 'bob'),
  (SELECT id FROM rooms WHERE room_number = '301'),
  'Bob Smith', '12 Oak Avenue, Los Angeles, CA 90001', '+1122334455',
  '2026-01-20', '2026-01-25', 1000.00, 'CHECKED_OUT', NOW()
WHERE NOT EXISTS (SELECT 1 FROM reservations WHERE guest_name = 'Bob Smith' AND check_in_date = '2026-01-20');

INSERT INTO reservations (reservation_number, user_id, room_id, guest_name, guest_address, contact_number, check_in_date, check_out_date, total_cost, status, created_at)
SELECT
  gen_random_uuid(),
  (SELECT id FROM users WHERE username = 'carol'),
  (SELECT id FROM rooms WHERE room_number = '101'),
  'Carol White', '88 Pine Road, Chicago, IL 60601', '+1555666777',
  '2026-02-05', '2026-02-08', 240.00, 'CANCELLED', NOW()
WHERE NOT EXISTS (SELECT 1 FROM reservations WHERE guest_name = 'Carol White' AND check_in_date = '2026-02-05');

INSERT INTO reservations (reservation_number, user_id, room_id, guest_name, guest_address, contact_number, check_in_date, check_out_date, total_cost, status, created_at)
SELECT
  gen_random_uuid(),
  (SELECT id FROM users WHERE username = 'alice'),
  (SELECT id FROM rooms WHERE room_number = '401'),
  'Alice Johnson', '45 Maple Street, New York, NY 10001', '+1987654321',
  '2026-02-28', '2026-03-05', 1800.00, 'CONFIRMED', NOW()
WHERE NOT EXISTS (SELECT 1 FROM reservations WHERE guest_name = 'Alice Johnson' AND check_in_date = '2026-02-28');

INSERT INTO reservations (reservation_number, user_id, room_id, guest_name, guest_address, contact_number, check_in_date, check_out_date, total_cost, status, created_at)
SELECT
  gen_random_uuid(),
  (SELECT id FROM users WHERE username = 'david'),
  (SELECT id FROM rooms WHERE room_number = '502'),
  'David Brown', '3 Birch Lane, Miami, FL 33101', '+1444333222',
  '2026-02-27', '2026-03-03', 2000.00, 'CONFIRMED', NOW()
WHERE NOT EXISTS (SELECT 1 FROM reservations WHERE guest_name = 'David Brown' AND check_in_date = '2026-02-27');

INSERT INTO reservations (reservation_number, user_id, room_id, guest_name, guest_address, contact_number, check_in_date, check_out_date, total_cost, status, created_at)
SELECT
  gen_random_uuid(),
  (SELECT id FROM users WHERE username = 'bob'),
  (SELECT id FROM rooms WHERE room_number = '202'),
  'Bob Smith', '12 Oak Avenue, Los Angeles, CA 90001', '+1122334455',
  '2026-03-10', '2026-03-14', 480.00, 'PENDING', NOW()
WHERE NOT EXISTS (SELECT 1 FROM reservations WHERE guest_name = 'Bob Smith' AND check_in_date = '2026-03-10');

INSERT INTO reservations (reservation_number, user_id, room_id, guest_name, guest_address, contact_number, check_in_date, check_out_date, total_cost, status, created_at)
SELECT
  gen_random_uuid(),
  (SELECT id FROM users WHERE username = 'carol'),
  (SELECT id FROM rooms WHERE room_number = '302'),
  'Carol White', '88 Pine Road, Chicago, IL 60601', '+1555666777',
  '2026-03-15', '2026-03-20', 1000.00, 'PENDING', NOW()
WHERE NOT EXISTS (SELECT 1 FROM reservations WHERE guest_name = 'Carol White' AND check_in_date = '2026-03-15');

INSERT INTO reservations (reservation_number, user_id, room_id, guest_name, guest_address, contact_number, check_in_date, check_out_date, total_cost, status, created_at)
SELECT
  gen_random_uuid(),
  (SELECT id FROM users WHERE username = 'david'),
  (SELECT id FROM rooms WHERE room_number = '402'),
  'David Brown', '3 Birch Lane, Miami, FL 33101', '+1444333222',
  '2026-04-01', '2026-04-05', 1200.00, 'PENDING', NOW()
WHERE NOT EXISTS (SELECT 1 FROM reservations WHERE guest_name = 'David Brown' AND check_in_date = '2026-04-01');

-- ── Verify ────────────────────────────────────────────────────────────────────
SELECT 'users'        AS table_name, COUNT(*) AS rows FROM users
UNION ALL
SELECT 'user_roles',                 COUNT(*)         FROM user_roles
UNION ALL
SELECT 'rooms',                      COUNT(*)         FROM rooms
UNION ALL
SELECT 'reservations',               COUNT(*)         FROM reservations;

select * from reservations;


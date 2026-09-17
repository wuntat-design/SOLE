-- ==============================================================================
-- Database Schema for BBGTK Jawa Tengah - SOLE Educorner (PHP & MySQL / MariaDB)
-- Website Platform: Smart Online Learning & Educorner
-- Standard: utf8mb4_unicode_ci
-- ==============================================================================

CREATE DATABASE IF NOT EXISTS `db_sole_bbgtk` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `db_sole_bbgtk`;

-- ------------------------------------------------------------------------------
-- 1. Table: users (Manajemen Pengguna & Peran Hak Akses)
-- ------------------------------------------------------------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `full_name` VARCHAR(150) NOT NULL,
  `email` VARCHAR(150) NOT NULL UNIQUE,
  `password_hash` VARCHAR(255) NOT NULL,
  `role` ENUM('user', 'moderator', 'admin', 'superadmin') NOT NULL DEFAULT 'user',
  `nip` VARCHAR(30) DEFAULT NULL,
  `agency` VARCHAR(150) DEFAULT NULL COMMENT 'Instansi/Sekolah Tempat Tugas',
  `city` VARCHAR(100) DEFAULT NULL COMMENT 'Kabupaten/Kota',
  `avatar_url` TEXT DEFAULT NULL,
  `status` ENUM('active', 'inactive', 'suspended') NOT NULL DEFAULT 'active',
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_user_email` (`email`),
  INDEX `idx_user_role` (`role`),
  INDEX `idx_user_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Seed Data Users (Super Admin, Moderator, User)
INSERT INTO `users` (`id`, `full_name`, `email`, `password_hash`, `role`, `nip`, `agency`, `city`, `avatar_url`, `status`) VALUES
(1, 'Budi Hartono, S.Pd.', 'budi.h@edu.jateng.go.id', '$2y$10$e8w.x7W3G7T3N4A5B6C7D8E9F0G1H2I3J4K5L6M7N8O9P0Q1R2S3T', 'superadmin', '198501152010011001', 'SMAN 1 Semarang', 'Kota Semarang', 'https://lh3.googleusercontent.com/aida-public/AB6AXuC-8xpplCSu57mY2vHJ97ASVWoeuqps0qQWLj2bArLxQM499bqv0_hE2Dlnhxg1YYwNn4OQcyDd5d8X21bRQC3Ok8TcM47hmdJjpSG9WBo3ZPt7ylfU3pQwW3eVlVfI-Rm5bdmlDb0OrhSbaz4wRfY6Iio9wNuz7JkIilhn0Vl3FkznpHECxWa9R62F7UsCRp1Pl8Hvw4itNDyPBy4zaZLf0CJ7lTZnJyQtJ8jjVT_-XcQ0wUNFmo68p8osvnneyx50h8iYmBJN_dcB', 'active'),
(2, 'Siti Aminah, M.Pd.', 'siti.aminah@edu.jateng.go.id', '$2y$10$e8w.x7W3G7T3N4A5B6C7D8E9F0G1H2I3J4K5L6M7N8O9P0Q1R2S3T', 'moderator', '198804122014022003', 'SMPN 3 Solo', 'Surakarta', 'https://lh3.googleusercontent.com/aida-public/AB6AXuDfb2Jdeu8e8ePIMvJ9B2riLgwTF_tf031ptGYeHdIBjSSEHawnQowpkro0wfYAtR62L6cP4B-R7u2ehEnc0-eQi-TJkL_KajDi0Y8JhtSxCE9EKM-Wz8a6V2MvTJwPQDJxxcUh7WGI6H8ds9cDKxcow1U2N2MOvowR8Cd-h6tI7XFE3ZOg0ZkEurpXak9vF5-pNzYnMci0gZgYoqSX4jSbBSBruwknlRjCVGBhU-rT0jw0eq-Ge0iG8Aqb0PWH8Xk6KMT-130eSkLF', 'active'),
(3, 'Eko Prasetyo, S.Kom.', 'eko_p@edu.jateng.go.id', '$2y$10$e8w.x7W3G7T3N4A5B6C7D8E9F0G1H2I3J4K5L6M7N8O9P0Q1R2S3T', 'user', '199208202019031005', 'SMKN 1 Magelang', 'Magelang', 'https://lh3.googleusercontent.com/aida-public/AB6AXuAqBxMF01Vk9If6-0K_UYKbmdu4JoUKQAyYPIKzuI4tyM1jQJfPTNVxdD9ec7Syya-DRs81PhQw0Os1572pH6ozUIy-6quHvtQrL1dR3TiF-2Du0dBNDKBzIbFmwc0i3DLZrB2rNmlwRxW6KSde1ANZvg3l6z3jFPhaDrKdzcb8tbzv0hchFqOZAyaG2sXZOFSYUVLTbB72zkY0Zwf5H7IqWVGA8hb8mde98AHzeI7shn1WPzAl_2QQ-_LNPsl8yWwTlpLqZ0sJRTr0', 'active'),
(4, 'Dewi Anggraeni, S.Pd.', 'dewi.ang@edu.jateng.go.id', '$2y$10$e8w.x7W3G7T3N4A5B6C7D8E9F0G1H2I3J4K5L6M7N8O9P0Q1R2S3T', 'user', '199503102022012008', 'SDN 02 Brebes', 'Brebes', 'https://lh3.googleusercontent.com/aida-public/AB6AXuCyvDKF2YIgGuBJ4XZF5J3_wnuaL5GM3pNyXu27NeB39cS-WcLncyiJc5sR2Wy7TBXbvt12Km6hwa71A0El4j1-ud0PMGvYv3Zt_ctn7ThSHMLV9ML7WHicq48ssIlk_Up1Re3gljOlG5U2zh2u_Hh_lsOJPTcmu3x_nchSWdlATez2FTLjeO5iSDCXFdkkycbCya7BX2SRXAf1jl3PKk1v0SPnfrT1i3kuSX9bwtSZ_5_J0jp1c1OSoabN1dHYNo2hSbvGMyIksmlu', 'active');


-- ------------------------------------------------------------------------------
-- 2. Table: categories (Kategori Materi & Praktik Baik)
-- ------------------------------------------------------------------------------
DROP TABLE IF EXISTS `categories`;
CREATE TABLE `categories` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(100) NOT NULL,
  `slug` VARCHAR(100) NOT NULL UNIQUE,
  `description` VARCHAR(255) DEFAULT NULL,
  `type` ENUM('webinar', 'best_practice', 'course', 'general') NOT NULL DEFAULT 'general',
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `categories` (`id`, `name`, `slug`, `description`, `type`) VALUES
(1, 'Kurikulum Merdeka', 'kurikulum-merdeka', 'Pembahasan implementasi dan asesmen Kurikulum Merdeka', 'general'),
(2, 'Digital Learning', 'digital-learning', 'Pemanfaatan media dan alat bantu digital dalam pembelajaran', 'general'),
(3, 'Pedagogi & Metodologi', 'pedagogi', 'Model pembelajaran inovatif dan manajemen kelas', 'general'),
(4, 'Literasi & Numerasi', 'literasi-numerasi', 'Penguatan minat baca, nalar sains, dan numerasi siswa', 'general'),
(5, 'Kepemimpinan Pembelajaran', 'kepemimpinan', 'Praktik manajerial untuk kepala sekolah dan pengawas', 'general');


-- ------------------------------------------------------------------------------
-- 3. Table: webinars (Katalog Video Webinar BBGTK)
-- ------------------------------------------------------------------------------
DROP TABLE IF EXISTS `webinars`;
CREATE TABLE `webinars` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `youtube_id` VARCHAR(50) NOT NULL UNIQUE,
  `title` VARCHAR(255) NOT NULL,
  `description` TEXT DEFAULT NULL,
  `category_id` INT UNSIGNED DEFAULT NULL,
  `published_date` DATE NOT NULL,
  `duration_minutes` INT UNSIGNED DEFAULT 60,
  `thumbnail_url` VARCHAR(255) DEFAULT NULL,
  `is_synced_rss` TINYINT(1) NOT NULL DEFAULT 1,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE SET NULL,
  INDEX `idx_youtube_id` (`youtube_id`),
  INDEX `idx_published_date` (`published_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `webinars` (`id`, `youtube_id`, `title`, `description`, `category_id`, `published_date`, `thumbnail_url`) VALUES
(1, '9PlwkttZkt0', 'SEKAMPADI "YUK BEDAH MISKONSEPSI ASESMEN"', 'Webinar bedah miskonsepsi asesmen pembelajaran Kurikulum Merdeka bagi Pendidik.', 1, '2026-08-30', 'https://img.youtube.com/vi/9PlwkttZkt0/maxresdefault.jpg'),
(2, 'Z2UtJTS-5J0', 'Sosialisasi Pengisian Instrumen Pemetaan Mutu Pendidikan', 'Panduan teknis pengisian instrumen pemetaan mutu pendidikan di Provinsi Jawa Tengah.', 5, '2026-08-29', 'https://img.youtube.com/vi/Z2UtJTS-5J0/maxresdefault.jpg'),
(3, '-JQB3p66r4o', 'Bagaimana Mengintegrasikan AI dalam Pembelajaran', 'Pemanfaatan Artificial Intelligence secara etis dan produktif untuk guru.', 2, '2026-08-28', 'https://img.youtube.com/vi/-JQB3p66r4o/maxresdefault.jpg'),
(4, 'dgpI6QR8gQQ', 'Menjadi Pembelajar Kritis Kreatif dengan Flipped Classroom', 'Penerapan metode Flipped Classroom untuk mengasah pemikiran kritis siswa.', 3, '2026-08-27', 'https://img.youtube.com/vi/dgpI6QR8gQQ/maxresdefault.jpg'),
(5, 'uXWycteA74I', 'E-Learning for Interdisciplinary Studies', 'Desain modul pembelajaran interdisipliner berbasis proyek digital.', 2, '2026-08-26', 'https://img.youtube.com/vi/uXWycteA74I/maxresdefault.jpg');


-- ------------------------------------------------------------------------------
-- 4. Table: best_practices (Galeri & Dokumentasi Praktik Baik Pendidik)
-- ------------------------------------------------------------------------------
DROP TABLE IF EXISTS `best_practices`;
CREATE TABLE `best_practices` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `user_id` INT UNSIGNED NOT NULL,
  `webinar_id` INT UNSIGNED DEFAULT NULL COMMENT 'Video rujukan jika berasal dari webinar',
  `title` VARCHAR(255) NOT NULL,
  `content` LONGTEXT NOT NULL COMMENT 'Deskripsi detail / Markdown praktik baik',
  `category_id` INT UNSIGNED DEFAULT NULL,
  `target_level` ENUM('PAUD', 'SD/MI', 'SMP/MTs', 'SMA/MA/SMK', 'SLB', 'Umum') NOT NULL DEFAULT 'Umum',
  `duration_display` VARCHAR(20) DEFAULT '10:00',
  `thumbnail_url` VARCHAR(255) DEFAULT NULL,
  `status` ENUM('draft', 'published', 'rejected', 'archived') NOT NULL DEFAULT 'published',
  `is_verified` TINYINT(1) NOT NULL DEFAULT 1 COMMENT 'Status Moderasi Tim BBGTK',
  `verified_by` INT UNSIGNED DEFAULT NULL,
  `view_count` INT UNSIGNED NOT NULL DEFAULT 0,
  `likes_count` INT UNSIGNED NOT NULL DEFAULT 0,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  FOREIGN KEY (`webinar_id`) REFERENCES `webinars` (`id`) ON DELETE SET NULL,
  FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE SET NULL,
  FOREIGN KEY (`verified_by`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  INDEX `idx_bp_user` (`user_id`),
  INDEX `idx_bp_status` (`status`),
  INDEX `idx_bp_verified` (`is_verified`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `best_practices` (`id`, `user_id`, `webinar_id`, `title`, `content`, `category_id`, `target_level`, `duration_display`, `thumbnail_url`, `is_verified`, `likes_count`) VALUES
(1, 2, 1, 'Implementasi Project-Based Learning pada Mata Pelajaran IPA Kelas 5', 'Pembelajaran berbasis proyek memanfaatkan lingkungan sekitar sekolah untuk mengamati ekosistem lokal...', 1, 'SD/MI', '12:45', 'https://img.youtube.com/vi/9PlwkttZkt0/maxresdefault.jpg', 1, 24),
(2, 3, 3, 'Pemanfataan Gamifikasi Quizizz untuk Meningkatkan Motivasi Belajar Matematika', 'Menggunakan kuis interaktif dengan umpan balik langsung saat pembelajaran matematika di kelas...', 2, 'SMP/MTs', '08:30', 'https://img.youtube.com/vi/Z2UtJTS-5J0/maxresdefault.jpg', 1, 18),
(3, 4, 4, 'Pojok Baca Kreatif: Upaya Menumbuhkan Minat Baca Anak Sejak Dini', 'Membuat sudut baca tematik dengan keterlibatan orang tua murid untuk menguatkan budaya literasi...', 4, 'SD/MI', '10:15', 'https://img.youtube.com/vi/dgpI6QR8gQQ/maxresdefault.jpg', 1, 31);


-- ------------------------------------------------------------------------------
-- 5. Table: best_practice_comments (Komentar & Diskusi Praktik Baik)
-- ------------------------------------------------------------------------------
DROP TABLE IF EXISTS `best_practice_comments`;
CREATE TABLE `best_practice_comments` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `best_practice_id` INT UNSIGNED NOT NULL,
  `user_id` INT UNSIGNED NOT NULL,
  `comment_text` TEXT NOT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`best_practice_id`) REFERENCES `best_practices` (`id`) ON DELETE CASCADE,
  FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  INDEX `idx_comment_bp` (`best_practice_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `best_practice_comments` (`best_practice_id`, `user_id`, `comment_text`) VALUES
(1, 3, 'Sangat menginspirasi Ibu Siti Aminah! Boleh minta draf lembar kerja siswanya?'),
(1, 4, 'Luar biasa, penerapannya sangat relevan dengan Kurikulum Merdeka.');


-- ------------------------------------------------------------------------------
-- 6. Table: video_custom_segments (Segmentasi Kustom Video Pilihan Pengguna)
-- ------------------------------------------------------------------------------
DROP TABLE IF EXISTS `video_custom_segments`;
CREATE TABLE `video_custom_segments` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `user_id` INT UNSIGNED NOT NULL,
  `webinar_id` INT UNSIGNED NOT NULL,
  `title` VARCHAR(200) NOT NULL,
  `start_minutes` INT UNSIGNED NOT NULL DEFAULT 0,
  `end_minutes` INT UNSIGNED NOT NULL DEFAULT 10,
  `summary` TEXT DEFAULT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  FOREIGN KEY (`webinar_id`) REFERENCES `webinars` (`id`) ON DELETE CASCADE,
  INDEX `idx_seg_user_webinar` (`user_id`, `webinar_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `video_custom_segments` (`id`, `user_id`, `webinar_id`, `title`, `start_minutes`, `end_minutes`, `summary`) VALUES
(1, 1, 1, 'Pembukaan & Pengantar Miskonsepsi Asesmen', 0, 12, 'Sesi pembuka oleh narasumber utama mengenai definisi asesmen formatif vs sumatif.'),
(2, 1, 1, 'Studi Kasus Asesmen Formatif di Kelas', 12, 28, 'Contoh penerapan rubrik asesmen mandiri oleh siswa SD.');


-- ------------------------------------------------------------------------------
-- 7. Table: user_segment_notes (Catatan Ringkasan Pembelajaran Pengguna)
-- ------------------------------------------------------------------------------
DROP TABLE IF EXISTS `user_segment_notes`;
CREATE TABLE `user_segment_notes` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `user_id` INT UNSIGNED NOT NULL,
  `webinar_id` INT UNSIGNED NOT NULL,
  `chunk_identifier` VARCHAR(100) NOT NULL COMMENT 'Index chunk otomatis atau ID segment kustom',
  `notes` TEXT NOT NULL,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  FOREIGN KEY (`webinar_id`) REFERENCES `webinars` (`id`) ON DELETE CASCADE,
  UNIQUE KEY `uk_user_webinar_chunk` (`user_id`, `webinar_id`, `chunk_identifier`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- ------------------------------------------------------------------------------
-- 8. Table: courses (Pelatihan / Course 32 JP)
-- ------------------------------------------------------------------------------
DROP TABLE IF EXISTS `courses`;
CREATE TABLE `courses` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `code` VARCHAR(50) NOT NULL UNIQUE,
  `title` VARCHAR(200) NOT NULL,
  `description` TEXT DEFAULT NULL,
  `total_hours` INT UNSIGNED NOT NULL DEFAULT 32,
  `status` ENUM('active', 'inactive') NOT NULL DEFAULT 'inactive' COMMENT 'Dikontrol Admin/SuperAdmin',
  `thumbnail_url` VARCHAR(255) DEFAULT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `courses` (`id`, `code`, `title`, `description`, `total_hours`, `status`) VALUES
(1, 'COURSE-32JP-01', 'Peningkatan Kompetensi Digital Pendidik Jawa Tengah (32 JP)', 'Program pelatihan terstruktur 32 JP mencakup perancangan media pembelajaran interaktif.', 32, 'inactive');


-- ------------------------------------------------------------------------------
-- 9. Table: lrs_xapi_statements (Learning Record Store Analytics Standard ADL xAPI v1.0.3)
-- ------------------------------------------------------------------------------
DROP TABLE IF EXISTS `lrs_xapi_statements`;
CREATE TABLE `lrs_xapi_statements` (
  `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `statement_uuid` VARCHAR(64) NOT NULL UNIQUE,
  `actor_name` VARCHAR(150) NOT NULL,
  `actor_email` VARCHAR(150) NOT NULL,
  `verb_id` VARCHAR(255) NOT NULL COMMENT 'URI Standard Verb e.g. https://w3id.org/xapi/video/verbs/watched',
  `verb_display` VARCHAR(100) NOT NULL COMMENT 'Label Verb e.g. menonton video',
  `object_id` VARCHAR(255) NOT NULL COMMENT 'Activity URI e.g. https://sole.id/webinar/1',
  `object_name` VARCHAR(255) NOT NULL,
  `context_platform` VARCHAR(100) DEFAULT 'BBGTK SOLE Educorner',
  `result_completion` TINYINT(1) DEFAULT NULL,
  `result_success` TINYINT(1) DEFAULT NULL,
  `raw_statement_json` LONGTEXT NOT NULL COMMENT 'Payload lengkap JSON xAPI Statement',
  `timestamp` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX `idx_lrs_uuid` (`statement_uuid`),
  INDEX `idx_lrs_actor_email` (`actor_email`),
  INDEX `idx_lrs_verb` (`verb_id`),
  INDEX `idx_lrs_timestamp` (`timestamp`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `lrs_xapi_statements` (`statement_uuid`, `actor_name`, `actor_email`, `verb_id`, `verb_display`, `object_id`, `object_name`, `result_completion`, `raw_statement_json`, `timestamp`) VALUES
('e28a914b-57f1-4a11-b842-178831901001', 'Budi Hartono, S.Pd.', 'budi.hartono@guru.sd.belajar.id', 'https://w3id.org/xapi/video/verbs/watched', 'menonton video', 'https://sole.id/webinar/1', 'Sekampadi PJOK: Optimalisasi Asesmen Pembelajaran', 1, '{"id":"e28a914b-57f1-4a11-b842-178831901001","actor":{"name":"Budi Hartono, S.Pd."}}', NOW()),
('c49b821a-12d4-4f99-a931-178831901002', 'Siti Aminah, M.Pd.', 'siti.aminah@guru.smp.belajar.id', 'http://adlnet.gov/expapi/verbs/submitted', 'mengirimkan praktik baik', 'https://sole.id/best-practice/201', 'Implementasi Project-Based Learning IPA', 1, '{"id":"c49b821a-12d4-4f99-a931-178831901002","actor":{"name":"Siti Aminah, M.Pd."}}', NOW());


-- ------------------------------------------------------------------------------
-- 10. Table: audit_logs (Riwayat Aktivitas & Sesi Login Pengguna)
-- ------------------------------------------------------------------------------
DROP TABLE IF EXISTS `audit_logs`;
CREATE TABLE `audit_logs` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `user_id` INT UNSIGNED DEFAULT NULL,
  `user_name` VARCHAR(150) NOT NULL,
  `user_role` VARCHAR(50) NOT NULL,
  `action` VARCHAR(100) NOT NULL DEFAULT 'LOGIN',
  `ip_address` VARCHAR(45) DEFAULT NULL,
  `user_agent` VARCHAR(255) DEFAULT NULL,
  `login_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `logout_time` DATETIME DEFAULT NULL,
  FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  INDEX `idx_audit_user` (`user_id`),
  INDEX `idx_audit_login_time` (`login_time`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `audit_logs` (`user_id`, `user_name`, `user_role`, `action`, `login_time`) VALUES
(1, 'Budi Hartono, S.Pd.', 'superadmin', 'LOGIN', NOW()),
(2, 'Siti Aminah, M.Pd.', 'moderator', 'LOGIN', NOW());

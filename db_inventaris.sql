-- =====================================================
-- Database: db_inventaris
-- Sistem Manajemen Inventaris Barang (E-Inventory)
-- UAS Web 2 - Putri Melati Ramadhaniati - 312410194
-- =====================================================

CREATE DATABASE IF NOT EXISTS db_inventaris;
USE db_inventaris;

-- Tabel users (untuk login admin)
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('admin') DEFAULT 'admin',
  token VARCHAR(255) NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Tabel kategori
CREATE TABLE kategori (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nama_kategori VARCHAR(100) NOT NULL,
  deskripsi TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Tabel barang (relasi ke kategori)
CREATE TABLE barang (
  id INT AUTO_INCREMENT PRIMARY KEY,
  kategori_id INT NOT NULL,
  nama_barang VARCHAR(150) NOT NULL,
  stok INT DEFAULT 0,
  harga DECIMAL(12,2) DEFAULT 0,
  satuan VARCHAR(50),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (kategori_id) REFERENCES kategori(id) ON DELETE CASCADE
);

-- Tabel transaksi stok (histori masuk/keluar)
CREATE TABLE transaksi_stok (
  id INT AUTO_INCREMENT PRIMARY KEY,
  barang_id INT NOT NULL,
  user_id INT NOT NULL,
  jenis ENUM('masuk','keluar') NOT NULL,
  jumlah INT NOT NULL,
  keterangan TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (barang_id) REFERENCES barang(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- =====================================================
-- Data Dummy
-- =====================================================

-- User admin (password = "password")
INSERT INTO users (username, password, role) VALUES
('admin', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin');

-- Kategori
INSERT INTO kategori (nama_kategori, deskripsi) VALUES
('Elektronik', 'Perangkat elektronik dan aksesoris'),
('Alat Tulis', 'Perlengkapan kantor dan tulis menulis'),
('Furniture', 'Perabot kantor dan ruangan');

-- Barang
INSERT INTO barang (kategori_id, nama_barang, stok, harga, satuan) VALUES
(1, 'Laptop Lenovo', 10, 8500000, 'unit'),
(1, 'Mouse Wireless', 25, 150000, 'unit'),
(2, 'Ballpoint Pilot', 100, 5000, 'pcs'),
(3, 'Kursi Kantor', 15, 750000, 'unit');

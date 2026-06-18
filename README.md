# UAS_Web2_312410194_PutriMelatI
# E-Inventory - Sistem Manajemen Inventaris Barang

**Nama:** Putri Melati Ramadhaniati  
**NIM:** 312410194  
**Kelas:** I241B  
**Mata Kuliah:** Pemrograman Web 2  

---

## Deskripsi Proyek

Aplikasi E-Inventory adalah sistem manajemen inventaris barang berbasis web yang dibangun menggunakan arsitektur Decoupled (terpisah antara Backend dan Frontend). Aplikasi ini memungkinkan admin untuk mengelola data barang, kategori, dan stok secara efisien melalui antarmuka yang modern dan responsif.

---

## Teknologi yang Digunakan

- **Backend:** PHP Framework CodeIgniter 4 (RESTful API)
- **Frontend:** VueJS 3 (Single Page Application) via CDN
- **UI Framework:** TailwindCSS via CDN
- **Database:** MySQL / MariaDB
- **HTTP Client:** Axios
- **Router:** Vue Router 4

---

## Fitur Aplikasi

- Halaman beranda publik dengan ringkasan total data
- Sistem login admin dengan token autentikasi
- Dashboard admin dengan statistik data
- CRUD data barang (tambah, lihat, edit, hapus)
- CRUD data kategori (tambah, lihat, edit, hapus)
- Proteksi endpoint API dengan Bearer Token
- Navigation Guard (redirect ke login jika belum autentikasi)
- Axios Interceptor (otomatis sisipkan token & tangkap error 401)

---

## Struktur Database

Aplikasi menggunakan 4 tabel yang saling berelasi:

- `users` - data akun admin
- `kategori` - data kategori barang
- `barang` - data barang (relasi ke kategori)
- `transaksi_stok` - histori keluar masuk stok (relasi ke barang dan users)

> Screenshot skema relasi tabel (phpMyAdmin Designer) terlampir di bawah.

---

## Screenshot Aplikasi

### Skema Relasi Database
![Skema Database](screenshots/skema_database.png)

### Uji API Gagal (Error 401) via Postman
![Error 401](screenshots/error_401.png)

### Halaman Login
![Login](screenshots/login.png)

### Halaman Dashboard Admin
![Dashboard](screenshots/dashboard.png)

### Form Modal Tambah/Edit Data
![Modal](screenshots/modal.png)

### Halaman Data Barang
![Barang](screenshots/barang.png)

### Halaman Data Kategori
![Kategori](screenshots/kategori.png)

---

## Petunjuk Instalasi

### Kebutuhan Sistem
- XAMPP (PHP 8.1+, MySQL)
- Composer
- Browser modern

### Langkah Menjalankan Backend

1. Clone repository ini
2. Masuk ke folder `backend-api`
3. Copy file `env` menjadi `.env` lalu isi konfigurasi:

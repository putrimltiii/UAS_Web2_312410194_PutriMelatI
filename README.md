<img width="1456" height="819" alt="image" src="https://github.com/user-attachments/assets/3daf499a-dd8b-4cf2-8adf-f6d885a5d3c1" /># UAS_Web2_312410194_PutriMelatI
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
<img width="1456" height="819" alt="image" src="https://github.com/user-attachments/assets/ce82487e-d89a-441b-b598-af8c06eb375c" />


### Uji API Gagal (Error 401) via Postman
<img width="1456" height="819" alt="image" src="https://github.com/user-attachments/assets/b04ba6ad-cf71-4315-849f-15d1fe0c8851" />

### Halaman Login
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/35e5a51a-c76f-4539-9bb1-874aef67692c" />

### Halaman Dashboard Admin
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/b86eae71-860f-4a09-aa23-35ff67875c50" />

### Form Modal Tambah/Edit Data
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/d4d2cd58-cb02-411b-aece-4b3fe4d208fb" />

### Halaman Data Barang
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/256fd36a-963f-4e3a-98b3-917632dacf73" />

### Halaman Data Kategori
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/41297244-19c9-4783-9d51-29e23e2e8ba5" />

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

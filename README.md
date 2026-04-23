# PPWL 11/Monorepo - AWS Team 
[![PPWL 2026 Team 4 - 11](https://img.shields.io/badge/PPWL_2026_Team4-11-blue?style=for-the-badge&logo=github)](https://github.com/syidmen/ppwl-aws-team4)
[![Date](https://img.shields.io/badge/Date-23%20April%202026-blue?style=flat-square&logo=calendar-check)](https://github.com/syidmen/ppwl-aws-team4)

##  Kelas B / Tim 4

| Nama | NIM | Job |
|------|-----|-----|
| Muhammad Rasyid | H1101241049 | Admin |
| Syarifah Munibah Arifah Rajiyah | H1101241027 | Budget & Cost |
| Radika Trieza Aritonang | H1101241024 | RDS Database |
| Syafira Aulianisa | H1101241025 | Lambda Backend |
| Atikoh | H1101241056 | S3+CloudFront Frontend |
| Saskia Mecca Widyarni | H1101241038 | Test & Docs |

## Arsitektur Diagram AWS
> [Arsitektur Diagram AWS](https://canva.link/5shlv4ugb5yx9c1)

## 🐞 Report Bug
### 1. Looping Login pada Halaman `/classroom` (404 + 401 Unauthorized)
![Screenshot bug looping](https://drive.google.com/uc?export=view&id=11JYC4NNKC054HpHM_0qX8y5Ftro1fMSa)
**Pesan Bug/Error**  
- 404 Not Found pada path `/classroom` saat diakses langsung atau setelah redirect dari proses login Google.  
- 401 Unauthorized pada saat fetch ke `/auth/me` dan `/classroom/courses`.  
- Aplikasi terus melakukan looping kembali ke halaman login tanpa bisa masuk ke antarmuka Classroom.

**Lokasi Bug**  
- Fase 5 – Frontend. Aplikasi di-host melalui S3 static website endpoint **HTTP** (sebelum CloudFront aktif). Routing menggunakan `BrowserRouter` dari React Router yang memerlukan server untuk menangani rute dinamis, sementara S3 tidak memiliki kemampuan tersebut.

**Alur Sebelum Bug Didapatkan**  
1. Pengguna membuka rute `/classroom` melalui frontend yang diakses dari S3 HTTP.  
2. Karena tidak memiliki token atau token tidak valid, aplikasi mengarahkan ulang ke halaman login Google.  
3. Pengguna menyelesaikan proses login.  
4. Backend mengembalikan token JWT dan me‑redirect kembali ke `FRONTEND_URL/classroom`.  
5. Permintaan ke path `/classroom` di S3 menghasilkan **404 Not Found** karena tidak ada objek fisik dengan path tersebut.  
6. Akibatnya, halaman tidak dapat dimuat oleh React Router, verifikasi token gagal, dan pengguna kembali dialihkan ke login.  
7. Siklus ini berulang terus‑menerus (looping) tanpa bisa masuk ke antarmuka Classroom.

**Solusi yang Sudah Dicoba**  
1. Memperbaiki konfigurasi **CORS** di `src/lambda.ts` dan `src/index.ts` agar mengizinkan origin dari S3 HTTP.  
2. Memperbarui nilai parameter **`/monorepo/FRONTEND_URL`** di Parameter Store dengan URL HTTP S3 agar backend menerima origin tersebut.  
3. Menghubungi **AWS Support** untuk mempercepat proses verifikasi akun yang tertunda, sehingga distribusi CloudFront bisa segera dibuat.  

**Kendala Utama**  
Solusi permanen adalah mengaktifkan CloudFront dengan konfigurasi Custom Error Response (403/404 → `/index.html` → 200) agar SPA dapat menangani routing. Namun karena proses verifikasi akun AWS memakan waktu respons yang sangat panjang (hingga 2 minggu), CloudFront belum dapat segera digunakan.

### 2. Data Cost Explorer Tidak Tersedia (Menunggu 24 Jam)
![Data Cost Explorer belum siap](https://drive.google.com/uc?export=view&id=1H_MyJf4MkMLDnCpemOGfQhRQHtkhz--l)

**Pesan Bug/Error**  
- Ketika mengakses **Cost Explorer** di AWS Console untuk mengerjakan tugas laporan biaya, muncul notifikasi bahwa data biaya dan penggunaan belum siap. Sistem menyatakan perlu menunggu sekitar **±24 jam** sebelum data dapat ditampilkan. Akibatnya, pengerjaan tugas "Coverage Report" di Fase 2 tidak bisa langsung dilakukan.

**Lokasi Bug**  
- Fase 2 – Budget & Cost (Langkah ke‑2: Cost Explorer – Tugas Khusus). Tepatnya di: **AWS Console → Billing and Cost Management → Cost Explorer / Budget Setup**.

**Alur Sebelum Bug Didapatkan**  
1. Login ke AWS Console.  
2. Masuk ke menu **Billing & Cost Management**.  
3. Membuka **Cost Explorer** atau mencoba membuat laporan baru.  
4. Muncul pemberitahuan bahwa data biaya/enrollment belum lengkap.  
5. Sistem hanya menampilkan placeholder atau pesan bahwa data akan tersedia setelah 24 jam sejak resource pertama kali aktif.

**Solusi yang Sudah Dicoba**  
- Melakukan *refresh* halaman dan *logout‑login* ulang → tidak berhasil.  
- Mengakses dari browser/perangkat berbeda → hasil tetap sama.  

---

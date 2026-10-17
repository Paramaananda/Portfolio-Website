# Design review: Portofolio Paramaananda (web, Next.js)

Audit 17 Okt 2026 dengan skill `apple-design` (Apple Human Interface Guidelines).
Situs ini web app, jadi yang berlaku adalah prinsip dan fondasi HIG (aksesibilitas, warna,
tipografi, layout, motion, dark mode, branding), bukan konvensi native iOS/macOS seperti tab bar
atau menu bar.

Referensi yang dibaca: `accessibility.md`, `typography.md`, `color.md`, `layout.md`,
`dark-mode.md`, `motion.md`, `branding.md`.
Bahan: kode sumber, token di `src/app/globals.css`, halaman yang berjalan di localhost (desktop
dan 375 px). Rasio kontras dihitung dari nilai hex, bukan ditaksir dari screenshot.

## Status perbaikan (17 Okt 2026)

Sudah diterapkan:
- Kontras angka grup: sekarang `text-ink-3`.
- Teks hover Pendidikan: sekarang `text-night`, dan program `night/85` dengan kontras minimum 4.85:1.
- Label tools: 11 px, dengan grid 3 kolom di mobile.
- Tombol "Jeda animasi" untuk cover: komponen `motion-toggle.tsx`, menyetel `<html data-motion>`
  dan menyimpan pilihan di localStorage.

Putaran kedua (skill `ui-ux-pro-max` + `frontend-design`):
- Nomor seksi 01–05 dihapus, karena seksi bukan urutan langkah. Eyebrow sekarang hanya garis
  dan nama seksi.
- Animasi masuk dikurangi. Grid Toolkit dan daftar Track Record sekarang masing-masing satu reveal,
  bukan satu per kartu atau baris. Eyebrow tidak lagi beranimasi.
- Target sentuh pemilih bahasa: 44 px di mobile.
- Link navigasi desktop: 12 px.
- Mode kontras tinggi: `prefers-contrast: more` menggelapkan `ink-2`, `ink-3`, dan `line`.

Belum diubah (trade-off, menunggu keputusan pemilik):
- Toggle tema khusus aplikasi.
- Hover oranye pada kartu Pendidikan yang tidak bisa diklik.
- Temuan Low.

## Summary

Rating: **Good**. Tidak ada temuan Critical. Yang paling perlu diperbaiki: dua teks kecil yang
kontrasnya di bawah 4.5:1, dan label nama tools yang di bawah ukuran minimum di mobile.

Tesis desain: portofolio yang dibuka dan ditutup oleh panel "ember" oranye dengan satu kata
display raksasa ("BUILD"). Itulah hal yang akan diingat orang. Di antara kedua panel, halaman
sengaja tenang (monokrom, Geist, kartu abu-abu).

## Improvements

### High: angka hitungan grup terlalu pudar
- **What**: angka "02" dan "08" di samping "Pengalaman kerja" dan "Organisasi" memakai
  `text-ink-3/70` pada teks 11 px. Kontrasnya 2.91:1 di mode terang dan 3.56:1 di mode gelap.
  (`src/components/sections/experience.tsx`, `renderGroup`)
- **Why**: `accessibility.md › Vision`: "Up to 17 pts … 4.5:1".
- **Fix**: ganti `text-ink-3/70` dengan `text-ink-3`. Hasilnya 5.33:1 di mode terang dan 6.14:1
  di mode gelap. Hierarki sudah cukup terbaca dari jarak dan ukuran.

### High: teks sekunder kartu Pendidikan saat hover
- **What**: saat hover, label periode (11 px) dan meta memakai `text-night/70` di atas
  ember-500, dengan kontras 3.74:1. Di bagian yang lebih terang (ember-400) kontrasnya 4.44:1.
- **Why**: `accessibility.md › Vision`, ambang 4.5:1 yang sama.
- **Fix**: pakai `group-hover:text-night` (5.84:1 di ember-500) untuk label dan meta. Program
  boleh tetap `text-night/85`.

### Medium: nama tools 10.4 px di mobile
- **What**: nama di kartu Toolkit memakai `text-[0.65rem]` (10.4 px) di bawah breakpoint `sm`.
  (`src/components/sections/skills.tsx:53`)
- **Why**: `typography.md › Ensuring legibility`: minimum 11 pt di iOS.
- **Fix**: naikkan ke `text-[0.6875rem]` (11 px) atau `text-xs`. Kalau "Adobe Creative Cloud"
  jadi terlalu panjang, grid mobile bisa diubah ke 3 kolom.

### Medium: hover berwarna pada kartu yang tidak bisa diklik
- **What**: kartu Pendidikan berubah jadi oranye penuh saat hover. Elemen lain yang punya hover
  kuat (kartu proyek, tombol) semuanya bisa diklik, jadi kartu ini terlihat seperti link padahal
  bukan.
- **Why**: `color.md › Best practices`: "Avoid using the same color to mean different things …
  status or interactivity."
- **Fix (trade-off)**: efek ini memang Anda minta, dan memberi karakter. Opsi yang menjaga
  maknanya:
  - (a) pertahankan hover, tetapi kursor tetap default (sudah begitu) dan isi oranyenya sedikit
    lebih lembut;
  - (b) jadikan kartu benar-benar interaktif, misalnya link ke situs kampus atau sekolah.

  Rekomendasi: (a). Pilihan ini cukup jujur untuk elemen dekoratif.

### Medium: animasi cover proyek berjalan terus tanpa kontrol
- **What**: 13 cover "video showcase" berputar tanpa henti selama terlihat di layar, dan tidak
  ada tombol jeda. Sisi positifnya, cover berhenti saat di luar layar dan diam total saat
  `prefers-reduced-motion`.
- **Why**: `accessibility.md › Cognitive`: "Let people control audio and video playback. Avoid
  autoplaying …". `motion.md › Best practices`: "Make motion optional."
- **Fix**: pilih salah satu:
  - jalankan animasi hanya saat kartu di-hover atau fokus, dan tampilkan frame diam yang informatif
    di luar itu;
  - tambahkan satu tombol "Jeda animasi" di header bagian Proyek, yang menyetel `data-play`
    off untuk semua cover.

### Medium: tombol tema khusus aplikasi
- **What**: toggle terang/gelap menyimpan pilihan di `localStorage`, dan setelah itu pengaturan
  sistem diabaikan.
- **Why**: `dark-mode.md › Best practices`: "Avoid offering an app-specific appearance setting."
- **Fix (trade-off)**: di web, toggle tema adalah pola yang wajar, dan situs ini sudah mengikuti
  sistem secara default (baik). Untuk menutup celahnya, pilih salah satu:
  - jadikan toggle tiga keadaan (Sistem / Terang / Gelap);
  - simpan pilihan hanya untuk sesi itu (`sessionStorage`), sehingga kunjungan berikutnya kembali
    mengikuti sistem.

### Low: pemilih bahasa 36 px
- **What**: tombol EN/ID berukuran 40×36 px di mobile. Ukuran ini di atas minimum 28 pt, tetapi
  di bawah default 44 pt.
- **Why**: `accessibility.md › Mobility`: "iOS, iPadOS | 44x44 pt | 28x28 pt".
- **Fix**: `h-11` di bawah `sm`, lalu `h-9` di desktop.

### Low: label navigasi 11 px
- **What**: link navigasi desktop dan semua eyebrow memakai `label` (11 px, huruf besar, tracking
  0.14em). Ukurannya tepat di minimum iOS. Di desktop masih di atas minimum macOS (10 pt).
- **Why**: `typography.md › Ensuring legibility`.
- **Fix**: boleh dibiarkan untuk eyebrow. Untuk link navigasi, 12 px akan lebih nyaman dibaca.

## Craft notes

- **Point of view (kuat)**: panel ember yang membuka (Hero) dan menutup (Kontak) halaman, dengan
  Anton raksasa. Keberanian desain dipusatkan di dua tempat itu, dan sisanya tenang. Ini sesuai
  dengan `branding.md › Best practices` ("Apply your app's accent color judiciously").
- **Medium: oranye mulai menyebar.** Oranye sekarang dipakai untuk:
  - panel ember;
  - progress bar dan underline navigasi;
  - teks hover;
  - badge "Sekarang";
  - focus ring;
  - isi kartu Pendidikan.

  Masing-masing masuk akal, tetapi jumlahnya mendekati batas. Sebelum menambah aksen oranye baru,
  sebaiknya ada satu yang dihapus.
- **Low: nomor seksi 01–05.** Seksi halaman bukan urutan langkah, jadi nomor itu dekoratif.
  Skill menandai pola ini sebagai ciri template. Opsi: hapus nomornya, atau biarkan karena nomor
  ikut membentuk ritme editorial. Ini keputusan Anda; dampaknya kecil.
- **Low: baris terakhir Toolkit di mobile.** Dengan 18 tools di grid 4 kolom, baris terakhir
  hanya berisi 2 kartu (Jira, Trello). Grid 3 kolom di mobile akan menutup grid dengan rapi
  (6 × 3) sekaligus memberi ruang untuk label 11 px.

## What works

- Default tema mengikuti `prefers-color-scheme`, tanpa kedipan (skrip inline di `<head>`).
- Kontras token dasar lolos di kedua mode:
  - `ink-3`: 5.33:1 (terang) dan 6.14:1 (gelap);
  - `ink-2` di atas surface: 7.92:1;
  - `signal-ink`: 5.59:1 (terang) dan 7.46:1 (gelap).
- `prefers-reduced-motion` dihormati di semua tempat. Cover showcase hanya beranimasi saat
  `no-preference`, jadi saat reduce yang tampil adalah frame diam, bukan frame kosong.
- `:focus-visible` dengan outline 2 px `signal-ink` dan offset 3 px. Ada skip link. Track Record
  memakai `<button aria-expanded aria-controls>`, jadi bisa dipakai lewat keyboard.
- Track Record memakai progressive disclosure (`layout.md › Visual hierarchy`: "Use progressive
  disclosure"). Expand saat hover hanya aktif untuk `(hover: hover) and (pointer: fine)`, dan
  sentuhan memakai tap.
- Dua typeface saja (Anton untuk display, Geist untuk teks). Ini sesuai `typography.md ›
  Conveying hierarchy`: "Minimize the number of typefaces".
- Heading display berbahasa Inggris di halaman ID diberi `lang="en"` untuk screen reader.
- Hampir semua kontrol utama berukuran 44 px atau lebih (toggle tema, menu, tombol hero 48 px).

## Platform notes

- Untuk web, padanan "Dynamic Type" adalah zoom browser 200% dan pengaturan ukuran font. Semua
  ukuran teks memakai `rem`/`clamp`, jadi ikut berskala. Zoom 200% belum diuji di audit ini.
- "Increase Contrast" di web setara dengan `prefers-contrast: more`, yang belum ditangani. Ini
  opsional. Kalau mau, cukup menaikkan `ink-3` dan border `line` di dalam media query tersebut.

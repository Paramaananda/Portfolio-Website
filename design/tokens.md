# Design System — "Ember Minimal"

Revisi 2 (16 Okt 2026). Arah dari referensi yang dipilih pengguna (hero "CREATE",
Omnic Studio): satu kata raksasa kondensed, panel gradasi oranye-bara, panel putih
bersih, potret yang menyeberang di antara keduanya. Minimalis: dua font, satu
keluarga warna, sedikit elemen. Tidak memakai desain maupun copy Figma lama.

Sumber kebenaran token di kode: `src/app/globals.css` (blok `@theme`, Tailwind v4
memakai konfigurasi berbasis CSS — tidak ada `tailwind.config.ts`).

## Prinsip

1. Satu fokus per layar. Hero hanya punya satu kata besar.
2. Putih adalah default. Oranye hanya untuk momen penting (hero, aksen kecil).
3. Bukti, bukan klaim. Kartu di hero memakai angka dari sumber (SUS 81.5%), bukan testimoni.
4. Tanpa ornamen yang tidak membawa informasi (grid, anotasi, chip peran dihapus).

## Warna

| Token | Hex | Pakai untuk | Kontras |
|---|---|---|---|
| `paper` | `#FFFFFF` | Latar halaman, panel kanan hero | — |
| `surface` | `#F4F4F2` | Kartu kecil (fakta, metrik) | — |
| `ink` | `#141414` | Teks utama, tombol gelap | 18.4:1 di paper |
| `ink-2` | `#4B4B4B` | Teks sekunder | 8.7:1 |
| `ink-3` | `#6B6B6B` | Label, keterangan | 5.3:1 (4.8:1 di surface) |
| `line` | `#E6E6E3` | Garis pemisah | dekoratif |
| `ember-300` | `#FF9A3C` | Titik terang gradasi | dekoratif |
| `ember-400` | `#FF8A2A` | Gradasi | teks putih 2.4:1 — jangan |
| `ember-500` | `#F2651A` | Inti gradasi, dot status | teks putih 3.2:1 — hanya teks raksasa |
| `ember-600` | `#B83D0E` | Gradasi sisi kiri | teks putih 5.7:1 ✓ |
| `ember-800` | `#8A2E0C` | Tepi gelap | teks putih 8.5:1 ✓ |
| `ember-950` | `#3D1405` | Bayangan terdalam | — |
| `signal-ink` | `#B93E0C` | Teks oranye kecil di putih | 5.6:1 ✓ |

Aturan: teks putih ukuran normal hanya duduk di area ≤ `ember-600`. Hero memberi
lapisan gelap linear di sisi kiri untuk menjamin ini.

## Tipografi

| Peran | Font | Ukuran | Line-height | Catatan |
|---|---|---|---|---|
| Mega (kata hero) | Anton | `clamp(5.5rem, 2rem + 15vw, 13.5rem)` | 0.82 | UPPERCASE |
| H2 | Anton | `clamp(2.5rem, 1.5rem + 4vw, 5rem)` | 0.95 | UPPERCASE |
| H3 / pernyataan | Geist 500 | 1.5–1.75rem | 1.15 | tracking -0.02em |
| Body | Geist 400 | 1rem–1.125rem | 1.55 | maks 60ch |
| Label | Geist 600 | 0.6875rem | 1.4 | UPPERCASE, tracking 0.14em |

Dua font saja, lewat `next/font/google` (self-hosted, `display: swap`).

## Spacing & layout

- Basis 4px (skala default Tailwind).
- Container `max-w-[1280px]`; gutter 16px (<640), 24px (sm), 40px (lg).
- Hero = bingkai `rounded-frame` (28px). Desktop: panel oranye penuh + panel putih
  inset 8px di kanan (lebar 44%), potret di garis tengah, kata raksasa di atas potret.
- Mobile: panel oranye (kata + potret + CTA) lalu panel putih di bawahnya.
- Padding vertikal section: `clamp(4rem, 2.5rem + 6vw, 9rem)`.

## Bentuk & interaksi

- Radius: 20px kartu, 28px bingkai hero, pill untuk tombol.
- Tanpa bayangan kecuali glow lembut tombol putih di atas oranye.
- Durasi 200–800ms, easing `cubic-bezier(.2,.7,.2,1)`; mati saat `prefers-reduced-motion`.
- Fokus: ring 2px `signal-ink`, offset 3px. Target sentuh ≥ 44px.

## Dark mode (revisi 7)

Token warna yang mengikuti tema didefinisikan sebagai variabel CSS (`--paper`, `--surface`,
`--ink`, `--ink-2`, `--ink-3`, `--line`, `--signal-ink`) dan dipetakan ke Tailwind lewat
`@theme inline`. Tanpa pilihan tersimpan, situs mengikuti `prefers-color-scheme`; tombol
tema menyimpan pilihan di `localStorage` dan skrip inline di `<head>` memasangnya sebelum
paint (tanpa kedipan).

| Token | Terang | Gelap | Kontras gelap |
|---|---|---|---|
| `paper` | `#FFFFFF` | `#0E0E0D` | — |
| `surface` | `#F4F4F2` | `#1A1A18` | — |
| `ink` | `#141414` | `#F2F1EE` | 17.1:1 |
| `ink-2` | `#4B4B4B` | `#C4C2BC` | 10.8:1 |
| `ink-3` | `#6B6B6B` | `#94918A` | 6.1:1 (5.5:1 di surface) |
| `line` | `#E6E6E3` | `#2A2927` | dekoratif |
| `signal-ink` | `#B93E0C` | `#FF8A4C` | 8.3:1 |
| `night` (tetap) | `#141414` | `#141414` | teks di tombol putih, latar footer |

Panel ember (Hero, Kontak) sama di kedua tema.

## Motion

- Muat halaman: huruf kata Hero naik satu per satu (`animate-letter`), teks dan kartu `animate-rise` bertahap.
- Scroll (CSS scroll-driven, tanpa JS): `.reveal` (fade + naik), `.reveal-wipe` (judul tersibak dari bawah),
  progress bar oranye di bawah header, garis header muncul setelah scroll, parallax potret di ≥1280px.
- Ambien: cahaya di panel ember bergeser pelan (`animate-drift`, 14 detik).
- Interaksi: garis bawah nav, hover kartu/tombol, Track Record expand.
- Transisi halaman: sampul proyek "morph" dari kartu ke halaman detail (React `<ViewTransition>`).
- Ganti tema: tema baru melebar sebagai lingkaran dari tombol (View Transitions API).
- `prefers-reduced-motion: reduce` mematikan semuanya; browser tanpa dukungan scroll-driven menampilkan konten tanpa animasi.

# Portfolio Web — Ivan Djajusman Adi

> Dokumentasi yang lengkap untuk belajar dan memahami setiap bagian kode project ini.

---

## Daftar Isi

1. [Gambaran Umum](#1-gambaran-umum)
2. [Teknologi yang Digunakan](#2-teknologi-yang-digunakan)
3. [Struktur Folder](#3-struktur-folder)
4. [Cara Menjalankan Project](#4-cara-menjalankan-project)
5. [Penjelasan main.jsx — Titik Awal Aplikasi](#5-penjelasan-mainjsx--titik-awal-aplikasi)
6. [Context API — Manajemen State Global](#6-context-api--manajemen-state-global)
7. [Sistem Terjemahan (Translations)](#7-sistem-terjemahan-translations)
8. [Penjelasan Setiap Komponen](#8-penjelasan-setiap-komponen)
9. [Framer Motion — Panduan Animasi](#9-framer-motion--panduan-animasi)
10. [CSS Custom Properties — Sistem Tema Warna](#10-css-custom-properties--sistem-tema-warna)
11. [Fitur-Fitur Lengkap](#11-fitur-fitur-lengkap)
12. [Konsep Penting yang Digunakan](#12-konsep-penting-yang-digunakan)

---

## 1. Gambaran Umum

Ini adalah website **portfolio pribadi** yang dibangun menggunakan **React + Vite**. Website ini berfungsi untuk:
- Memperkenalkan diri sebagai Frontend Developer
- Menampilkan skill, pengalaman kerja, dan project
- Menerima pesan dari pengunjung lewat form kontak (EmailJS)
- Mendukung dua bahasa (Inggris & Indonesia)
- Otomatis berganti tema gelap/terang berdasarkan jam

Website ini di-host di **Vercel**: https://ivandjajusman.vercel.app  
Source code ada di **GitHub**: https://github.com/pecopero/portfolio-web

---

## 2. Teknologi yang Digunakan

| Teknologi | Versi | Kegunaan |
|---|---|---|
| **React** | 19 | Library utama untuk membangun UI |
| **Vite** | 8 | Build tool yang sangat cepat |
| **Framer Motion** | 12 | Semua animasi di website |
| **React Icons** | 5 | Ikon-ikon (FiSun, FaGithub, dll) |
| **EmailJS** | 4 | Kirim email dari form kontak tanpa backend |
| **CSS Custom Properties** | — | Sistem warna/tema dark & light |

### Penjelasan singkat tiap teknologi:

**React** adalah library JavaScript untuk membuat UI berbasis **komponen**. Artinya, setiap bagian halaman (Navbar, Hero, dll) adalah komponen yang berdiri sendiri dan bisa dipakai ulang.

**Vite** adalah pengganti Create React App yang jauh lebih cepat. Saat development, perubahan kode langsung terlihat di browser (Hot Module Replacement / HMR).

**Framer Motion** memudahkan pembuatan animasi di React. Cukup tambahkan props seperti `initial`, `animate`, `exit` dan animasinya otomatis berjalan.

**React Icons** menyediakan ribuan ikon dari berbagai library:
- `Fi` = Feather Icons (contoh: `FiSun`, `FiMenu`, `FiMail`)
- `Fa` = Font Awesome (contoh: `FaGithub`, `FaReact`)
- `Si` = Simple Icons (contoh: `SiTypescript`, `SiShopify`)

**EmailJS** memungkinkan form kontak mengirim email langsung dari browser, **tanpa perlu membuat backend/server**. Cukup daftar di emailjs.com, buat template, dan pakai SDK-nya.

---

## 3. Struktur Folder

```
ProfileWeb/
├── public/
│   └── cv-ivan-djajusman.pdf     ← File CV yang bisa diunduh
│
├── src/
│   ├── main.jsx                  ← Titik masuk utama aplikasi
│   ├── App.jsx                   ← Komponen root, merangkai semua section
│   ├── index.css                 ← CSS global (variabel warna, reset, font)
│   │
│   ├── context/
│   │   ├── ThemeContext.jsx       ← State global untuk dark/light mode
│   │   └── LanguageContext.jsx    ← State global untuk bahasa EN/ID
│   │
│   ├── translations/
│   │   ├── en.js                 ← Semua teks dalam bahasa Inggris
│   │   └── id.js                 ← Semua teks dalam bahasa Indonesia
│   │
│   └── components/
│       ├── Navbar.jsx / .css
│       ├── Hero.jsx / .css
│       ├── About.jsx / .css
│       ├── Skills.jsx / .css
│       ├── Projects.jsx / .css
│       ├── Experience.jsx / .css
│       ├── Contact.jsx / .css
│       ├── Footer.jsx / .css
│       ├── SplashScreen.jsx / .css
│       ├── ScrollProgress.jsx / .css
│       └── BackToTop.jsx / .css
│
├── index.html                    ← HTML utama (SEO meta tags ada di sini)
├── package.json                  ← Daftar dependensi project
└── vite.config.js                ← Konfigurasi Vite
```

**Pola yang dipakai:** Setiap komponen punya file `.jsx` (logic) dan `.css` (style) dengan nama yang sama. Ini memudahkan mencari file yang terkait.

---

## 4. Cara Menjalankan Project

```bash
# 1. Pastikan Node.js v20+ aktif (pakai nvm)
nvm use 20.20.0

# 2. Install semua dependensi
npm install

# 3. Jalankan development server
npm run dev
# → Buka http://localhost:5173

# 4. Build untuk production
npm run build

# 5. Preview hasil build
npm run preview
```

---

## 5. Penjelasan main.jsx — Titik Awal Aplikasi

```jsx
// src/main.jsx

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from './context/ThemeContext'
import { LanguageProvider } from './context/LanguageContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </ThemeProvider>
  </StrictMode>,
)
```

**Penjelasan baris per baris:**

- `createRoot(document.getElementById('root'))` — React "mengambil alih" elemen `<div id="root">` di `index.html` dan merender semua komponen di sana.
- `<StrictMode>` — Mode khusus development. React akan menjalankan beberapa fungsi dua kali untuk mendeteksi bug lebih awal. Di production tidak berpengaruh.
- `<ThemeProvider>` dan `<LanguageProvider>` — "Membungkus" seluruh app agar **semua komponen di dalam bisa mengakses data tema dan bahasa** tanpa perlu kirim props satu per satu. Ini adalah pola **Context API**.

**Mengapa ada dua Provider yang dibungkus berlapis?**
Karena ThemeContext dan LanguageContext adalah dua "toko data" yang terpisah. Membungkus keduanya di sini membuat seluruh app bisa mengakses keduanya sekaligus.

---

## 6. Context API — Manajemen State Global

### Apa itu Context API?

Bayangkan kamu punya data "tema" (dark/light). Tanpa Context, kamu harus kirim data itu lewat **props** dari parent ke child ke grandchild — ini disebut **prop drilling** dan sangat merepotkan.

Dengan Context, data disimpan di satu tempat dan komponen mana saja bisa mengaksesnya langsung.

```
Tanpa Context (prop drilling):    Dengan Context:
App → props → Navbar              Context ←── Navbar (langsung akses)
App → props → Hero                Context ←── Hero
App → props → Footer              Context ←── Footer
```

---

### ThemeContext — Dark/Light Mode

```jsx
// src/context/ThemeContext.jsx

function getAutoTheme() {
  const hour = new Date().getHours()  // Ambil jam sekarang (0-23)
  return hour >= 6 && hour < 18 ? 'light' : 'dark'
  // Pukul 06:00 - 17:59 → light | Pukul 18:00 - 05:59 → dark
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    // Cek apakah user pernah menyimpan preferensi manual
    return localStorage.getItem('theme') || getAutoTheme()
    // Kalau belum pernah diset manual → pakai auto berdasarkan jam
  })

  // Setiap kali tema berubah, terapkan ke HTML dan simpan di localStorage
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  // Timer otomatis yang akan switch tema di pukul 06:00 atau 18:00
  useEffect(() => {
    const now = new Date()
    const nextCheck = new Date(now)
    const hour = now.getHours()

    // Hitung berapa milidetik sampai jadwal switch berikutnya
    if (hour < 6) {
      nextCheck.setHours(6, 0, 0, 0)        // Tunggu sampai jam 6 pagi
    } else if (hour < 18) {
      nextCheck.setHours(18, 0, 0, 0)       // Tunggu sampai jam 6 sore
    } else {
      nextCheck.setDate(nextCheck.getDate() + 1)
      nextCheck.setHours(6, 0, 0, 0)        // Tunggu sampai besok jam 6 pagi
    }

    const msUntilNext = nextCheck - now  // Selisih waktu dalam milidetik
    const timer = setTimeout(() => {
      // Hanya auto-switch kalau user belum set preferensi manual
      if (!localStorage.getItem('theme-manual')) {
        setTheme(getAutoTheme())
      }
    }, msUntilNext)

    return () => clearTimeout(timer)  // Cleanup: batalkan timer kalau komponen unmount
  }, [theme])

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    localStorage.setItem('theme-manual', '1')  // Tandai bahwa user sudah set manual
    setTheme(next)
  }
}
```

**Konsep kunci:**
- `useState` dengan fungsi `() => ...` disebut **lazy initialization** — fungsi hanya dijalankan sekali saat komponen pertama kali dibuat.
- `useEffect` dengan `[theme]` sebagai dependency — dijalankan setiap kali nilai `theme` berubah.
- `localStorage` — penyimpanan di browser yang persisten (tidak hilang saat halaman di-refresh).
- `data-theme` attribute di `<html>` — CSS membaca atribut ini untuk mengganti variabel warna.

---

### LanguageContext — Bahasa EN/ID

```jsx
// src/context/LanguageContext.jsx

import en from '../translations/en'
import id from '../translations/id'

const translations = { en, id }  // Object dengan key 'en' dan 'id'

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem('lang') || 'en')

  const switchLang = (next) => {
    setLang(next)
    localStorage.setItem('lang', next)  // Simpan pilihan bahasa
  }

  const t = translations[lang]
  // Kalau lang = 'en', maka t = objek teks bahasa Inggris
  // Kalau lang = 'id', maka t = objek teks bahasa Indonesia

  return (
    <LanguageContext.Provider value={{ lang, switchLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

// Hook custom untuk kemudahan penggunaan di komponen lain
export const useLanguage = () => useContext(LanguageContext)
```

**Cara pakainya di komponen lain:**
```jsx
const { t, lang } = useLanguage()

// Akses teks sesuai bahasa aktif
<h2>{t.about.title}</h2>      // "About Me" atau "Tentang Saya"
<p>{t.contact.subtitle}</p>
```

---

## 7. Sistem Terjemahan (Translations)

File terjemahan adalah **JavaScript object biasa** yang berisi semua teks di website, dikelompokkan per section.

```js
// src/translations/en.js (disingkat)
const en = {
  nav: {
    about: 'About',
    skills: 'Skills',
    // ...
  },
  hero: {
    badge: 'Available for freelance work',
    greeting: "Hi, I'm",
    // ...
  },
  about: {
    title: 'About Me',
    p1: 'I\'m <b>Ivan Djajusman Adi</b>...',  // HTML di dalam string
    // ...
  },
  // ... dan seterusnya
}
export default en
```

**Mengapa menggunakan file JS bukan JSON?**
Karena di JS kita bisa menggunakan string panjang, komentar, dan ekspresi yang lebih fleksibel dibanding JSON yang strict.

**Cara teks dengan tag `<b>` di-render:**
Di `About.jsx` ada helper component `RichText` yang menggunakan `dangerouslySetInnerHTML`:

```jsx
function RichText({ text }) {
  return (
    <p dangerouslySetInnerHTML={{
      __html: text.replace(/<b>(.*?)<\/b>/g, '<strong>$1</strong>')
    }} />
  )
}
```

`dangerouslySetInnerHTML` — React sengaja memberi nama "dangerous" sebagai pengingat bahwa ini bisa berbahaya kalau inputnya dari user (risiko XSS attack). Di sini aman karena teksnya dari file kita sendiri, bukan dari input user.

---

## 8. Penjelasan Setiap Komponen

### App.jsx

Komponen root yang merangkai semua bagian halaman:

```jsx
export default function App() {
  return (
    <>                    {/* Fragment — pembungkus kosong, tidak menghasilkan HTML */}
      <SplashScreen />    {/* Layar loading saat pertama buka */}
      <ScrollProgress />  {/* Bar progress scroll di atas halaman */}
      <Navbar />          {/* Navigasi fixed di atas */}
      <main>
        <Hero />          {/* Section pertama / landing */}
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
      <BackToTop />       {/* Tombol scroll ke atas */}
    </>
  )
}
```

**`<>...</>`** adalah sintaks pendek untuk `<React.Fragment>`. React mengharuskan setiap komponen mengembalikan satu elemen, tapi Fragment memungkinkan kita mengembalikan beberapa elemen tanpa wrapper `<div>` ekstra di HTML.

---

### SplashScreen

Layar loading yang muncul 2.2 detik saat pertama kali membuka website.

```jsx
export default function SplashScreen() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 2200)  // Sembunyikan setelah 2.2 detik
    return () => clearTimeout(timer)  // Cleanup: batalkan timer kalau komponen di-unmount
  }, [])  // [] artinya hanya dijalankan sekali (saat komponen pertama muncul)

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="splash"
          exit={{ opacity: 0, transition: { duration: 0.5 } }}
        >
          {/* Logo + progress bar animasi */}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
```

**`AnimatePresence`** — Komponen dari Framer Motion yang memungkinkan animasi `exit` berjalan sebelum elemen dihapus dari DOM. Tanpa ini, elemen langsung menghilang tanpa animasi.

**`useEffect` dengan `[]`** — Efek samping yang hanya dijalankan sekali, setara dengan "jalankan ini saat komponen pertama muncul".

**Progress bar animasi:**
```jsx
<motion.div
  className="splash-bar"
  initial={{ width: '0%' }}
  animate={{ width: '100%' }}
  transition={{ delay: 0.7, duration: 1.2, ease: 'easeInOut' }}
/>
// Bar memanjang dari 0% ke 100% selama 1.2 detik
```

---

### ScrollProgress

Bar tipis di atas halaman yang menunjukkan seberapa jauh user sudah scroll.

```jsx
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  // scrollYProgress = nilai 0 (posisi paling atas) sampai 1 (posisi paling bawah)

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,  // Seberapa kaku "pegas" — makin tinggi = makin responsif
    damping: 30,     // Seberapa cepat berhenti bergerak — makin tinggi = makin cepat berhenti
    restDelta: 0.001,
  })
  // useSpring membuat animasi terasa "elastic/halus" bukan langsung loncat

  return <motion.div className="scroll-progress" style={{ scaleX }} />
  // scaleX dari 0 ke 1 = bar memanjang dari kiri ke kanan
}
```

**Cara kerja `scaleX`:** Di CSS, bar punya `width: 100%` dan `transform-origin: left`. CSS transform `scaleX(0)` = tidak terlihat, `scaleX(1)` = penuh lebar halaman.

---

### Navbar

Navigasi yang fixed di atas halaman. Transparan saat di posisi atas, berubah blur saat di-scroll.

```jsx
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)  // Apakah sudah di-scroll?
  const [menuOpen, setMenuOpen] = useState(false)  // Menu mobile terbuka?
  const [langOpen, setLangOpen] = useState(false)  // Dropdown bahasa terbuka?
  const langRef = useRef(null)                      // Referensi ke elemen dropdown

  // Deteksi scroll untuk ubah tampilan navbar
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)  // Wajib cleanup!
  }, [])

  // Tutup dropdown bahasa kalau user klik di luar area dropdown
  useEffect(() => {
    const onClickOutside = (e) => {
      if (langRef.current && !langRef.current.contains(e.target)) {
        setLangOpen(false)
      }
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [])
```

**`useRef`** — Dipakai untuk mendapatkan referensi ke elemen DOM nyata. `langRef.current` adalah elemen `<div>` dropdown bahasa. `contains(e.target)` mengecek apakah klik terjadi di dalam atau di luar dropdown.

**Pentingnya Event Listener Cleanup:** Tanpa `return () => removeEventListener(...)`, listener akan terus menumpuk setiap kali komponen re-render dan menyebabkan **memory leak** (kebocoran memori).

**Dropdown Bahasa:**
```jsx
const LANGUAGES = [
  { code: 'en', label: 'English',   flag: '🇬🇧' },
  { code: 'id', label: 'Indonesia', flag: '🇮🇩' },
]

const current = LANGUAGES.find(l => l.code === lang)  // Bahasa yang sedang aktif

// Button menampilkan bendera + kode bahasa AKTIF saat ini
<button onClick={() => setLangOpen(o => !o)}>
  <span>{current.flag}</span>               {/* 🇬🇧 atau 🇮🇩 */}
  <span>{current.code.toUpperCase()}</span> {/* EN atau ID */}
  <FiChevronDown />  {/* Panah yang berputar saat dropdown terbuka */}
</button>

// Dropdown berisi SEMUA pilihan bahasa
{langOpen && (
  <ul className="lang-menu">
    {LANGUAGES.map(l => (
      <button onClick={() => { switchLang(l.code); setLangOpen(false) }}>
        {l.flag} {l.label}
        {lang === l.code && <span>✓</span>}  {/* Centang di bahasa yang aktif */}
      </button>
    ))}
  </ul>
)}
```

**Efek scroll di CSS:**
```css
.navbar { background: transparent; }           /* Transparan di atas */
.navbar.scrolled {
  background: var(--navbar-bg);                /* Berwarna saat di-scroll */
  backdrop-filter: blur(16px);                 /* Efek blur kaca */
}
```

---

### Hero

Section pertama yang dilihat pengunjung. Berisi nama, role, deskripsi, dan tombol aksi.

```jsx
// Helper function untuk membuat animasi fadeUp yang bisa di-reuse
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },    // Mulai: transparan, 40px ke bawah
  animate: { opacity: 1, y: 0 },     // Akhir: terlihat, posisi normal
  transition: { duration: 0.7, delay, ease: 'easeOut' }
})

// Pemakaian — setiap elemen punya delay berbeda agar muncul bergantian
<motion.div className="hero-badge" {...fadeUp(0.2)}>   // delay 0.2 detik
<motion.h1  className="hero-title" {...fadeUp(0.35)}>  // delay 0.35 detik
<motion.p   className="hero-desc"  {...fadeUp(0.5)}>   // delay 0.5 detik
```

**Spread operator `{...fadeUp(0.2)}`** — Menyebar semua key dari object hasil `fadeUp()` sebagai props. Lebih elegan dari menulis `initial=... animate=... transition=...` berulang-ulang.

**Blob Background:**
```jsx
<div className="hero-bg">
  <div className="blob blob-1" />  {/* Lingkaran berwarna blur besar */}
  <div className="blob blob-2" />
  <div className="blob blob-3" />
  <div className="grid-overlay" /> {/* Pattern grid tipis sebagai tekstur */}
</div>
```

Blob adalah elemen `<div>` bundar dengan `border-radius: 50%`, warna gradien, dan `filter: blur()`. Di CSS mereka punya animasi `@keyframes` yang membuat mereka bergerak perlahan seperti lava lamp.

**Scroll indicator bouncing:**
```jsx
<motion.a
  href="#about"
  animate={{ y: [0, 8, 0] }}             // Bergerak 8px ke bawah lalu kembali
  transition={{ delay: 1.2, duration: 1.5, repeat: Infinity }}  // Loop selamanya
>
  <FiArrowDown />
</motion.a>
```

---

### About

Menampilkan avatar dengan initials, paragraf tentang diri, dan kartu statistik.

```jsx
const stats = [
  { icon: <FiAward />,  value: '7+',  label: t.about.stats.years },
  { icon: <FiCode />,   value: '2',   label: t.about.stats.companies },
  { icon: <FiLayers />, value: '80%', label: t.about.stats.speedup },
  { icon: <FiZap />,    value: '100%',label: t.about.stats.passion },
]
```

**`useInView`** — Hook Framer Motion yang mendeteksi apakah elemen sedang terlihat di viewport:
```jsx
const ref = useRef(null)
const inView = useInView(ref, {
  once: true,       // Animasi hanya muncul sekali, tidak mengulang saat scroll balik
  margin: '-100px'  // Trigger animasi 100px sebelum elemen benar-benar terlihat
})

<div ref={ref}>  {/* Elemen yang dipantau */}
  <motion.div animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}>
  {/* Muncul dari kiri saat terlihat */}
```

---

### Skills

Menampilkan skill bar dengan persentase dan animasi mengisi dari kiri ke kanan.

```jsx
const skillData = [
  {
    key: 'core',
    color: '#F59E0B',  // Warna kuning untuk kategori "Core Languages"
    skills: [
      { name: 'React',      icon: <FaReact />, level: 92 },  // level = % skill
      { name: 'TypeScript', icon: <SiTypescript />, level: 85 },
    ]
  },
  // ...
]

function SkillBar({ name, icon, level, color, inView }) {
  return (
    <div className="skill-item">
      <div className="skill-meta">
        <span style={{ color }}>{icon}</span>  {/* Ikon berwarna sesuai kategori */}
        <span>{name}</span>
        <span>{level}%</span>
      </div>
      <div className="skill-track">           {/* Background bar abu-abu */}
        <motion.div
          className="skill-fill"             {/* Bar yang terisi */}
          style={{ background: `linear-gradient(90deg, ${color}99, ${color})` }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          // Kalau terlihat → bar terisi sampai level%, kalau tidak → tetap 0
          transition={{ duration: 0.9, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}
```

**Gradien pada skill bar:** `${color}99` adalah warna dengan opacity ~60% (format hex: dua digit terakhir = opacity 00-FF). Ini membuat bar terlihat seperti memudar dari kiri ke kanan.

---

### Projects

Grid kartu project dengan efek glow yang mengikuti warna project saat hover.

```jsx
const [hovered, setHovered] = useState(null)  // Index card yang sedang di-hover (null = tidak ada)

{projects.map((p, i) => (
  <motion.div
    onMouseEnter={() => setHovered(i)}    // Saat mouse masuk → simpan index
    onMouseLeave={() => setHovered(null)} // Saat mouse keluar → reset ke null
  >
    {/* Konten card */}

    <AnimatePresence>
      {hovered === i && (   // Tampilkan glow HANYA di card yang sedang di-hover
        <motion.div
          className="project-glow"
          style={{
            background: `radial-gradient(circle at 50% 100%, ${p.color}20, transparent 70%)`
            // Glow memancar dari bawah card, warna sesuai project
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}   // Fade out saat mouse keluar
        />
      )}
    </AnimatePresence>
  </motion.div>
))}
```

**Deskripsi Bilingual langsung di file:**
```jsx
const descriptions = {
  en: {
    github:   'A personal project built with React...',
    checkout: 'Led a performance optimization initiative...',
  },
  id: {
    github:   'Proyek personal menggunakan React...',
    checkout: 'Memimpin inisiatif optimasi performa...',
  },
}

// Digunakan:
<p>{descriptions[lang][p.descKey]}</p>
// lang='en', p.descKey='github' → tampil teks bahasa Inggris untuk project github
```

---

### Experience

Timeline pengalaman kerja dengan animasi muncul dari kiri.

```jsx
{t.experience.jobs.map((exp, i) => (
  <motion.div
    key={exp.company}
    className={`exp-item${i === 0 ? ' current' : ''}`}
    // i === 0 = pekerjaan paling baru, dapat class tambahan 'current'
    initial={{ opacity: 0, x: -40 }}   // Mulai dari kiri (-40px)
    animate={inView ? { opacity: 1, x: 0 } : {}}
    transition={{
      duration: 0.6,
      delay: i * 0.15  // Delay bertahap: job ke-0 muncul duluan, job ke-1 menyusul 0.15 detik kemudian
    }}
  >
```

Data pekerjaan disimpan di file terjemahan (`en.js` dan `id.js`) karena deskripsinya berbeda per bahasa. Ini adalah **separation of concerns** yang baik — komponen hanya mengurus tampilan, data ada di tempat yang sesuai.

---

### Contact + EmailJS

Form kontak yang mengirim email menggunakan EmailJS (tanpa backend).

```jsx
const EMAILJS_SERVICE_ID  = 'service_uk9jy0s'   // ID layanan email (misal: Gmail)
const EMAILJS_TEMPLATE_ID = 'template_oruqcws'  // ID template email di emailjs.com
const EMAILJS_PUBLIC_KEY  = 'M7MDdTWwCcbXIA7Kb' // Kunci publik akun EmailJS

const handleSubmit = async e => {
  e.preventDefault()      // Mencegah halaman reload (perilaku default HTML form)
  setStatus('loading')

  try {
    await emailjs.sendForm(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      formRef.current,          // Referensi ke elemen <form> — EmailJS membaca semua input-nya
      { publicKey: EMAILJS_PUBLIC_KEY }
    )
    setStatus('success')
    setForm({ name: '', email: '', message: '' })  // Kosongkan form setelah berhasil
    setTimeout(() => setStatus('idle'), 5000)      // Kembali ke normal setelah 5 detik
  } catch {
    setStatus('error')
    setTimeout(() => setStatus('idle'), 4000)
  }
}
```

**Status machine `idle → loading → success/error → idle`:**
```jsx
// Tombol submit berubah tampilan sesuai status
<button disabled={status === 'loading'}>
  {status === 'loading'
    ? <><span className="spinner" /> {t.contact.sending}</>  // Spinner + "Sending..."
    : <><FiSend /> {t.contact.sendBtn}</>                    // Ikon + "Send Message"
  }
</button>

// Pesan error muncul kalau gagal
{status === 'error' && (
  <div className="form-error">
    <FiAlertCircle /> {t.contact.errorMsg}
  </div>
)}

// Halaman sukses menggantikan seluruh form
{status === 'success' ? (
  <div className="sent-msg">Pesan Terkirim!</div>
) : (
  <form>...</form>
)}
```

**Hidden input untuk EmailJS template:**
```jsx
<input type="hidden" name="title" value="New Portfolio Message" />
```
Template EmailJS menggunakan `{{title}}` di Subject. Kalau field ini tidak ada di form, EmailJS akan error 400. Dengan `type="hidden"`, field ini tidak terlihat user tapi ikut terkirim ke EmailJS.

---

### Footer

Footer sederhana dengan link navigasi yang diambil dari terjemahan (mengikuti bahasa aktif).

```jsx
const links = [
  { label: t.nav.about,      href: 'about' },
  { label: t.nav.skills,     href: 'skills' },
  { label: t.nav.projects,   href: 'projects' },
  { label: t.nav.experience, href: 'experience' },
  { label: t.nav.contact,    href: 'contact' },
]
// Tidak perlu hardcode teks lagi — ikut bahasa aktif dari t.nav
```

---

### BackToTop

Tombol melayang di kanan bawah yang muncul setelah user scroll 400px ke bawah.

```jsx
export default function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)  // Muncul setelah 400px
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })
  // behavior: 'smooth' = scroll dengan animasi halus, bukan langsung lompat

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          onClick={scrollToTop}
          whileHover={{ scale: 1.1 }}  // Sedikit membesar saat hover
          whileTap={{ scale: 0.9 }}    // Sedikit mengecil saat diklik
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          <FiArrowUp />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
```

---

## 9. Framer Motion — Panduan Animasi

Framer Motion adalah library animasi paling populer untuk React. Berikut semua yang dipakai di project ini:

### Props Dasar motion.div

```jsx
<motion.div
  initial={{ opacity: 0, y: 40 }}   // State AWAL sebelum animasi mulai
  animate={{ opacity: 1, y: 0 }}    // State AKHIR yang dituju
  exit={{ opacity: 0, y: -20 }}     // State saat menghilang (perlu AnimatePresence)
  transition={{
    duration: 0.6,     // Durasi animasi dalam detik
    delay: 0.2,        // Jeda sebelum animasi mulai
    ease: 'easeOut'    // Kurva kecepatan (easeOut = cepat di awal, lambat di akhir)
  }}
/>
```

### Tipe Transisi

```jsx
// Tween (default) - pergerakan dengan kurva
transition={{ duration: 0.5, ease: 'easeOut' }}

// Spring - seperti pegas, terasa natural dan hidup
transition={{ type: 'spring', stiffness: 300, damping: 20 }}
// stiffness tinggi = bergerak cepat/responsif
// damping tinggi   = cepat berhenti, tidak terlalu bouncy

// Infinite loop
animate={{ y: [0, 8, 0] }}   // Keyframes: turun 8px lalu balik ke 0
transition={{ duration: 1.5, repeat: Infinity }}
```

### useInView — Trigger Animasi Saat Scroll

```jsx
const ref = useRef(null)
const inView = useInView(ref, {
  once: true,        // Animasi hanya muncul sekali
  margin: '-80px'    // Mulai deteksi 80px sebelum elemen benar-benar masuk viewport
})

<section ref={ref}>
  <motion.div
    initial={{ opacity: 0, x: -40 }}
    animate={inView ? { opacity: 1, x: 0 } : {}}
    // Kalau inView = true → tampilkan, kalau false → tetap tersembunyi
  />
```

### AnimatePresence — Animasi Keluar

```jsx
<AnimatePresence>
  {isVisible && (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}   // Ini baru berjalan berkat AnimatePresence
    />
  )}
</AnimatePresence>
```

Tanpa `AnimatePresence`, ketika `isVisible` berubah jadi `false`, elemen langsung dihapus dari DOM tanpa animasi keluar.

### whileHover dan whileTap

```jsx
<motion.button
  whileHover={{ scale: 1.05 }}   // Scale up saat mouse di atas tombol
  whileTap={{ scale: 0.95 }}     // Scale down saat tombol diklik
/>
// Otomatis kembali ke normal saat mouse pergi / klik selesai
```

### useScroll dan useSpring

```jsx
const { scrollYProgress } = useScroll()   // 0 = atas halaman, 1 = bawah halaman
const smooth = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })
// useSpring membuat nilai berubah dengan efek "pegas" yang halus
```

---

## 10. CSS Custom Properties — Sistem Tema Warna

Semua warna disimpan sebagai **CSS Variables** di `index.css`, bukan hardcode di setiap file CSS.

```css
/* index.css */
:root[data-theme="dark"] {
  --bg:         #0A0A0F;     /* Warna latar belakang utama */
  --bg-card:    #13131A;     /* Warna card/box */
  --text:       #F1F1F3;     /* Warna teks utama */
  --text-muted: #8888A0;     /* Warna teks sekunder/abu */
  --purple:     #7C3AED;     /* Warna aksen ungu */
  --border:     rgba(255,255,255,0.08);  /* Warna garis tepi */
}

:root[data-theme="light"] {
  --bg:         #F8F8FC;
  --bg-card:    #FFFFFF;
  --text:       #0F0F1A;
  --text-muted: #555577;
  --purple:     #6D28D9;
  --border:     rgba(0,0,0,0.08);
}
```

**Cara pakainya di file CSS manapun:**
```css
.navbar    { background: var(--bg); }
.card      { border: 1px solid var(--border); }
.title     { color: var(--text); }
.subtitle  { color: var(--text-muted); }
.btn       { background: var(--purple); }
```

**Cara kerjanya:** Ketika `ThemeContext` menjalankan:
```js
document.documentElement.setAttribute('data-theme', 'dark')
// atau
document.documentElement.setAttribute('data-theme', 'light')
```

Selector `:root[data-theme="dark"]` atau `light` akan aktif, dan otomatis **semua** elemen yang pakai `var()` akan berubah warna secara instan.

**Keuntungan:** Tidak perlu menulis CSS terpisah untuk dark dan light mode di setiap komponen. Cukup pakai variabel, ganti satu atribut di `<html>`, semua komponen ikut berubah.

---

## 11. Fitur-Fitur Lengkap

| Fitur | Cara Kerja | File Utama |
|---|---|---|
| **Splash Screen** | Timer 2.2 detik, fade out dengan AnimatePresence | `SplashScreen.jsx` |
| **Scroll Progress Bar** | `useScroll` + `useSpring` + CSS `scaleX` | `ScrollProgress.jsx` |
| **Dark/Light Mode Otomatis** | Cek jam saat load, timer switch di jam 06:00/18:00 | `ThemeContext.jsx` |
| **Toggle Tema Manual** | Button di Navbar, override auto, simpan ke localStorage | `Navbar.jsx`, `ThemeContext.jsx` |
| **Language Switcher** | Dropdown EN/ID, Context API, close on outside click | `Navbar.jsx`, `LanguageContext.jsx` |
| **Terjemahan Penuh** | Object teks di `en.js` dan `id.js`, hook `useLanguage()` | `translations/` |
| **Animasi Scroll** | `useInView` dengan `once: true` di setiap section | Semua komponen |
| **Skill Bar Animasi** | `motion.div` dengan `animate={{ width: level% }}` | `Skills.jsx` |
| **Hover Glow Project** | State `hovered`, AnimatePresence, radial-gradient | `Projects.jsx` |
| **Form Email** | EmailJS `sendForm`, async/await, status machine | `Contact.jsx` |
| **Download CV** | Link `<a href="..." download>` ke file di folder `public/` | `Hero.jsx`, `Experience.jsx` |
| **Back to Top** | Deteksi `scrollY > 400`, `window.scrollTo` smooth | `BackToTop.jsx` |
| **Navbar Blur Effect** | State `scrolled`, class conditional, `backdrop-filter` CSS | `Navbar.jsx` |
| **Mobile Menu** | State `menuOpen`, AnimatePresence height collapse | `Navbar.jsx` |
| **SEO Meta Tags** | OG tags di `index.html` | `index.html` |

---

## 12. Konsep Penting yang Digunakan

### React Hooks

| Hook | Kegunaan di Project |
|---|---|
| `useState` | Menyimpan state: tema, bahasa, status form, menu, hover |
| `useEffect` | Event listener, timer auto-theme, localStorage side effects |
| `useRef` | Referensi ke elemen DOM nyata (form, dropdown container) |
| `useContext` | Mengakses ThemeContext dan LanguageContext dari mana saja |

### Pola JavaScript yang Sering Muncul

**Conditional rendering dengan `&&`:**
```jsx
{visible && <motion.div>...</motion.div>}
// Hanya render kalau visible = true
// Kalau false, React tidak merender apapun
```

**Ternary untuk pilih tampilan:**
```jsx
{status === 'loading' ? <Spinner /> : <SendButton />}
// Kalau loading → tampilkan spinner, kalau tidak → tampilkan tombol
```

**Conditional class name:**
```jsx
className={`navbar${scrolled ? ' scrolled' : ''}`}
// Hasilnya: "navbar" atau "navbar scrolled"
```

**Functional state update:**
```jsx
setMenuOpen(o => !o)
// Pakai fungsi agar selalu dapat nilai terbaru, aman dari stale closure
// Lebih aman dari: setMenuOpen(!menuOpen)
```

**Object spread sebagai props:**
```jsx
const fadeUp = (delay) => ({ initial: {...}, animate: {...}, transition: {...} })
<motion.div {...fadeUp(0.3)} />
// Lebih rapi dari menulis semua props manual di setiap elemen
```

**Template literal untuk style dinamis:**
```jsx
style={{ color: p.color, background: `${p.color}22` }}
// ${p.color}22 = warna dengan opacity ~13%
// Format hex opacity: 00=0%, 80=50%, FF=100%, 22=13%
```

**Lazy initialization useState:**
```jsx
useState(() => localStorage.getItem('theme') || 'dark')
// Fungsi hanya dijalankan SEKALI saat komponen pertama dibuat
// Lebih efisien dari: useState(localStorage.getItem('theme') || 'dark')
// yang dijalankan setiap kali re-render
```

**Array keyframes di Framer Motion:**
```jsx
animate={{ y: [0, 8, 0] }}
// Bergerak: posisi 0 → turun 8px → kembali ke 0 → loop
```

---

*Ditulis dengan sepenuh hati untuk Ivan Djajusman Adi — semoga membantu perjalanan belajarmu!*

# ArtHive - Plan de Implementare

## Viziune Generală

ArtHive este platforma care conectează curatorii cu artiștii și spațiile de expoziție într-un mod simplu, rapid și inteligent. Caută talente după stil și medium, închiriază galerii cu un click, anunță expoziții și construiește o comunitate vie – totul într-un singur loc.

---

## Roluri Principale

### 1. Curator

- Caută artiști după stil, medium, locație
- Caută spații după dimensiune, preț, oraș
- Organizează și publică expoziții
- Urmărește artiști și galerii

### 2. Artist

- Încarcă albume cu lucrări (imagini + titlu + medium)
- Profil public cu portofoliu
- Primește notificări când sunt incluși în expoziții
- Vizualizează statistici (views, followeri)

### 3. Galerie

- Listează spații disponibile (poze, preț, dimensiuni)
- Gestionează disponibilitate
- Primește cereri de închiriere
- Profil public cu portfolio de spații

### 4. Utilizator (Public)

- Vizualizează expoziții publice
- Urmărește artiști, curatori, galerii
- Feed de activitate
- Descoperă conținut nou

---

## Componente Principale

### 1. Landing Page + Onboarding

**Scop**: Demonstrează clar cine folosește aplicația și de ce

**Funcționalități**:

- Hero section cu explicația conceptului
- Secțiune cu 4 roluri (Curator, Artist, Galerie, Utilizator)
- Buton de "Înregistrare" (simulare fără cont real)
- Design atractiv, modern, cu imagini sugestive
- Call-to-action clar pentru fiecare rol

**Tehnologii**: Inertia.js + React, Tailwind CSS v4

---

### 2. Profiluri Simulate (Mock Data)

**Scop**: Arată cum arată experiența reală fără a avea utilizatori reali

**Date Necesare**:

#### Artiști (3-5 profiluri)

- Nume, bio, fotografie
- 1 album cu 5 lucrări fiecare
- Pentru fiecare lucrare: imagine, titlu, medium, an
- Statistici: views, followeri

#### Galerii (3-5 profiluri)

- Nume galerie, descriere, locație
- 2 spații fiecare cu:
    - Galerie foto (3-5 imagini)
    - Preț/lună sau eveniment
    - Dimensiuni (mp)
    - Disponibilitate (calendar mock)
    - Facilități

#### Curatori (3-5 profiluri)

- Nume, bio, fotografie
- Experiență, specializare
- Expoziții trecute (2-3)
- Expoziții viitoare (1-2)
- Statistici: followeri, expoziții organizate

**Implementare**: Seeders + Factories Laravel

---

### 3. Căutare Avansată (Filtrată)

**Scop**: Core feature – demonstrează căutarea inteligentă

**Filtre pentru Artiști**:

- Stil artistic (Contemporary, Abstract, Realism, etc.)
- Medium (Oil, Acrylic, Sculpture, Digital, etc.)
- Locație (oraș/regiune)
- Disponibilitate
- Sortare: relevance, popularitate, recent

**Filtre pentru Spații**:

- Dimensiune (mp: min-max)
- Preț (range)
- Oraș/regiune
- Disponibilitate (date)
- Facilități (lighting, security, parking, etc.)
- Sortare: preț, dimensiune, rating

**UI/UX**:

- Sidebar cu filtre
- Grid view pentru rezultate
- Cards cu preview imagini
- Paginare
- Empty states pentru "no results"

**Tehnologii**: Laravel Query Builder + Eloquent, React, Tailwind

---

### 4. Feed de Activitate / Follow

**Scop**: Arată dinamica comunității și valoarea follow-ului

**Tipuri de Activități**:

- Artist X a încărcat un album nou
- Galeria Y a listat un spațiu disponibil
- Curator Z a anunțat expoziția "Future Visions"
- Artist X a fost inclus în expoziția Y
- Galeria X a fost rezervată pentru perioada Y

**Funcționalități**:

- Timeline cronologic
- Filtrare după tip activitate
- Follow/Unfollow useri
- Like/Save posts
- Infinite scroll
- Notificări (badge count)

**Tehnologii**: Eloquent relationships, Inertia deferred props, React

---

### 5. Postare Expoziție (Curator)

**Scop**: Demonstrează flow-ul central al aplicației

**Formular Wizard (Multi-step)**:

**Step 1: Informații Generale**

- Titlu expoziție
- Descriere
- Data început - data sfârșit
- Imagine cover
- Categorie/Temă

**Step 2: Selectare Artiști**

- Căutare artiști din platformă
- Preview profil + lucrări
- Selectare 2-3 artiști
- Pentru fiecare artist: selectare 3-5 lucrări care vor fi expuse

**Step 3: Selectare Spațiu**

- Căutare spații disponibile
- Filtrare după dimensiune, locație, preț
- Preview galerie
- Selectare 1 spațiu
- Confirmare disponibilitate (mock)

**Step 4: Preview & Publish**

- Review all information
- Preview pagina publică
- Buton "Publish Expoziție"

**Validări Laravel**: Form Requests pentru fiecare step

---

### 6. Pagină Publică de Expoziție

**Scop**: Arată valoarea pentru publicul larg

**URL**: `/exhibitions/{slug}` (ex: `/exhibitions/future-visions`)

**Secțiuni**:

**Hero**:

- Imagine cover full-width
- Titlu, dată, locație
- CTA: "Get Tickets" (mock)

**Despre Expoziție**:

- Descriere detaliată
- Curator info (card cu link către profil)

**Artiști & Lucrări**:

- Grid cu artiști participanți
- Pentru fiecare artist:
    - Profil card
    - Galerie lucrări expuse
    - Link către profil complet

**Locație & Galerie**:

- Informații despre spațiu
- Galerie foto spațiu
- Hartă Google Maps (embed sau static image)
- Adresă, program

**Bilete (Mock)**:

- Card cu prețuri (General, Student, VIP)
- Buton "Buy Tickets" (alert: mock data)

**Share**:

- Social share buttons
- Copy link

**SEO**: Meta tags, Open Graph pentru share

---

### 7. Dashboard Utilizator (Simplu)

**Scop**: Arată personalizarea experienței

#### Dashboard Curator

- Statistici: expoziții active, total artiști colaborați, total spații folosite
- Lista expoziții: Active / Draft / Past
- Artiști urmăriți (quick access)
- Galerii urmărite
- Acțiuni rapide: "Create New Exhibition"

#### Dashboard Artist

- Statistici: total views lucrări, followeri, expoziții participări
- Albume publicate
- Notificări: "You've been included in exhibition X"
- Acțiuni rapide: "Upload New Album"

#### Dashboard Galerie

- Statistici: spații listate, cereri primite, rating mediu
- Lista spații: Available / Booked / Unavailable
- Calendar rezervări (mock)
- Cereri de închiriere (notifications badge)
- Acțiuni rapide: "List New Space"

#### Dashboard Utilizator

- Feed personalizat
- Artiști/Curatori/Galerii urmăriți
- Expoziții salvate
- Recomandări

**Tehnologii**: Filament v4 pentru admin, Inertia+React pentru user dashboards

---

## Arhitectură Tehnică

### Backend (Laravel 12)

```
app/
├── Models/
│   ├── User.php (polymorphic: curator, artist, gallery, user)
│   ├── Artist.php
│   ├── Curator.php
│   ├── Gallery.php
│   ├── Album.php
│   ├── Artwork.php
│   ├── Space.php
│   ├── Exhibition.php
│   ├── Activity.php
│   └── Follow.php
├── Http/
│   ├── Controllers/
│   │   ├── ArtistController.php
│   │   ├── GalleryController.php
│   │   ├── CuratorController.php
│   │   ├── ExhibitionController.php
│   │   ├── SearchController.php
│   │   ├── FeedController.php
│   │   └── DashboardController.php
│   └── Requests/
│       ├── ExhibitionStoreRequest.php
│       ├── ArtworkStoreRequest.php
│       └── SpaceStoreRequest.php
└── Enums/
    ├── UserRole.php
    ├── ArtStyle.php
    ├── Medium.php
    └── ActivityType.php
```

### Frontend (Inertia + React)

```
resources/js/
├── Pages/
│   ├── Landing.tsx
│   ├── Artists/
│   │   ├── Index.tsx
│   │   └── Show.tsx
│   ├── Galleries/
│   │   ├── Index.tsx
│   │   └── Show.tsx
│   ├── Curators/
│   │   ├── Index.tsx
│   │   └── Show.tsx
│   ├── Exhibitions/
│   │   ├── Index.tsx
│   │   ├── Show.tsx
│   │   └── Create.tsx (wizard)
│   ├── Search/
│   │   ├── Artists.tsx
│   │   └── Spaces.tsx
│   ├── Feed/
│   │   └── Index.tsx
│   └── Dashboard/
│       ├── Curator.tsx
│       ├── Artist.tsx
│       ├── Gallery.tsx
│       └── User.tsx
├── Components/
│   ├── Layout/
│   │   ├── MainLayout.tsx
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   ├── Cards/
│   │   ├── ArtistCard.tsx
│   │   ├── ArtworkCard.tsx
│   │   ├── SpaceCard.tsx
│   │   ├── ExhibitionCard.tsx
│   │   └── ActivityCard.tsx
│   ├── Search/
│   │   ├── SearchFilters.tsx
│   │   └── SearchResults.tsx
│   └── Forms/
│       ├── ExhibitionWizard.tsx
│       └── SearchForm.tsx
└── Hooks/
    ├── useInfiniteScroll.ts
    └── useSearch.ts
```

### Database Schema (Principală)

```sql
users (id, name, email, role, bio, avatar, created_at)
artists (id, user_id, specialization, location)
curators (id, user_id, experience, location)
galleries (id, user_id, name, description, location)
albums (id, artist_id, title, description, created_at)
artworks (id, album_id, title, medium, year, image_path)
spaces (id, gallery_id, name, description, size_sqm, price, available)
space_images (id, space_id, image_path)
exhibitions (id, curator_id, space_id, title, slug, description, start_date, end_date, cover_image, status)
exhibition_artist (exhibition_id, artist_id)
exhibition_artwork (exhibition_id, artwork_id)
activities (id, user_id, type, data, created_at)
follows (id, follower_id, following_id, following_type)
```

---

## Plan de Implementare (Etape)

### Etapa 1: Setup & Mock Data

- [ ] Setup Laravel 12 + Inertia + React + Tailwind v4
- [ ] Create models + migrations
- [ ] Create enums (UserRole, ArtStyle, Medium, ActivityType)
- [ ] Create factories pentru toate modelele
- [ ] Create seeders cu date mock (3-5 profile pentru fiecare rol)
- [ ] Setup storage pentru imagini (mock images via unsplash sau similar)

### Etapa 2: Landing Page + Layout

- [ ] Create MainLayout component (Header + Footer)
- [ ] Create Landing page cu hero + roles section
- [ ] Create onboarding flow simulation
- [ ] Responsive design cu Tailwind v4

### Etapa 3: Profiluri

- [ ] Artist profile page (show)
- [ ] Gallery profile page (show)
- [ ] Curator profile page (show)
- [ ] Profile cards components
- [ ] Follow/Unfollow functionality (mock)

### Etapa 4: Căutare Avansată

- [ ] Search form cu filtre (artists + spaces)
- [ ] Backend: SearchController cu query builder
- [ ] Frontend: SearchFilters + SearchResults
- [ ] Paginare + empty states

### Etapa 5: Feed de Activitate

- [ ] Activity model + seeder
- [ ] Feed page cu infinite scroll
- [ ] Activity cards (diferite tipuri)
- [ ] Follow system integration

### Etapa 6: Sistem Expoziții

- [ ] Exhibition wizard (multi-step form)
- [ ] Backend: ExhibitionController + validation
- [ ] Pagină publică expoziție (show)
- [ ] SEO + social sharing meta tags

### Etapa 7: Dashboards

- [ ] Dashboard curator
- [ ] Dashboard artist
- [ ] Dashboard gallery
- [ ] Dashboard user
- [ ] Statistici + quick actions

### Etapa 8: Polish & Testing

- [ ] Pest tests pentru toate feature-urile
- [ ] Browser tests pentru flow-uri principale
- [ ] Laravel Pint formatting
- [ ] Responsive testing
- [ ] Performance optimization

---

## Tehnologii & Pachete

### Core

- **Laravel 12** - Backend framework
- **Inertia.js v2** - SSR-like SPA experience
- **React 19** - Frontend framework
- **Tailwind CSS v4** - Styling
- **Wayfinder** - Type-safe routing

### Development

- **Pest v4** - Testing (including browser tests)
- **Laravel Pint** - Code formatting
- **Filament v4** (optional) - Admin panel pentru management mock data

### Utilities

- **Laravel Factories & Seeders** - Mock data generation
- **Eloquent Relationships** - Data modeling
- **Vite** - Asset bundling

---

## Features "Nice to Have" (Opțional)

- [ ] Dark mode support (Tailwind dark:)
- [ ] Image optimization & lazy loading
- [ ] Advanced filtering (price ranges, availability calendar)
- [ ] Sorting options
- [ ] Bookmark/Save exhibitions
- [ ] Email notifications (mock)
- [ ] Export exhibition as PDF
- [ ] Analytics dashboard
- [ ] Admin panel cu Filament pentru CRUD mock data

---

## Notițe Importante

1. **Mock Data**: Totul este simulat - nu există autentificare reală, plăți, sau rezervări reale
2. **Focus pe UX**: Aplicația trebuie să arate și să se simtă ca o platformă reală
3. **Storytelling**: Fiecare feature trebuie să spună o poveste clară despre valoarea platformei
4. **Responsive**: Design trebuie să funcționeze perfect pe mobile, tablet, desktop
5. **Performance**: Folosește lazy loading, deferred props, infinite scroll pentru performanță
6. **SEO**: Paginile publice (exhibitions) trebuie să aibă meta tags corecte

---

## Success Metrics

La final, proiectul trebuie să demonstreze:

✅ **Claritate**: Oricine înțelege imediat ce face aplicația și pentru cine
✅ **Utilitate**: Flow-urile principale sunt intuitive și valoroase
✅ **Profesionalism**: Design modern, cod curat, experiență fluidă
✅ **Completitudine**: Toate cele 7 componente principale sunt implementate
✅ **Scalabilitate**: Arhitectura permite extindere ușoară cu feature-uri reale

---

**Versiune**: 1.0
**Data**: 2025-11-09
**Status**: Ready for Implementation

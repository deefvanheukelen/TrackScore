# TrackScore (PWA)

TrackScore is een eenvoudige webapp om scores en events (goals, penalty, OG, wissels, kaarten) bij te houden en een PDF-rapport te exporteren.

## Online zetten via GitHub Pages

### 1) Repository maken
1. Maak een nieuwe GitHub repository (bv. `trackscore`)
2. Upload minstens deze bestanden in de root:
   - `index.html`
   - `manifest.webmanifest`
   - `sw.js`
   - `reset.svg`
   - `wissel.svg`
   - `img/icoon.png`
   - `img/logo.png`
   - (optioneel) `img/icoon-192.png` en `img/icoon-512.png` (aanrader)

> Let op: bestandsnamen zijn **hoofdlettergevoelig** op GitHub Pages.

### 2) GitHub Pages activeren
1. Ga naar **Settings** → **Pages**
2. Bij **Build and deployment**:
   - **Source**: `Deploy from a branch`
   - **Branch**: `main` (of `master`) + `/ (root)`
3. Klik **Save**
4. Na enkele seconden/minuten krijg je een URL zoals:
   - `https://<jouw-username>.github.io/<repo-naam>/`

## PWA (installeren op telefoon)
- Open de GitHub Pages URL in Chrome/Edge (Android) of Safari (iOS)
- Je krijgt “Install app” (Android) of “Zet op beginscherm” (iOS)

## Updates pushen
Wanneer je wijzigingen pusht, kan het zijn dat je service worker nog de oude versie cached.
Tip:
- Herlaad 1x hard (Ctrl+Shift+R), of
- Wis site-data/cache in de browser, of
- Verhoog de cache-versie in `sw.js` (zie `CACHE_NAME`).

## Mappenstructuur (aanrader)

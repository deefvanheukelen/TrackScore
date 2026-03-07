# TrackScore Suite (GitHub Pages)

Deze versie is aangepast voor jouw mappenstructuur op GitHub Pages:

- `index.html`
- `manifest.webmanifest`
- `sw.js`
- `games/trackscore.html`

## Belangrijke aanpassingen

- foute verwijzingen naar niet-bestaande `css/` en `js/` bestanden verwijderd
- paden aangepast zodat bestanden in `games/` correct verwijzen naar `../img/...`
- manifest aangepast naar bestaande iconen
- service worker robuuster gemaakt voor GitHub Pages en ontbrekende bestanden

## Opmerking

`games/dartscore.html` zat niet in de bijlagen, dus dat bestand kon ik niet inhoudelijk aanpassen.
Voor dat bestand moet je dezelfde logica toepassen:
- `../manifest.webmanifest`
- `../img/icoon.png`
- `../img/logo.png`
- `navigator.serviceWorker.register("../sw.js", { scope: "../" })`

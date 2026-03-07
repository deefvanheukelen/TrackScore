# TrackScore Suite (PWA)

Deze repo bevat 2 spelletjes in één installbare webapp (PWA):

- **TrackScore** (voetbal): score + timer + events + PDF export
- **DartScore**: 301/501 + Cricket, spelers, double in/out, undo

## Lokaal draaien

Gebruik een simpele static server (service worker werkt niet via file://):

```bash
npx serve .
# of
python -m http.server 8080
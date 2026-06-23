# Shinobi JLPT Academy

Offline JLPT N2/N1 grammar, vocabulary and dokkai trainer prepared as a PWA.

## Files
- index.html: main app
- manifest.json: PWA manifest
- service-worker.js: offline cache
- icons/: app icons
- shinobi_images/: local images

## Local run

```bash
python -m http.server 8787
```

Open http://127.0.0.1:8787/

## GitHub Pages
Use Settings > Pages > Deploy from branch > main > root.

## Install
- iPhone: Safari > Share > Add to Home Screen
- Android: Chrome > Add to Home Screen
- PC: Chrome or Edge > Install app

Progress is stored locally in browser localStorage, so desktop and phone progress are separate until cloud sync is added.

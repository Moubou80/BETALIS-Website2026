# BETALIS — Site web

Site statique HTML/CSS de BETALIS (bureau d'études ingénierie structure).
Déploiement automatique : **push GitHub → Coolify → betalis.fr**.

## Structure

```
.
├── index.html              # Page 1 — Accueil
├── expertise-beton.html    # Page 2 — Expertise « Le béton »
├── assets/                 # Logos, favicons, images
│   ├── betalis-logo-*.svg
│   ├── betalis-favicon*.{ico,png}
│   ├── betalis-apple-touch-180.png
│   └── beton-mix-transparent.png
├── Dockerfile              # Image nginx pour Coolify
└── .dockerignore
```

## Charte graphique (rappel)

- Polices : **Manrope** (titres/logo) · **Inter** (corps de texte)
- Fond marque : `#1A1A2E`
- Béton `#8A8D94` · Bois `#B0703F` · Métal `#5B8AAE`
- Texte clair : `#B0B2C8`

## Workflow de mise à jour

1. **Consigne** → Claude (réflexion/création) produit la modif.
2. **Claude Code** applique la modif dans ce dépôt, puis :
   ```bash
   git add -A
   git commit -m "feat: <description de la modif>"
   git push
   ```
3. **Coolify** détecte le push (webhook), rebuild l'image et redéploie **betalis.fr** (~1 min).

## Mise en ligne initiale (une seule fois)

1. Créer le dépôt GitHub `Moubou80/BETALIS-Website2026` puis :
   ```bash
   git init && git add -A && git commit -m "init: site BETALIS (accueil + béton)"
   git branch -M main
   git remote add origin https://github.com/Moubou80/BETALIS-Website2026.git
   git push -u origin main
   ```
2. **Coolify** → New Resource → Application → ce dépôt GitHub → build pack **Dockerfile** → Auto Deploy **ON**.
3. Domaine : `betalis.fr` (+ `www`). DNS OVH → enregistrement **A** vers `49.13.201.129`. Coolify émet le SSL Let's Encrypt automatiquement.

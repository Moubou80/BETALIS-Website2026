# BETALIS — Site web

Site statique multi-pages de BETALIS (bureau d'études ingénierie structure).
Déploiement automatique : **push GitHub → Coolify → betalis.fr**.

## Structure

```
.
├── index.html              # Accueil (uniquement l'accueil)
├── expertises.html         # Nos expertises (béton / métal / bois)
├── expertise-beton.html    # Expertise détaillée « Le béton »
├── contact.html            # Contact + formulaire
├── references.html         # Références (en préparation)
├── buzz.html               # Buzz (en préparation)
├── assets/
│   ├── styles.css          # Feuille de style partagée (toute la charte)
│   ├── main.js             # Nav (scroll + menu burger mobile)
│   ├── betalis-logo-*.svg / betalis-favicon* / beton-mix-transparent.png
├── Dockerfile              # Image nginx pour Coolify
└── .dockerignore
```

## Navigation
- Le **logo BETALIS** (en-tête et pied de page) ramène à l'accueil.
- Le **menu du haut** mène aux pages : Expertises, Références, Buzz, Nous contacter.
- Chaque page a un **pied de page** : © BETALIS, mentions légales, confidentialité, LinkedIn, TikTok.

## Charte
- Polices : Manrope (titres) · Inter (corps)
- Fond : #1A1A2E · Béton #8A8D94 · Bois #B0703F · Métal #5B8AAE

## Workflow de mise à jour
Consigne → Claude → Claude Code (`git add -A && git commit -m "..." && git push`) → Coolify redéploie betalis.fr (~1 min).

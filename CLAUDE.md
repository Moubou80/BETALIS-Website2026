# CLAUDE.md — Site BETALIS (betalis.fr)

> Contexte projet pour tout agent (Claude Code, etc.) travaillant sur ce repo.
> Repo **public** : ne JAMAIS y écrire de secret (IP serveur, identifiants SMTP, UUID de déploiement, clés API).

## 1. Le projet
- **BETALIS** : bureau d'études d'ingénierie structure (béton, métal, bois) — bâtiment, TP, génie civil.
- Site **vitrine statique** en ligne : https://betalis.fr
- Langue : **français**. Ton : sobre, professionnel, expert mais accessible (pas de jargon inutile).

## 2. Stack & déploiement
- 100 % **statique** : HTML + CSS + JS (pas de framework, pas de build).
- Servi par **nginx** (Dockerfile à la racine). `journal/` est servi sur `/journal/`.
- **Déploiement = automatique** : un `git push` sur `main` déclenche le redéploiement (Coolify surveille le repo). **Aucune étape manuelle de déploiement.**
- Flux de travail : modifier les fichiers → `git add -A` → `git commit` → `git push`.

## 3. Structure des fichiers
- Pages racine : `index.html`, `expertises.html`, `expertise-beton.html`, `expertise-metal.html`, `expertise-bois.html`, `references.html`, `buzz.html`, `contact.html`, `mentions-legales.html`, `politique-confidentialite.html`.
- Sous-dossier `journal/` : `index.html` (hub « Connaissances et articles ») + articles (`choisir-materiau-structure.html`, `fissures-beton.html`, …).
- `assets/` : `styles.css`, `main.js`, images (`.jpg`), favicons.
- `sitemap.xml`, `robots.txt` à la racine.
- **Chemins** : les pages racine utilisent des chemins **relatifs** (`assets/...`, `contact.html`). Les pages de `journal/` utilisent des chemins **absolus racine** (`/assets/...`). Les liens légaux et le sitemap utilisent l'absolu (`/mentions-legales.html`).

## 4. Charte graphique (à respecter absolument)
- **Polices** : `Manrope` (titres), `Inter` (corps).
- **Variables CSS** (dans `assets/styles.css`) :
  - `--navy:#1A1A2E` (fond), `--navy-2:#22223A` (cartes), `--navy-3:#2C2C48`
  - `--beton:#8A8D94` (gris chaud), `--bois:#B0703F` (cognac), `--metal:#5B8AAE` (bleu acier)
  - `--text-light:#B0B2C8`, `--text-mute:#6E7088`, `--line`, `--line-2`, `--maxw:1240px`
- **Logo** : 3 pastilles (béton/bois/métal) + mot « BETALIS ».
- **Navigation** (5 entrées, identiques sur toutes les pages) : Expertises · Références · Connaissances et articles (→ `journal/`) · Buzz et actualités (→ `buzz.html`) · Nous contacter (`.nav-cta` → `contact.html`). Menu burger sous 1024px.
- Toujours réutiliser les classes existantes (`.page-hero`, `.sec-tag`, `.accent-dots`, `.content`, `.btn`/`.btn-primary`, `.foot-inner`, etc.) plutôt que d'inventer du style.

## 5. Conventions
- Terminal **zsh** : ne JAMAIS mettre de commentaire `#` en ligne dans un bloc de commandes (interprété comme argument).
- Toute nouvelle page reprend la même structure : `<head>` (title + meta description + canonical + og + favicons + fonts + styles.css), `header.nav`, `main`, `footer`, `<script src="assets/main.js">`.
- Écrire « **bureau d'études d'ingénierie** » pour le descriptif, mais « bureau d'études structure » quand on parle de la spécialité (ne pas alourdir).
- Dates d'articles affichées en français « j mois aaaa » + version ISO dans le JSON-LD.
- **Convention de slug (lien image ↔ article)** : chaque article a un *slug* en minuscules-tirets (ex. `termites-bois`). De ce slug découlent automatiquement la page `journal/<slug>.html` et l'image d'en-tête `/assets/article-<slug>.jpg` (générée en amont par le Studio images n8n). Toujours réutiliser **le même slug** des deux côtés.

## 6. Formulaire de contact (page contact.html)
- Envoie un `FormData` (multipart) en POST vers un **webhook n8n** (l'URL est déjà dans `contact.html`).
- Champs : `nom`, `societe`, `email`, `telephone`, `type_projet`, `message`, `lien_dossier`, fichier `fichier` (≤ 10 Mo), honeypot `website`.
- Côté n8n : Webhook (CORS = https://betalis.fr) → Send Email (OVH, port 587/STARTTLS) → Respond. Ne pas casser les noms de champs côté front sans adapter n8n.

## 7. Cookies & Analytics (conformité CNIL)
- Bandeau de consentement injecté par `assets/main.js`. **Aucun cookie Google avant consentement.**
- Google Analytics (gtag) n'est chargé **qu'après acceptation**. Google Maps (page contact) est « click-to-load » : iframe en `data-src`, placeholder `.map-consent`.
- ⚠️ Ne jamais coller le snippet GA en dur dans le HTML : il doit rester piloté par le consentement dans `main.js`.

## 8. Pipeline images
- Illustrations générées par IA (Gemini), puis nettoyage filigrane + étalonnage charte (désat légère, teinte navy froide), export **JPG 1200×670**, qualité ~85.
- Les images du « Buzz » sont des **originaux IA** (jamais reproduire une œuvre/architecte nommé) ; le bouton « Voir en vrai » **lie** vers la source (pas d'embed/hotlink).

## 9. Données société (publiques — pour pages légales / JSON-LD)
- BETALIS, **SAS** au capital de **10 000 €** — siège **2 rue de Pontoise, 95650 Puiseux-Pontoise**.
- **RCS Pontoise 103 797 148** (n° gestion 2026B02668) — **TVA FR19103797148** (assujetti).
- Président & directeur de la publication : **Franck Dion**. Immatriculée le 17/04/2026.
- Hébergeur : **Hetzner Online GmbH**, Industriestr. 25, 91710 Gunzenhausen, Allemagne.
- Contact : `contact@betalis.fr` — 06 68 71 14 34.

## 10. Recettes
**Ajouter un article au journal :**
1. Dupliquer un article existant de `journal/` (ex. `fissures-beton.html`) comme modèle.
2. Adapter : `<title>`, meta description, canonical, le JSON-LD `BlogPosting` (headline, datePublished ISO, author « Franck Dion »), le contenu, l'image (`assets/article-*.jpg`).
3. Ajouter la carte de l'article dans `journal/index.html` (même structure que les autres).
4. Ajouter l'URL dans `sitemap.xml`.
5. Commit + push.

**Ajouter une page :** repartir d'une page racine existante, garder head/nav/footer, ajouter la nav si besoin sur **toutes** les pages, ajouter au `sitemap.xml`.

## 11. Règles d'or / à NE PAS faire
- ❌ Aucun secret dans ce repo (public).
- ❌ Ne pas publier de **contenu juridique** (mentions, CGV, confidentialité) sans relecture humaine.
- ❌ Ne pas casser la charte ni les chemins relatifs/absolus.
- ✅ Pour toute modif multi-pages (footer, nav), appliquer **partout** de façon cohérente.
- ✅ Toujours vérifier le rendu et finir par `git push` (le déploiement suit tout seul).
- ✅ **Commencer TOUTE session par `git pull`** (l'image a été déposée sur GitHub par le Studio n8n — il faut être à jour avant de la référencer et de pousser), puis finir par `git push`.

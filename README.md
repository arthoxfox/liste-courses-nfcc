# Liste de courses NFC

Tu scannes le patch → la page s'ouvre → tu ajoutes un article.
Quand tu fais les courses : tu cliques sur "Copier & vider la liste" → le contenu est copié dans ton presse-papier → tu vas dans tes notes et tu colles → la liste est vide, prête pour la semaine suivante.

Pas de compte Twilio, pas de WhatsApp, pas de message envoyé nulle part : tout se passe sur une seule page.

---

## Étape 1 — Dézipper le dossier

Sur ton ordinateur, double-clique sur `liste-courses-nfc.zip` (ou clic droit → "Extraire tout"). Tu obtiens un dossier `liste-courses-nfc` avec les fichiers dedans.

## Étape 2 — Créer un compte GitHub

GitHub, c'est juste un endroit gratuit où stocker le code pour que Netlify puisse aller le chercher.

1. Va sur [github.com](https://github.com)
2. Clique sur **"Sign up"**
3. Renseigne email / mot de passe / nom d'utilisateur
4. Valide ton email si demandé

## Étape 3 — Créer un repository (= un dossier de projet en ligne)

1. Une fois connecté, clique sur le **+** en haut à droite → **"New repository"**
2. Nom : `liste-courses-nfc` (ou ce que tu veux)
3. Laisse le reste par défaut
4. Clique sur le bouton vert **"Create repository"**

## Étape 4 — Envoyer les fichiers sur GitHub

1. Sur la page de ton nouveau repository, cherche le lien **"uploading an existing file"** (ou le bouton **"Add file"** → **"Upload files"**)
2. Ouvre le dossier `liste-courses-nfc` que tu as dézippé à l'étape 1
3. Sélectionne TOUT ce qu'il y a dedans (`index.html`, `package.json`, `netlify.toml`, `.gitignore`, et le dossier `netlify`) et glisse-le dans la zone de la page
4. Vérifie que le dossier `netlify` apparaît bien dans la liste après le chargement
5. Descends tout en bas de la page, clique sur le bouton vert **"Commit changes"**

## Étape 5 — Connecter Netlify à ce repository

1. Va sur [app.netlify.com](https://app.netlify.com)
2. Crée un compte (tu peux cliquer **"Sign up with GitHub"** pour lier les deux directement, c'est plus simple)
3. Clique sur **"Add new site"** → **"Import an existing project"**
4. Choisis **"GitHub"**, autorise l'accès si demandé
5. Sélectionne ton repository `liste-courses-nfc`
6. Ne change rien aux réglages proposés (le fichier `netlify.toml` les configure déjà)
7. Clique sur **"Deploy site"**
8. Attends environ 1 minute

Netlify t'affiche ensuite une adresse du style `https://un-nom-bizarre.netlify.app`. **Note-la**, c'est l'adresse de ton site.

## Étape 6 — Tester avant de mettre sur le tag NFC

1. Ouvre `https://un-nom-bizarre.netlify.app` dans ton navigateur (remplace par ta vraie adresse)
2. Ajoute un ou deux articles dans le champ de texte
3. Clique sur **"Copier & vider la liste"**
4. Va dans une note / un message et fais coller (Ctrl+V ou appui long → Coller) → tu dois voir la liste apparaître, avec un tiret devant chaque article
5. Reviens sur la page : la liste doit être vide

Si tout ça marche, c'est bon.

## Étape 7 — Encoder le(s) patch(es) NFC

1. Installe l'app **NFC Tools** (gratuite, disponible sur Android et iOS)
2. Ouvre l'app → onglet **"Écrire"**
3. **"Ajouter un enregistrement"** → **"URL/URI"**
4. Colle ton adresse Netlify (ex: `https://un-nom-bizarre.netlify.app/`)
5. Approche le tag NFC vierge du téléphone pour l'écrire

Colle le tag où tu veux (frigo, porte du placard, etc.). Chaque scan ouvre directement la page pour ajouter un article.

---

## Si tu veux plusieurs listes séparées (ex: courses + autre chose)

Chaque site Netlify a sa propre liste. Le plus simple pour avoir une deuxième liste indépendante : répète les étapes 3 à 7 avec un deuxième repository (ex: `liste-courses-nfc-2`) et un deuxième tag NFC pointant vers cette nouvelle adresse.

📘 Sujet

Développer une application web permettant l’administration d’une base de données utilisateurs.

🧑‍💼 Caractéristiques d’un utilisateur

Nom

Prénom

Adresse email (correspond à l’identifiant de l’utilisateur)

Mot de passe (prévoir une complexité paramétrable via une expression régulière)

Date et heure de création

Date et heure de dernière modification

✅ Fonctionnalités attendues

Afficher la liste des utilisateurs inscrits en base de données

Ajouter un utilisateur

Modifier les informations d’un utilisateur

Supprimer un utilisateur

Proposer un formulaire d’authentification permettant de tester les comptes utilisateurs inscrits en base de données

🛠️ Contraintes techniques
🔧 Général

Les échanges entre le client et le serveur devront s’effectuer sans rafraîchissement, via les fonctionnalités prévues par Inertia

Base de données autorisées : SQLite ou MySQL

(Fournir un dump si MySQL est utilisé)

Le code fourni devra respecter les conventions et bonnes pratiques

Le code devra être clair et commenté au besoin

🖥️ Backend

Usage de Laravel 12 (avec Vite)

🎨 Frontend

React / Inertia

Les échanges de données client/serveur devront s’effectuer via Axios

Gestion des erreurs de saisie dans les formulaires

---

## Mise en route du projet

Après récupération du dépôt, suivre les étapes ci-dessous pour démarrer l’application en environnement de développement :

1. **Installation des dépendances PHP**  
   ```bash
   composer install
   ```

2. **Installation des dépendances JavaScript**  
   ```bash
   npm install
   ```

3. **Configuration de l’environnement**  
   ```bash
   cp .env.example .env
   php artisan key:generate
   php artisan migrate --seed
   ```
   - En cas d’utilisation de SQLite, veiller à ce que `DB_CONNECTION=sqlite` soit renseigné dans `.env` et que le fichier `database/database.sqlite` existe (fichier vide suffisant).

4. **Lancement des serveurs de développement**  
   ```bash
   php artisan serve
   npm run dev
   ```

5. **Accès à l’application**  
   Ouvrir `http://127.0.0.1:8000` : le front React/Inertia est servi par Vite et communique avec le backend Laravel via Inertia/axios.

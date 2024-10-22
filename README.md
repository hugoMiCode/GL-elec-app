# GL-elec-app - Démo d'application avec Backend en Node.js et Frontend en HTML/JS

## Description

Ce projet est une démonstration simple qui comporte deux parties :

- **Frontend** : une interface utilisateur en HTML/CSS/JavaScript.
- **Backend** : un serveur Node.js qui fournit une API REST pour la simulation.

Le projet utilise Docker pour encapsuler et isoler les services frontend et backend. Vous pouvez accéder à l'interface utilisateur (frontend) via un navigateur web et faire des requêtes à l'API backend pour des démonstrations en direct.

## Prérequis

- Docker et Docker Compose installés sur votre machine serveur.
- Accès SSH à votre serveur à distance.

## Structure du projet

- **frontend/** : Dossier contenant les fichiers HTML, CSS et JavaScript.
- **backend/** : Dossier contenant le code du serveur Node.js.
- **docker-compose.yml** : Fichier Docker Compose pour orchestrer les conteneurs frontend et backend.

## Lancer l'application

### 1. Cloner le projet

```bash
git clone https://github.com/votre-utilisateur/GL-elec-app.git
cd GL-elec-app
```

### 2. Lancer Docker Compose

Exécutez la commande suivante pour démarrer l'application avec Docker :

```bash
docker-compose up
```

- Cette commande va démarrer deux conteneurs :
  - **web** : Un serveur Apache qui servira le frontend (HTML/JS).
  - **backend** : Un serveur Node.js qui servira l'API.

### 3. Accéder au Frontend

Ouvrez votre navigateur web et accédez à l'URL suivante :

```
http://10.8.0.1:9007
```

C'est ici que l'interface utilisateur est accessible. Les fichiers HTML et JS seront chargés depuis ce conteneur.

### 4. Interaction entre le Frontend et le Backend

Le **frontend** utilise du JavaScript (via `fetch`) pour faire des requêtes API au **backend**.

Dans le fichier `api.js`, la requête ressemble à ceci :

```js
fetch('http://10.8.0.1:9008/api/simulation')
  .then(response => response.json())
  .then(data => {
      document.getElementById('resultat').textContent = 'Résultat: ' + data.resultat;
  });
```

- **Backend** : Le serveur Node.js écoute sur le **port 3000** à l'intérieur de son conteneur. Cependant, il est accessible de l'extérieur via le **port 9008** sur votre machine hôte grâce à la redirection de port définie dans `docker-compose.yml`.

### 5. Accéder au Backend API

Le backend expose une API à l'URL suivante :

```
http://10.8.0.1:9008/api/simulation
```

Lorsque vous accédez à cette URL, vous recevrez une réponse JSON comme suit :

```json
{
  "resultat": 42
}
```

### 6. Redirection des Ports

Les redirections de ports dans Docker fonctionnent comme suit :

- **Frontend (Apache)** :
  - Le conteneur expose le port **80** (port par défaut d'Apache).
  - Ce port est redirigé vers le port **9007** sur votre machine hôte.
  - Accès via : `http://10.8.0.1:9007`

- **Backend (Node.js)** :
  - Le serveur Node.js écoute sur le port **3000** dans le conteneur.
  - Ce port est redirigé vers le port **9008** sur votre machine hôte.
  - Accès via : `http://10.8.0.1:9008`

### 7. Utilisation de l'API Backend dans Docker

À l'intérieur de Docker, le backend écoute sur **localhost:3000** (dans le conteneur). Grâce à Docker Compose, il est accessible depuis l'extérieur via **http://10.8.0.1:9008**.

Dans le fichier `app.js` du backend, l'application est configurée pour écouter sur `localhost:3000` :

```js
app.listen(port, () => {
  console.log(`Backend Node.js à l'écoute sur http://localhost:${port}`);
});
```

Docker s'occupe de rediriger les requêtes externes depuis **9008** (sur la machine hôte) vers **3000** (dans le conteneur backend).

---

## Résumé

- **Frontend** accessible via : `http://10.8.0.1:9007`
- **Backend API** accessible via : `http://10.8.0.1:9008`
- Le code Node.js continue d'écouter sur `localhost:3000` dans le conteneur, avec Docker qui redirige les requêtes du port 9008 vers celui-ci.

## Commandes utiles

- Démarrer les conteneurs :
  ```bash
  docker-compose up
  ```
- Arrêter les conteneurs :
  ```bash
  docker-compose down
  ```
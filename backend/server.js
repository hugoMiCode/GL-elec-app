const express = require('express');
const app = express();
const port = 3000;

// Middleware pour parser le corps des requêtes JSON
app.use(express.json());

// Importer les routes pour les articles
const articlesRoute = require('./routes/articles');

// Utiliser les routes pour les articles à la racine /api/articles
app.use('/api/articles', articlesRoute);

// Lancer le serveur
app.listen(port, () => {
    console.log(`API à l'écoute sur http://localhost:${port}`);
});

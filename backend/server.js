const express = require('express');
const app = express();
const port = 3000;

// Middleware pour servir le frontend si nécessaire
app.use(express.static('public'));

// Route pour la simulation
app.get('/api/simulation', (req, res) => {
  res.json({ resultat: 42 });
});

// Lancer le serveur
app.listen(port, () => {
  console.log(`Backend Node.js à l'écoute sur http://localhost:${port}`);
});

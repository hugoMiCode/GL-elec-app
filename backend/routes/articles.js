const express = require('express');
const router = express.Router();

let articles = [
    { id: 1, title: 'Article 1', content: 'Contenu de l\'article 1' },
    { id: 2, title: 'Article 2', content: 'Contenu de l\'article 2' },
];

// GET: Récupérer tous les articles
router.get('/', (req, res) => {
    res.json(articles);
});

// GET: Récupérer un article par son ID
router.get('/:id', (req, res) => {
    const article = articles.find(a => a.id === parseInt(req.params.id));
    if (!article) return res.status(404).send('Article non trouvé');
    res.json(article);
});

// POST: Créer un nouvel article
router.post('/', (req, res) => {
    const newArticle = {
        id: articles.length + 1,
        title: req.body.title,
        content: req.body.content
    };
    articles.push(newArticle);
    res.status(201).json(newArticle);
});

// PUT: Mettre à jour un article existant
router.put('/:id', (req, res) => {
    const article = articles.find(a => a.id === parseInt(req.params.id));
    if (!article) return res.status(404).send('Article non trouvé');

    article.title = req.body.title;
    article.content = req.body.content;
    res.json(article);
});

// PATCH: Mettre à jour partiellement un article
router.patch('/:id', (req, res) => {
    const article = articles.find(a => a.id === parseInt(req.params.id));
    if (!article) return res.status(404).send('Article non trouvé');

    if (req.body.title) article.title = req.body.title;
    if (req.body.content) article.content = req.body.content;
    res.json(article);
});

// DELETE: Supprimer un article
router.delete('/:id', (req, res) => {
    const articleIndex = articles.findIndex(a => a.id === parseInt(req.params.id));
    if (articleIndex === -1) return res.status(404).send('Article non trouvé');

    const deletedArticle = articles.splice(articleIndex, 1);
    res.json(deletedArticle[0]);
});

module.exports = router;

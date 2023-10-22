const express = require('express');
const app = express();
const PORT = 3000;

// Middleware pour parser les requêtes JSON
app.use(express.json());

// Exemple de route GET
app.get('/', (req, res) => {
    res.json({ message: 'Bienvenue sur mon API!' });
});

// Exemple de route POST
app.post('/data', (req, res) => {
    const data = req.body;
    // Vous pouvez traiter ou stocker 'data' comme vous le souhaitez ici
    res.json({ received: true, data: data });
});

// Démarrage du serveur
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});


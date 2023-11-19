const express = require("express");
const { Sequelize } = require("sequelize");
const config = require("./config/config").development;

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: "mysql",
  }
);

const User = require("./models/users")(sequelize, Sequelize.DataTypes);
const horairesModel = require("./models/horaires")(sequelize, Sequelize.DataTypes);
const voitureModel = require("./models/voitures")(sequelize, Sequelize.DataTypes);
const temoignageModel = require("./models/temoignage")(sequelize, Sequelize.DataTypes);
const contactModel = require("./models/contact")(sequelize, Sequelize.DataTypes);
const serviceModel = require("./models/services")(sequelize, Sequelize.DataTypes);

const app = express();
const PORT = 3010;
const path = require("path");
const cors = require("cors");
const voitures = require("./models/voitures");

app.use(cors()); // Utilisez ceci AVANT vos routes

// Middleware pour parser les requêtes JSON
app.use(express.json());

// Test de la connexion
app.get("/", async (req, res) => {
  try {
    await sequelize.authenticate();
    res.json({ message: "Connexion à la base de données réussie!" });
  } catch (err) {
    res.status(500).json({ error: "Connexion à la base de données échouée" });
  }
});

// Ajout d'un utilisateur
app.post("/users", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;

    try {
        const user = await User.findOne({
            where: {
                email: email,
                password: password 
            }
        });
        
        if (!user) {
            return res.status(404).json({ error: 'Utilisateur non trouvé ou combinaison incorrecte' });
        }

        // Idéalement, renvoyez un token d'authentification ou d'autres détails nécessaires pour la session de l'utilisateur.
        res.json({ message: 'Connexion réussie', user: user });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur du serveur' });
    }
});

// Récupérer tous les utilisateurs
app.get("/users", async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//horaire
app.get('/horaires', async (req, res) => {
  try {
      const horaires = await horairesModel.findAll();
      res.json(horaires);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

//ajouter une horaire 
app.post("/horaires", async (req, res) =>{
  try{
    const horaire = await horairesModel.create(req.body);
    res.status(201).json(horaire);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
  });

//suprimer une horaire
app.delete('/horaires/:id', async (req, res) => {
  try {
      const horaireId = req.params.id;

      const horaire = await horairesModel.findByPk(horaireId);

      if (!horaire) {
          return res.status(404).json({ error: 'horaires not found' });
      }

      await horaire.destroy();

      return res.json({ message: 'horaire deleted successfully' });
  } catch (error) {
      console.error('There was an error deleting the horaire:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
  }
});
  
//contact 
app.get('/contacts', async (req, res) => {
  try {
    const contacts = await contactModel.findAll();
    res.json(contacts);
  } catch (error){
    res.status(500).json({error: error.message })
  }
});

//voitures
app.get('/voitures', async (req, res) => {
  try {
    const voitures = await voitureModel.findAll();
    res.json(voitures);
  } catch (error){
    res.status(500).json({error: error.message })
  }
});

//services
app.get('/services', async (req, res) => {
  try {
    const services = await serviceModel.findAll();
    res.json(services);
  } catch (error){
    res.status(500).json({error: error.message })
  }
});

//ajouter un service

app.post("/services", async (req, res) =>{
  try{
    const services = await serviceModel.create(req.body);
    res.status(201).json(services);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
  });

  //suprimer un service 
  app.delete('/services/:id', async (req, res) => {
    try {
        const serviceId = req.params.id;
  
        const service = await serviceModel.findByPk(serviceId);
  
        if (!service) {
            return res.status(404).json({ error: 'service not found' });
        }
  
        await service.destroy();
  
        return res.json({ message: 'service deleted successfully' });
    } catch (error) {
        console.error('There was an error deleting the temoignage:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
  });  

//temoignages
app.get('/temoignages', async (req, res) => {
  try {
    const temoignages = await temoignageModel.findAll();
    res.json(temoignages);
  } catch (error){
    res.status(500).json({error: error.message })
  }
});
//ajouiter un temoignages 
app.post("/temoignages", async (req, res) =>{
  try{
    const temoignage = await temoignageModel.create(req.body);
    res.status(201).json(temoignage);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
  });

//suppresion  du temoignage 
app.delete('/temoignages/:id', async (req, res) => {
  try {
      const temoignageId = req.params.id;

      const temoignage = await temoignageModel.findByPk(temoignageId);

      if (!temoignage) {
          return res.status(404).json({ error: 'temoignage not found' });
      }

      await temoignage.destroy();

      return res.json({ message: 'temoignages deleted successfully' });
  } catch (error) {
      console.error('There was an error deleting the temoignage:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
  }
});


//ajouter un contact
app.post("/contacts", async (req, res) =>{
  try{
    const contact = await contactModel.create(req.body);
    res.status(201).json(contact);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
  });

  //suprimer un contact 
  app.delete('/contacts/:id', async (req, res) => {
    try {
        const contactId = req.params.id;
  
        const contact = await contactModel.findByPk(contactId);
  
        if (!contact) {
            return res.status(404).json({ error: 'contacts not found' });
        }
  
        await contact.destroy();
  
        return res.json({ message: 'contact deleted successfully' });
    } catch (error) {
        console.error('There was an error deleting the car:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  




//ajouter une voiture 
app.post("/voitures", async (req, res) => {
  try {
    const voiture = await voitureModel.create(req.body);
    res.status(201).json(voiture);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//modification dune voiture 
app.put('/voitures/:id', async (req, res) => {
  try {
      const voitureId = req.params.id;
      const updatedData = req.body;

      const voiture = await voitureModel.findByPk(voitureId);

      if (!voiture) {
          return res.status(404).json({ error: 'voiture not found' });
      }

      const updatedVoiture = await voiture.update(updatedData);

      return res.json(updatedVoiture);
  } catch (error) {
      console.error('There was an error updating the car:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
  }
});

//suppresion  dune voiture 
app.delete('/voitures/:id', async (req, res) => {
  try {
      const voitureId = req.params.id;

      const voiture = await voitureModel.findByPk(voitureId);

      if (!voiture) {
          return res.status(404).json({ error: 'voiture not found' });
      }

      await voiture.destroy();

      return res.json({ message: 'voiture deleted successfully' });
  } catch (error) {
      console.error('There was an error deleting the car:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
  }
});




// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
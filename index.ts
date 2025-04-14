import secrets from "./private.json";
const http = require("http");

const API_KEY = secrets.API_KEY;

const express = require("express");
const app = express();
const port = 4000;

let DATA = {
  battery_energy_percentage: 0,
  battery_input: 0,
  battery_output: 0,
};

// 🔐 Middleware pour vérifier l'API key
function checkApiKey(req, res, next) {
  const key = req.query.api_key;
  if (key !== API_KEY) {
    return res.status(403).json({ error: "Clé API invalide ou absente" });
  }
  next();
}

// Middleware pour parser le JSON
app.use(express.json());

// Route GET /
app.get("/", checkApiKey, (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(JSON.stringify(DATA));
});

// Route POST /data
app.post("/", checkApiKey, (req, res) => {
  res.setHeader("Content-Type", "application/json");
  const data = req.body;
  console.log("Got post : ", data);

  DATA = { ...DATA, ...data };

  console.log("DATA : ", DATA);

  res.json({ message: "ok" });
});

// Démarrage du serveur
app.listen(port, () => {
  console.log(`Serveur Express lancé sur http://localhost:${port}`);
});

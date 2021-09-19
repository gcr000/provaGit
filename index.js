const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.all("*", (req, res) => {
  res.send("Risorsa non trovata");
});

app.listen(3000, () => console.log(`Server running`));

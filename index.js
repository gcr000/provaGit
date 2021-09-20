const express = require("express");
const app = express();
const { persone } = require("./persone");
//app.use(express.static("public"));

// app.get("/", (req, res) => {
//   res.sendFile("home.html", { root: __dirname + "/public" });
// });

// app.all("*", (req, res) => {
//   res.sendFile("404.html", { root: __dirname + "/public" });
// });

app.get("/", (req, res) => {
  res.send(`<h1><a href="/persone">Vai a persone</a></h1>`);
});

app.get("/persone", (req, res) => {
  const nuovePersona = persone.map((persona) => {
    const { id, name, username, email } = persona;
    return { id, name, username, email };
  });
  res.json(nuovePersona);
});

// app.get("/persone/:id", (req, res) => {
//   const persona = persone.find(
//     (persona) => persona.id === Number(req.params.id)
//   );
//   if (!persona)
//     return res.status(404).json({ messaggio: "prodotto non trovato" });
//   res.json(persona);
// });

app.get("/persone/search", (req, res) => {
  const { query, limit } = req.query;
  let personeFiltrate = [...persone];
  if (query) {
    personeFiltrate = personeFiltrate.filter((persona) => {
      return persona.name.startsWith(query);
    });
  }
  if (limit) {
    personeFiltrate = personeFiltrate.slice(0, Number(limit));
  }
  if (personeFiltrate.length < 1) {
    return res.status(200).json({
      code: 200,
      data: [],
    });
  }

  res.status(200).json(personeFiltrate);
});

app.listen(3000, () => console.log(`Server running`));

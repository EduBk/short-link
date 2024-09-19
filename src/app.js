import express from "express";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import mongoose from "mongoose";

import { ShortUrl } from "./models/shortUrl.js";
dotenv.config();

//! Creamos nuestra app y el puerto
const app = express();
const port = process.env.PORT;
console.log("MongoDB URI: ", process.env.DATABASE_URL);
//! URL del PATH
const __dirname = dirname(fileURLToPath(import.meta.url));

//! Configuraciones generales
app.set("port", port);
app.set("views", join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

//! Archivos estaticos
app.use(express.static(join(__dirname, "public")));

//!Conexion a base de datos
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => console.log("Conectado a la base de datos."));

//! Rutas
app.get("/", async (req, res) => {
  const urls = await ShortUrl.find();
  res.render("index", { url_short: urls });
});

app.post("/short-url", async (req, res) => {
  await ShortUrl.create({
    full: req.body.fullUrl,
  });
  res.redirect("/");
});

app.get("/:url", async (req, res) => {
  const url = await ShortUrl.findOne({ short: req.params.url });
  if (url == null) return res.sendStatus(404);

  url.clicks++;
  url.save();

  res.redirect(url.full);
});

//! Corremos nuestra app
app.listen(app.get("port"), () => {
  console.log("Server en puerto: ", app.get("port"));
});

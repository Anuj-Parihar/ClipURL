import express from 'express';
import dotenv from 'dotenv';
import { nanoid } from 'nanoid';
import shorturl from "./src/routes/shortUrl.route.js";
import connectDB from './src/config/mongo.config.js';
import ShortUrl from './src/models/shortUrl.model.js';
import { redirectFromShortUrl } from './src/controller/shortUrl.controller.js';


dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// POST /api/create
app.use('/api/create',shorturl);

app.get("/:id", redirectFromShortUrl);

// Start server
app.listen(5000, () => {
  connectDB();
  console.log("Server running on http://localhost:5000");
});

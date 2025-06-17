import express from 'express';
import dotenv from 'dotenv';
import shorturl from "./src/routes/shortUrl.route.js";
import connectDB from './src/config/mongo.config.js';
import { redirectFromShortUrl } from './src/controller/shortUrl.controller.js';
import { errorHandler } from './src/utils/errorHandler.js';


dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// POST /api/create
app.use('/api/create',shorturl);

app.get("/:id", redirectFromShortUrl);


app.use(errorHandler);

// Start server
app.listen(5000, () => {
  connectDB();
  console.log("Server running on http://localhost:5000");
});

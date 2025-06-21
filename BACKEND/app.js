import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import shorturl from "./src/routes/shortUrl.route.js";
import connectDB from './src/config/mongo.config.js';
import { redirectFromShortUrl } from './src/controller/shortUrl.controller.js';
import { errorHandler } from './src/utils/errorHandler.js';


dotenv.config();
const app = express();
const corsOptions = {
  origin: [
    process.env.FRONTEND_URL // If you have a production frontend URL
  ].filter(Boolean),
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204
};
app.use(cors(corsOptions));
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

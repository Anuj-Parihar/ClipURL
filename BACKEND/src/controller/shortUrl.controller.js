import { getShortUrl } from "../dao/shortUrl.js";
import { createShortUrlWithoutUser } from "../services/shortUrl.service.js";

export const createShortUrl =  async (req, res) => {
  const { url } = req.body;
  try {
    const shortUrl = await createShortUrlWithoutUser(url);
     res.send(process.env.APP_URL + shortUrl);
  } catch (error) {
    console.error("Error creating short URL:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export const redirectFromShortUrl = async (req, res) => {
  const { id } = req.params;
    const url = await getShortUrl(id);
    res.redirect(url.full_url);
  }

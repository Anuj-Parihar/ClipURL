import { generatNanoid } from "../utils/helper.js";
import { saveShortUrl } from "../dao/shortUrl.js";
export const createShortUrlWithoutUser= async (url) =>{
    const shortUrl =await generatNanoid(7); // Generate a short URL with a length of 7 characters
    await saveShortUrl(shortUrl, url); // Save the short URL and the original URL to the database

    return  shortUrl; // Return the generated short URL
}
export const createShortUrlWithUser = async (url,userId) =>{
    const shortUrl =await generatNanoid(7); // Generate a short URL with a length of 7 characters
    await saveShortUrl(url,shortUrl,userId);
    return  shortUrl; // Return the generated short URL
}
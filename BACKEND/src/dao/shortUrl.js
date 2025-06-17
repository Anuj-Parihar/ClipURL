import ShortUrl from "../models/shortUrl.model.js";
export const saveShortUrl = async (shortUrl, longUrl, uerId) =>{
    try {
        const newUrl = new ShortUrl({
         full_url: longUrl,
         short_url: shortUrl,
       });
       if (uerId) { 
           newUrl.user = uerId; // Assign user ID if provided
       }
       await newUrl.save();
    } catch (error) {
        throw new Error(error.message);
    }
}

export const getShortUrl = async (shortUrl) => {
    return await ShortUrl.findOneAndUpdate({ short_url: shortUrl },{$inc: { clicks: 1 }});     
}
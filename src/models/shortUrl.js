import mongoose from "mongoose";
import shortId from "shortid";

const ShortUrlSchema = new mongoose.Schema({
  full: {
    type: String,
    required: true,
  },
  short: {
    type: String,
    required: true,
    default: shortId.generate,
  },
  clicks: {
    type: Number,
    required: true,
    default: 0,
  },
});

// Crea y exporta el modelo
const ShortUrl = mongoose.model('ShortUrl', ShortUrlSchema);

export { ShortUrl };

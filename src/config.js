import axios from "axios";
import "dotenv/config";

export const port = process.env.PORT;
export const corsOrigin = process.env.CORS_ORIGIN;

export const rapidapi = axios.create({
  baseURL: process.env.RAPIDAPI_URL,
});
rapidapi.interceptors.request.use((config) => {
  const rapidapiHost = process.env.RAPIDAPI_HOST;
  const apiKey = process.env.RAPIDAPI_KEY;
  if (rapidapiHost && apiKey) {
    config.headers["x-rapidapi-host"] = rapidapiHost;
    config.headers["x-rapidapi-key"] = apiKey;
  }

  return config;
});

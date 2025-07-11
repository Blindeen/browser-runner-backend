import { rapidapi } from "./config/axios.config.js";

export const getLanguages = async () => {
  try {
    const { data } = await rapidapi.get("/languages/");
    return data;
  } catch (error) {
    throw error;
  }
};

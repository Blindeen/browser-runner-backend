import { Router } from "express";
import { getLanguages } from "./rapidapi.service.js";

export const router = Router();

router.get("/languages", async (req, res) => {
  try {
    const languages = await getLanguages();
    return res.status(200).json(languages);
  } catch (error) {
    const {
      response: { status, data },
    } = error;
    return res.status(status).json(data);
  }
});

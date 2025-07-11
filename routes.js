import { Router } from "express";
import { getLanguages, submitCode } from "./rapidapi.service.js";

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

router.post("/submissions", async (req, res) => {
  const { sourceCode, languageId, stdin } = req.body;
  if (!sourceCode || !languageId) {
    res
      .status(400)
      .json({ message: "Request body is missing source code or language id" });
    return;
  }

  try {
    const {
      stdout,
      time,
      compile_output,
      status: { description },
    } = await submitCode(languageId, sourceCode, stdin);
    const body = {
      stdout: stdout,
      time: time,
      description: description,
      compileOutput: compile_output,
    };
    return res.status(200).json(body);
  } catch (error) {
    const {
      response: { status, data },
    } = error;
    return res.status(status).json(data);
  }
});

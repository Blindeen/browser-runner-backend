import { Router } from "express";
import { GoogleGenAI } from "@google/genai";

import { getLanguages, submitCode, errorHandler } from "./rapidapi.service.js";

export const router = Router();
const ai = new GoogleGenAI({});

router.get("/languages", async (_, res) => {
  try {
    const languages = await getLanguages();
    return res.status(200).json(languages);
  } catch (error) {
    return errorHandler(res, error);
  }
});

router.post("/submissions", async (req, res) => {
  const { sourceCode, languageId, stdin } = req.body;
  if (sourceCode === undefined || languageId === undefined) {
    res
      .status(400)
      .json({ message: "Request body is missing source code or language id." });
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
    return errorHandler(res, error);
  }
});

router.post("/fix", async (req, res) => {
  const { sourceCode } = req.body;
  if (sourceCode === undefined) {
    res.status(400).json({ message: "Request body is missing source code." });
    return;
  }

  const prompt =
    "Review and correct the following JavaScript code. Provide only the raw, corrected code block without markdown formatting.";
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-lite",
      contents: `${prompt}\n${sourceCode}`,
      config: {
        thinkingConfig: {
          thinkingBudget: 0,
        },
      },
    });
    return res.status(200).json({ code: response.text });
  } catch (error) {
    let message;
    switch (error.status) {
      case 429:
        {
          message = "A model's quota has been exceeded.";
        }
        break;
      case 503:
        {
          message = "A model is temporarily unavailable. Try again later.";
        }
        break;
      default: {
        message = "An unexpected error occurred.";
      }
    }

    return res.status(error.status).json({ message: message });
  }
});

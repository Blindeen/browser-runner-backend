import { rapidapi } from "./config/axios.config.js";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({});

export const getLanguages = async () => {
  try {
    const { data } = await rapidapi.get("/languages/");
    return data;
  } catch (error) {
    throw error;
  }
};

export const submitCode = async (languageId, sourceCode, stdin) => {
  const body = {
    language_id: languageId,
    source_code: sourceCode,
    stdin: stdin,
  };
  const params = { wait: true };

  try {
    const { data } = await rapidapi.post("/submissions/", body, {
      params: params,
    });
    return data;
  } catch (error) {
    throw error;
  }
};

export const sendPrompt = async (model, prompt) => {
  try {
    const { text } = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        thinkingConfig: {
          thinkingBudget: 0,
        },
      },
    });
    return text;
  } catch (error) {
    throw error;
  }
};

export const errorHandler = (res, error) => {
  const {
    response: { status, data },
  } = error;
  return res.status(status).json(data);
};

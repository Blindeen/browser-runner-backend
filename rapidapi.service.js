import { rapidapi } from "./config/axios.config.js";

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

export const errorHandler = (res, error) => {
  const {
    response: { status, data },
  } = error;
  return res.status(status).json(data);
};

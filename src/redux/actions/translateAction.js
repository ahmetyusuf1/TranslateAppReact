import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { options } from "../../constant";

export const getLanguages = createAsyncThunk(
  "translate/getLanguages",
  async () => {
    const response = await axios.request(options);

    return response.data.data.languages;
  }
);

export const translateText = createAsyncThunk(
  "translate/translateText",
  async ({ text, sourceLanguage, targetLanguage }) => {
    const params = new URLSearchParams();
    params.set("source_language", sourceLanguage.value);
    params.set("target_language", targetLanguage.value);
    params.set("text", text);

    const options = {
      method: "POST",
      url: "https://text-translator2.p.rapidapi.com/translate",
      headers: {
        "x-rapidapi-key": "8b6da5566amsha97dca36f3dbc21p173a1ejsn60ea160d7893",
        "x-rapidapi-host": "text-translator2.p.rapidapi.com",
        "content-type": "application/x-www-form-urlencoded",
      },
      data: params,
    };

    const response = await axios.request(options);

    return response.data.data.translatedText;
  }
);

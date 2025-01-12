import axios from "axios";

export const apiClient = axios.create({
  headers: {
    Authorization: `Api-Key ${process.env.BOT_API_KEY}`,
  },
});

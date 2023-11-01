import axios from "axios";
import { type } from "os";

type Post = {
  title: string;
};


const url = "http://localhost:5001/";

export const postApi = {
  getAllPosts: async () => {
    try {
      const response = await axios.get<Post[]>(`${url}posts/all`);

      return response;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  },
};

import axios, { AxiosResponse } from "axios";

interface Posts {
  data: Post[];
}
interface PostReq {
  data: Post;
}
interface News {
  newsId: string;
}
const url = "http://localhost:5001/";

export const postApi = {
  getAllPosts: async () => {
    try {
      const response = await axios.get<Posts>(`${url}posts/all`);

      return response;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  },
  getNews: async (newsId: string|null) => {
    try {
      const response = await axios.get<PostReq>(`${url}posts/${newsId}`);

      return response;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  },
 update: async ({news,guid}:any): Promise<AxiosResponse<PostReq>>=> {
  try {
    const response = await axios.put<PostReq>(`${url}posts/update`, { news,guid });
    return response;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
};

import axios, { AxiosResponse } from "axios";

interface Posts {
  data: Post[];
}
interface PostReq {
  data: Post;
}

const url = "http://localhost:5002/";

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
  getNews: async (newsId: string | null) => {
    try {
      const response = await axios.get<PostReq>(`${url}posts/${newsId}`);

      return response;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  },
  update: async (guid: any, news: any): Promise<AxiosResponse<PostReq>> => {
    try {
      const response = await axios.put<PostReq>(`${url}posts/update`, {
        news,
        guid,
      });

      return response;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  },
  delete: async (guid: string): Promise<AxiosResponse<PostReq>> => {
    try {
      const res = await axios.delete(`${url}posts/delete`, {
       params: { guid }, 
      });
      return res;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  },
};

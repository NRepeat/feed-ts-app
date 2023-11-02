import axios from "axios";

export const userApi = {
  createUser: async () => {
    try {
      const payload = {
        email: "nnazarov55@mail.com",
        password: "user",
      };

      const response = await axios.post(
        "http://localhost:5001/user/registration",
        payload
      );

      console.log("Успешный ответ:", response.data);
    } catch (error) {
      console.error("Ошибка:", error);
    }
  },
};

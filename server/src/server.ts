const PORT = process.env.PORT || 5001;

const appServer = require('./app');
const postController = require('./controllers/postController');

async function startServer() {
  try {
    await postController.getAllParsedPosts();
    appServer.listen(PORT, () => {
      console.log(`Сервер запущен на порту ${PORT}`);
    });
  } catch (error) {
    console.error('Ошибка при получении постов:', error);
  }
}

startServer();

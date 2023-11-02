const PORT = process.env.PORT || 5001;

const appServer = require("./app");




appServer.listen(PORT, () => {
  console.log(`Application started on port ${PORT}!`);
});

const PORT = process.env.PORT || 5001;

const appServer = require("./app");




appServer.listen(3000, () => {
  console.log('Application started on port 3000!');
});

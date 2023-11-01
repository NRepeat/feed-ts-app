import express from 'express';

const postRouter = express.Router()
const postController  = require("../controllers/postController")

postRouter.route("/all").get(postController.getAllPosts)


module.exports  = postRouter
import express from 'express';

const postRouter = express.Router()
const postController  = require("../controllers/postController")

postRouter.route("/all").get(postController.getAllPosts)
postRouter.route("/:newsId").get(postController.getPost)


module.exports  = postRouter
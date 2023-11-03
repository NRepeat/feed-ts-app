import express from 'express';

const postRouter = express.Router()
const postController  = require("../controllers/postController")

postRouter.route("/all").get(postController.getAllPosts)
postRouter.route("/:newsId").get(postController.getPost)
postRouter.route("/update").put(postController.update)


module.exports  = postRouter
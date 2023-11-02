import { NextFunction, Request, Response } from 'express';
const { Post } = require('../../models');
const createHttpError = require('http-errors');
const parse = require('../service/parser');
const feedUrl = process.env.FEED_URL;

module.exports.getAllPosts = async (req: Request, res: Response, next: any) => {
  try {
    const { items } = await parse(feedUrl);
    for (const item of items) {
      const post = {
        ...item,
        contentEncoded: item['content:encoded'],
        contentEncodedSnippet: item['content:encodedSnippet'],
      };

      try {
        const existingPost = await Post.findOne({ where: { guid: post.guid } });

        if (existingPost) {
          await Post.update(post, { where: { guid: post.guid } });
        } else {
          await Post.create(post);
        }
      } catch (error) {
        console.error(`Ошибка при вставке/обновлении записи: ${error.message}`);
      }
    }
    try {
      const posts = await Post.findAll();
      res.send({ data: posts });
    } catch (error) {
      console.error(`Ошибка получении постов: ${error.message}`);
    }
  } catch (error) {
    next(error);
  }
};
module.exports.getPost = async (req: Request, res: Response, next: any) => {
  try {
    const { newsId } = req.params;

    const news = await Post.findOne({
      where: { guid: newsId },
    });
    res.send({ data: news });
  } catch (error) {
    console.log(createHttpError(404, error));
  }
};

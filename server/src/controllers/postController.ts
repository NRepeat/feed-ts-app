import { NextFunction, Request, Response } from 'express';
const { Post } = require('../../models');
const createHttpError = require('http-errors');
import {parse} from "../service/parser"
import 'dotenv/config'
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

        if (!existingPost) {
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
module.exports.update = async (req: Request, res: Response, next: NextFunction) => {
  try {

    const { news, guid } = req.body;

    const existingPost = await Post.findOne({ where: { guid: guid } });

    if (!existingPost) {
      return res.status(404).json({ error: 'Пост не найден' });
    }

    existingPost.contentEncoded = news
 

    await existingPost.save();

    res.json({ message: 'Пост успешно обновлен', data: existingPost });
  } catch (error) {
    console.error(`Ошибка при обновлении поста: ${error.message}`);
    next(error);
  }
};

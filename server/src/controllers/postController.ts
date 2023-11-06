import { NextFunction, Request, Response } from 'express';
const { Post } = require('../../models');
const createHttpError = require('http-errors');
import { parse } from '../service/parser';
import 'dotenv/config';
const feedUrl = process.env.FEED_URL;

module.exports.getAllParsedPosts = async (req: Request, res: Response, next: any) => {
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
  } catch (error) {}
};

module.exports.getAllPosts = async (req: Request, res: Response, next: any) => {
  try {
    const posts = await Post.findAll();
    res.send({ data: posts });
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

    let existingPost = await Post.findOne({ where: { guid: guid } });

    if (!existingPost) {
      return res.status(404).json({ error: 'Пост не найден' });
    }

    existingPost.title = news.title;
    existingPost.categories = [news.categories];
    existingPost.pubDate = news.pubDate;
    existingPost.contentEncoded = news.contentEncoded;
    await existingPost.save();

    res.json({ message: 'Пост успешно обновлен', data: existingPost });
  } catch (error) {
    console.error(`Ошибка при обновлении поста: ${error.message}`);
    next(error);
  }
};
module.exports.delete = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log('🚀 ~ file: postController.ts:76 ~ module.exports.delete ~ req.body:', req);
    const { guid } = req.query;
    console.log('🚀 ~ file: postController.ts:76 ~ module.exports.delete ~ newsId :', guid);

    const resDb = await Post.destroy({ where: { guid: guid } });
    res.send({ data: resDb });
  } catch (error) {
    next(error);
  }
};

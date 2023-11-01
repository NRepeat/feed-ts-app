import { NextFunction, Request, Response } from 'express';
import RSSParser from 'rss-parser';

const { Post } = require('../../models');
const createHttpError = require('http-errors');
const parser = new RSSParser();
const feedUrl = 'https://netflixtechblog.com/feed';
const data = {
  contentEncoded: 'asdasd',
};
const parse = async (url: string) => {
  const feed = await parser.parseURL(url);
  return feed;
};
module.exports.getAllPosts = async (req: Request, res: Response, next: any) => {
  try {
    const { items } = await parse(feedUrl);
    for (const item of items) {
      const post = {
        ...item,
        contentEncoded: item['content:encoded'],
        contentEncodedSnippet: item['content:encodedSnippet'],
      };
      console.log('🚀 ~ file: postController.ts:20 ~ module.exports.getAllPosts= ~  post :', post);

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
  } catch (error) {
    next(error);
  }
};

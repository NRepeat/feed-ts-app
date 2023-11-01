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
    items.forEach(async (item) => {
      const post = { ...item, contentEncoded: item['content:encoded'], contentEncodedSnippet: item['content:encodedSnippet'] };
      await Post.create(post);
    });
    res.send({ data: items });
  } catch (error) {
    next(error);
  }
};

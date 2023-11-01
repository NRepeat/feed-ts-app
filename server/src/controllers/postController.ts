import { NextFunction, Request, Response } from 'express';
import RSSParser from 'rss-parser';

const { Post } = require('../models');
const createHttpError = require('http-errors');

module.exports.getAllPosts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    
const feedUrl = 'https://netflixtechblog.com/feed';
const parser = new RSSParser();

const parse = async (url: string) => {
  const feed = await parser.parseURL(url);
 
};


const posts:[] =  parse(feedUrl);

  } catch (error) {
    next(error)
  }
};

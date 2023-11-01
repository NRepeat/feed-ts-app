import express from 'express';
import { Request, Response } from 'express';
import RSSParser from 'rss-parser';
import { Url } from 'url';
console.log('🚀 ~ file: index.ts:2 ~ RSSParser :', RSSParser);
const feedUrl = 'https://netflixtechblog.com/feed';
const parser = new RSSParser();

const parse = async (url: string) => {
  const feed = await parser.parseURL(url);
  console.log('🚀 ~ file: server.ts:11 ~ parse ~ feed:', feed.title);
  feed.items.forEach(item=>{
    console.log(item.title)
  })
};
const app = express();

app.get('/', (req: Request, res: Response) => {
  res.send('Application works!');
});

parse(feedUrl);

app.listen(3000, () => {
  console.log('Application started on port 3000!');
});

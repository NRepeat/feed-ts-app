import RSSParser from 'rss-parser';
const parser = new RSSParser();
export const parse = async (url: string) => {
  const feed = await parser.parseURL(url);
  return feed;
};

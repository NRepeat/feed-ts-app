import RSSParser from 'rss-parser';
const parser = new RSSParser();
const parse = async (url: string) => {
  const feed = await parser.parseURL(url);
  return feed;
};

module.exports = parse;

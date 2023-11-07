interface PreviewNews {
  title: string;
  pubDate: string;
  categories: [];
}

interface Post {
  title: string;
  guid: string;
  categories: [];
  pubDate: string;
  link: string;
  creator: string;
  contentEncoded: string;
  contentSnippet: string;
}
interface IUser {
  email: string;
  displayName: string;
  role: string;
  id:number
}

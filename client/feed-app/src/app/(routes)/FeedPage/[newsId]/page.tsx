

import { postApi } from '../../../api/postApi'
import parse, { DOMNode, Element, HTMLReactParserOptions, domToReact } from 'html-react-parser';
import { Source_Code_Pro } from 'next/font/google'






const sourseCode = Source_Code_Pro({
  subsets: ['latin'],
  display: 'swap',
})

interface Params {
  params: {
    newsId: string
  }
}
export default async function News({ params: { newsId } }: Params) {

  
  const posts = await postApi.getNews(newsId);
  const options: HTMLReactParserOptions = {
    replace(domNode) {
      if (domNode instanceof Element && domNode.name === "pre") {
        const domNodeArray: DOMNode[] = domNode.children.map((child) => child as DOMNode);
        return (
          <div className={`flex justify-center `}>
            <pre className={`rounded-sm bg-slate-100 bg-opacity-15 w-1/2 overflow-auto ${sourseCode.className}`}>
              {domToReact(domNodeArray, options)}
            </pre>
          </div>
        );
      } else if (domNode instanceof Element && domNode.name === "body") {
        const domNodeArray: DOMNode[] = domNode.children.map((child) => child as DOMNode);
        return (<div>
          {domToReact(domNodeArray, options)}
        </div>)
      }

    },
  };
  return (
    <div>
      {parse(posts.data.data.title)}
      {parse(posts.data.data.contentEncoded, options)}

    </div>
  )
}


export async function generateStaticParams() {
  const posts = await postApi.getAllPosts();


  return posts.data.data.map((post) => {
    const decodedNewsId = post.guid;
    return {
      props: {
        newsId: decodedNewsId

      },
      revalidate: 10,
    }
  })
}
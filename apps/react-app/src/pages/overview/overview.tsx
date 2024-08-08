import { gql, useQuery } from '@apollo/client';
import { Article } from '../../components/article/article';

type Author = {
  email: string;
};

type Post = {
  title: string;
  content: string;
  author: Author;
};

type PostQuery = {
  posts: Post[];
};

export function Overview() {
  const { data } = useQuery<PostQuery>(gql`
    query {
      posts {
        title
        content
        author {
          email
        }
      }
    }
  `);
  return (
    <>
      <h1 className="text-xl font-medium mb-4">Overview</h1>
      {data?.posts?.map(article => (
        <Article key={article.title} {...article} />
      ))}
    </>
  );
}

export default Overview;

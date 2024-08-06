import { Article } from '../../components/article/article';

const articles = [
  {
    title: 'Article 1',
    content: 'Content 1',
    author: 'bram@accountantsacademy.be',
  },
  {
    title: 'Article 2',
    content: 'Content 2',
    author: 'bram@accountantsacademy.be',
  },
  {
    title: 'Article 3',
    content: 'Content 3',
    author: 'bram@accountantsacademy.be',
  },
];

export function Overview() {
  return (
    <>
      <h1 className="text-xl font-medium mb-4">Overview</h1>
      {articles.map((article) => (
        <Article key={article.title} {...article} />
      ))}
    </>
  );
}

export default Overview;

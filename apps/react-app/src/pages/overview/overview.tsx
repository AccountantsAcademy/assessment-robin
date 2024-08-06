import { gql, useQuery } from '@apollo/client'
import { Article } from '../../components/article/article'

type Article = {
  title: string
  content: string
  author: string
}

type ArticlesQuery = {
  articles: Article[]
}

export function Overview() {
  const { data } = useQuery<ArticlesQuery>(gql`
    query {
      articles {
        title
        content
        author
      }
    }
  `)
  return (
    <>
      <h1 className="text-xl font-medium mb-4">Overview</h1>
      {data?.articles?.map((article) => (
        <Article key={article.title} {...article} />
      ))}
    </>
  )
}

export default Overview

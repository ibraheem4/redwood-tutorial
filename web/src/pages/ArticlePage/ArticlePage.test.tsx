import { render } from '@redwoodjs/testing/web'

import ArticlePage from './ArticlePage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('ArticlePage', () => {
  const article = {
    id: '5e1923f3-e84c-4603-90a6-18302f95a6f8',
  }
  it('renders successfully', () => {
    expect(() => {
      render(<ArticlePage id={article.id} />)
    }).not.toThrow()
  })
})

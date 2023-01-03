import { render } from '@redwoodjs/testing/web'

import CommentForm from './CommentForm'

const ARTICLE = {
  id: 1,
}

describe('CommentForm', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<CommentForm postId={ARTICLE.id} />)
    }).not.toThrow()
  })
})

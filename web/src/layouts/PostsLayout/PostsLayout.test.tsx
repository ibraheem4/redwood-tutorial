import { render } from '@redwoodjs/testing/web'

import PostsLayout from './PostsLayout'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('PostsLayout', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<PostsLayout>Children</PostsLayout>)
    }).not.toThrow()
  })
})

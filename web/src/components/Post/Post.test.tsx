import { render } from '@redwoodjs/testing/web'

import Post from './Post'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

const USER = {
  id: '5e1923f3-e84c-4603-90a6-18302f95a6f9',
  name: 'String',
  email: 'String',
  hashedPassword: 'String',
  salt: 'String',
  roles: ['String'],
  posts: [],
}

const POST = {
  id: '5e1923f3-e84c-4603-90a6-18302f95a6f8',
  title: 'A title',
  body: 'This is my comment',
  createdAt: new Date().toISOString(),
  user: USER,
}

describe('Post', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Post post={POST} />)
    }).not.toThrow()
  })
})

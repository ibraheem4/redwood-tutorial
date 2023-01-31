import { render, screen, waitFor } from '@redwoodjs/testing'

import Comment from './Comment'

const COMMENT = {
  id: '5e1923f3-e84c-4603-90a6-18302f95a6f8',
  name: 'John Doe',
  body: 'This is my comment',
  createdAt: '2020-01-02T12:34:56Z',
  postId: '5e1923f3-e84c-4603-90a6-18302f95a6f8',
}

describe('Comment', () => {
  it('renders successfully', () => {
    render(<Comment comment={COMMENT} />)

    expect(screen.getByText(COMMENT.name)).toBeInTheDocument()
    expect(screen.getByText(COMMENT.body)).toBeInTheDocument()
    const dateExpect = screen.getByText('2 January 2020')
    expect(dateExpect).toBeInTheDocument()
    expect(dateExpect.nodeName).toEqual('TIME')
    expect(dateExpect).toHaveAttribute('datetime', COMMENT.createdAt)
  })

  it('does not render a delete button if user is logged out', async () => {
    render(<Comment comment={COMMENT} />)

    await waitFor(() =>
      expect(screen.queryByText('Delete')).not.toBeInTheDocument()
    )
  })

  it('does not render a delete button if user is has "user" role', async () => {
    mockCurrentUser({
      id: '2e1923f3-e84c-4603-90a6-18302f95a3f8',
      email: 'user@user.com',
      roles: ['user'],
    })

    render(<Comment comment={COMMENT} />)

    await waitFor(() =>
      expect(screen.queryByText('Delete')).not.toBeInTheDocument()
    )
  })

  it('renders a delete button if the user is a moderator', async () => {
    mockCurrentUser({
      id: '5e1923f3-e84c-4603-90a6-18302f95a6f8',
      email: 'moderator@moderator.com',
      roles: ['moderator'],
    })

    render(<Comment comment={COMMENT} />)

    await waitFor(() => expect(screen.getByText('Delete')).toBeInTheDocument())
  })

  it('renders a delete button if the user is an admin', async () => {
    mockCurrentUser({
      id: '5e1923f3-e84c-4603-90a6-18302f95a6f8',
      email: 'admin@admin.com',
      roles: ['admin'],
    })

    render(<Comment comment={COMMENT} />)

    await waitFor(() => expect(screen.getByText('Delete')).toBeInTheDocument())
  })
})

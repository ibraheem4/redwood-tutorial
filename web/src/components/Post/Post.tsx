import type { DeletePostMutationVariables } from 'types/graphql'
import { Post } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Post/PostsCell'
import { timeTag, truncate } from 'src/lib/formatters'

const DELETE_POST_MUTATION = gql`
  mutation DeletePostMutation($id: String!) {
    deletePost(id: $id) {
      id
    }
  }
`

interface PostProps {
  post: Post
}

const Post = ({ post }: PostProps) => {
  const [deletePost] = useMutation(DELETE_POST_MUTATION, {
    onCompleted: () => {
      toast.success('Post deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id: DeletePostMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete post ' + id + '?')) {
      deletePost({ variables: { id } })
    }
  }

  return (
    <tr key={post.id}>
      <td>{truncate(post.id)}</td>
      <td>{truncate(post.title)}</td>
      <td>{truncate(post.body)}</td>
      <td>{timeTag(post.createdAt)}</td>
      <td>
        <nav className="rw-table-actions">
          <Link
            to={routes.post({ id: post.id })}
            title={'Show post ' + post.id + ' detail'}
            className="rw-button rw-button-small"
          >
            Show
          </Link>
          <Link
            to={routes.editPost({ id: post.id })}
            title={'Edit post ' + post.id}
            className="rw-button rw-button-small rw-button-blue"
          >
            Edit
          </Link>
          <button
            type="button"
            title={'Delete post ' + post.id}
            className="rw-button rw-button-small rw-button-red"
            onClick={() => onDeleteClick(post.id)}
          >
            Delete
          </button>
        </nav>
      </td>
    </tr>
  )
}

export default Post

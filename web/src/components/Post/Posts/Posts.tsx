import type { FindPosts } from 'types/graphql'

import Post from '../Post/Post'

const PostsList = ({ posts }: FindPosts) => {
  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Body</th>
            <th>Created at</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default PostsList

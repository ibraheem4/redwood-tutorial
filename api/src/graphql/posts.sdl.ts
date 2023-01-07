export const schema = gql`
  type Post {
    id: String!
    title: String!
    body: String!
    createdAt: DateTime!
    user: User!
  }

  type Query {
    posts: [Post!]! @skipAuth
    post(id: String!): Post @skipAuth
  }
`

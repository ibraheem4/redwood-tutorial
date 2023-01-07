export const schema = gql`
  type Comment {
    id: String!
    name: String!
    body: String!
    post: Post!
    postId: String!
    createdAt: DateTime!
  }

  type Query {
    comments(postId: String!): [Comment!]! @skipAuth
  }

  input CreateCommentInput {
    name: String!
    body: String!
    postId: String!
  }

  input UpdateCommentInput {
    name: String
    body: String
    postId: String
  }

  type Mutation {
    createComment(input: CreateCommentInput!): Comment! @skipAuth
    deleteComment(id: String!): Comment!
      @requireAuth(roles: ["moderator", "admin"])
  }
`

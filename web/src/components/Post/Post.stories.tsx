// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof Post> = (args) => {
//   return <Post {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import Post from './Post'

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

export const generated = () => {
  return <Post post={POST} />
}

export default {
  title: 'Components/Post',
  component: Post,
} as ComponentMeta<typeof Post>

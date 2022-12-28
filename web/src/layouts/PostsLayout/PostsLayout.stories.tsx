import type { ComponentMeta, ComponentStory } from '@storybook/react'

import PostLayout from './PostsLayout'

export const generated: ComponentStory<typeof PostLayout> = (args) => {
  return <PostLayout {...args} />
}

export default {
  title: 'Layouts/PostLayout',
  component: PostLayout,
} as ComponentMeta<typeof PostLayout>

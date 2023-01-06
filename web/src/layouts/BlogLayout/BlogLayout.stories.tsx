import type { ComponentMeta, ComponentStory } from '@storybook/react'

import BlogLayout from './BlogLayout'

export const loggedIn: ComponentStory<typeof BlogLayout> = (args) => {
  mockCurrentUser({ id: 1, email: 'rob@redwoodjs.com', roles: ['user'] })

  return <BlogLayout {...args} />
}

export const loggedOut: ComponentStory<typeof BlogLayout> = (args) => {
  return <BlogLayout {...args} />
}

export default {
  title: 'Layouts/BlogLayout',
  component: BlogLayout,
} as ComponentMeta<typeof BlogLayout>

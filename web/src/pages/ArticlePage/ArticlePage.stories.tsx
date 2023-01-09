import type { ComponentMeta } from '@storybook/react'

import ArticlePage from './ArticlePage'

export const generated = () => {
  return <ArticlePage id="5e1923f3-e84c-4603-90a6-18302f95a6f9" />
}

export default {
  title: 'Pages/ArticlePage',
  component: ArticlePage,
} as ComponentMeta<typeof ArticlePage>

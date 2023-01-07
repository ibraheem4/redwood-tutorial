import type { Prisma, Post } from '@prisma/client'

import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.PostCreateArgs>({
  post: {
    one: {
      data: {
        title: 'String',
        body: 'String',
        user: {
          create: {
            id: '5e1923f3-e84c-4603-90a6-18302f95a6f8',
            name: 'String',
            email: 'mock+test1@email.com',
            hashedPassword: 'String',
            roles: ['String'],
            salt: 'String',
          },
        },
      },
    },
    two: {
      data: {
        title: 'String',
        body: 'String',
        user: {
          create: {
            id: '5e1923f3-e84c-4603-90a6-18302f95a6f9',
            name: 'String',
            email: 'mock+test2@email.com',
            hashedPassword: 'String',
            roles: ['String'],
            salt: 'String',
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<Post, 'post'>

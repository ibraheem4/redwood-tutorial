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
            id: 1,
            name: 'String',
            email: 'mock+test1@email.com',
            hashedPassword: 'String',
            salt: 'String',
            roles: ['String'],
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
            id: 2,
            name: 'String',
            email: 'mock+test2@email.com',
            hashedPassword: 'String',
            salt: 'String',
            roles: ['String'],
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<Post, 'post'>

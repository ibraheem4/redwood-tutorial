export const standard = defineScenario({
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

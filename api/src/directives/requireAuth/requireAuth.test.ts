import { mockRedwoodDirective, getDirectiveName } from '@redwoodjs/testing/api'

import requireAuth from './requireAuth'

describe('requireAuth directive', () => {
  it('declares the directive sdl as schema, with the correct name', () => {
    expect(requireAuth.schema).toBeTruthy()
    expect(getDirectiveName(requireAuth.schema)).toBe('requireAuth')
  })

  it('requireAuth has stub implementation. Should not throw when current user', () => {
    // If you want to set values in context, pass it through e.g.
    // mockRedwoodDirective(requireAuth, { context: { currentUser: { id: "5e1923f3-e84c-4603-90a6-18302f95a6f8", name: 'Lebron McGretzky', roles: ['allstar'], } }})
    const mockExecution = mockRedwoodDirective(requireAuth, {
      context: {
        currentUser: {
          id: '5e1923f3-e84c-4603-90a6-18302f95a6f8',
          email: 'bob@mcbobface.com',
          roles: ['String'],
        },
      },
    })

    expect(mockExecution).not.toThrowError()
  })
})

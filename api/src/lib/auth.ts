import { AuthenticationError, ForbiddenError } from '@redwoodjs/graphql-server'

import { db } from './db'

export const getCurrentUser = async (session) => {
  return await db.user.findUnique({
    where: { id: session.id },
    select: { id: true, email: true, roles: true },
  })
}

export const isAuthenticated = (): boolean => {
  return !!context.currentUser
}

type AllowedRoles = string | string[] | undefined

export const hasRole = (roles: AllowedRoles): boolean => {
  if (!isAuthenticated()) {
    return false
  }

  const currentUserRoles = context.currentUser?.roles

  if (typeof roles === 'string') {
    // roles to check is a string, currentUser.roles is an array
    return currentUserRoles?.some((allowedRole) => roles === allowedRole)
  }

  if (Array.isArray(roles)) {
    return currentUserRoles?.some((allowedRole) => roles.includes(allowedRole))
  }

  // roles not found
  return false
}

export const requireAuth = ({ roles }: { roles?: AllowedRoles } = {}) => {
  if (!isAuthenticated()) {
    throw new AuthenticationError("You don't have permission to do that.")
  }

  if (roles && !hasRole(roles)) {
    throw new ForbiddenError("You don't have access to do that.")
  }
}

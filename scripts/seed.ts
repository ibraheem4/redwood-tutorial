import {
  randSentence,
  randFullName,
  randParagraph,
  randEmail,
} from '@ngneat/falso'
import { PrismaClient } from '@prisma/client'
import type { Prisma } from '@prisma/client'
import { db } from 'api/src/lib/db'
import CryptoJS from 'crypto-js'

const prisma = new PrismaClient()

const ADMIN_PASSWORD = 'AdminPassword'
const MODERATOR_PASSWORD = 'ModeratorPassword'
const USER_PASSWORD = 'UserPassword'

const USER_COUNT = 50
const CONTACT_COUNT = 50
const MIN_COMMENT_COUNT = 0
const MAX_COMMENT_COUNT = 100
const MIN_POST_COUNT = 10
const MAX_POST_COUNT = 100

const _generatePosts = () => {
  const n = _randomInteger(MIN_POST_COUNT, MAX_POST_COUNT)
  return Array(n)
    .fill(null)
    .map(() => {
      return {
        title: randSentence(),
        body: randParagraph(),
        comments: {
          create: _generateComments(),
        },
      }
    })
}

const _generateComments = () => {
  const n = _randomInteger(MIN_COMMENT_COUNT, MAX_COMMENT_COUNT)
  return Array(n)
    .fill(null)
    .map(() => {
      return {
        name: randFullName(),
        body: randSentence(),
      }
    })
}

const seedAdminUsers = async () => {
  const users = [
    {
      name: 'admin',
      email: 'admin@admin.com',
      password: ADMIN_PASSWORD,
      roles: ['admin'],
    },
    {
      name: 'moderator',
      email: 'moderator@moderator.com',
      password: MODERATOR_PASSWORD,
      roles: ['moderator'],
    },
  ]

  for (const user of users) {
    const [hashedPassword, salt] = _hashPassword(user.password)
    await db.user
      .create({
        data: {
          name: user.name,
          email: user.email,
          hashedPassword,
          salt,
          roles: user.roles,
          posts: {
            create: _generatePosts(),
          },
        },
      })
      .then(console.log)
      .catch(console.error)
    console.info(`- Created user: ${user.name} with password: ${user.password}`)
    console.info(`- Please don't use this login in a production environment`)
  }
}

const seedUsers = async (n: number = USER_COUNT) => {
  const [hashedPassword, salt] = _hashPassword(USER_PASSWORD)
  const users: Prisma.UserCreateManyInput[] = Array(n)
    .fill(null)
    .map(() => {
      return {
        email: randEmail(),
        name: randFullName(),
        hashedPassword: hashedPassword,
        salt: salt,
      }
    })
  await prisma.user
    .createMany({
      skipDuplicates: true,
      data: users,
    })
    .then(console.log)
    .catch(console.error)
}

const seedContacts = async (n: number = CONTACT_COUNT) => {
  const contacts: Prisma.ContactCreateManyInput[] = Array(n)
    .fill(null)
    .map(() => {
      return {
        name: randFullName(),
        email: randEmail(),
        message: randSentence(),
      }
    })
  await prisma.contact
    .createMany({
      skipDuplicates: true,
      data: contacts,
    })
    .then(console.log)
    .catch(console.error)
}

export default async () => {
  try {
    seedAdminUsers()
    seedUsers()
    seedContacts()
  } catch (error) {
    console.warn('Please define your seed data.')
    console.error(error)
  }
}

// https://github.com/redwoodjs/redwood/issues/5793
// https://github.com/redwoodjs/redwood/blob/main/packages/api/src/functions/dbAuth/DbAuthHandler.ts#L1288
const _hashPassword = (text: string, salt?: string) => {
  const useSalt = salt || CryptoJS.lib.WordArray.random(128 / 8).toString()

  return [
    CryptoJS.PBKDF2(text, useSalt, { keySize: 256 / 32 }).toString(),
    useSalt,
  ]
}

// Returns an integer random number between min (included) and max (included)
const _randomInteger = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

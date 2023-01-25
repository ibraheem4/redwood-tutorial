import type { Prisma } from '@prisma/client'
import { db } from 'api/src/lib/db'
import Chance from 'chance'
import CryptoJS from 'crypto-js'

const ADMIN_PASSWORD = 'AdminPassword'
const MODERATOR_PASSWORD = 'ModeratorPassword'

const chance = new Chance()

export default async () => {
  try {
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
      await db.user.create({
        data: {
          name: user.name,
          email: user.email,
          hashedPassword,
          salt,
          roles: user.roles,
          posts: {
            create: [
              {
                title: chance.sentence(),
                body: chance.paragraph(),
                comments: {
                  create: [
                    {
                      name: chance.name(),
                      body: chance.sentence(),
                    },
                    {
                      name: chance.name(),
                      body: chance.sentence(),
                    },
                    {
                      name: chance.name(),
                      body: chance.sentence(),
                    },
                  ],
                },
              },
              {
                title: chance.sentence(),
                body: chance.paragraph(),
              },
            ],
          },
        },
      })
      console.info(
        `- Created user: ${user.name} with password: ${user.password}`
      )
      console.info(`- Please don't use this login in a production environment`)
    }
    const contactData: Prisma.ContactCreateArgs['data'][] = [
      {
        name: chance.name(),
        email: chance.email(),
        message: chance.sentence(),
      },
      {
        name: chance.name(),
        email: chance.email(),
        message: chance.sentence(),
      },
      {
        name: chance.name(),
        email: chance.email(),
        message: chance.sentence(),
      },
    ]

    Promise.all(
      contactData.map(async (data: Prisma.ContactCreateArgs['data']) => {
        const record = await db.contact.create({ data })
        console.log(record)
      })
    )
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

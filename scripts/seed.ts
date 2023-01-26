import {
  randSentence,
  randFullName,
  randParagraph,
  randEmail,
} from '@ngneat/falso'
import type { Prisma } from '@prisma/client'
import { db } from 'api/src/lib/db'
import CryptoJS from 'crypto-js'

const ADMIN_PASSWORD = 'AdminPassword'
const MODERATOR_PASSWORD = 'ModeratorPassword'

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
                title: randSentence(),
                body: randParagraph(),
                comments: {
                  create: [
                    {
                      name: randFullName(),
                      body: randSentence(),
                    },
                    {
                      name: randFullName(),
                      body: randSentence(),
                    },
                    {
                      name: randFullName(),
                      body: randSentence(),
                    },
                  ],
                },
              },
              {
                title: randSentence(),
                body: randParagraph(),
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
        name: randFullName(),
        email: randEmail(),
        message: randSentence(),
      },
      {
        name: randFullName(),
        email: randEmail(),
        message: randSentence(),
      },
      {
        name: randFullName(),
        email: randEmail(),
        message: randSentence(),
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

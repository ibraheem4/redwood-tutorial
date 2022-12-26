import type { Prisma } from '@prisma/client'
import { db } from 'api/src/lib/db'

export default async () => {
  try {
    const data: Prisma.UserCreateArgs['data'][] = [
      {
        id: 1,
        name: null,
        email: 'admin@admin.com',
        hashedPassword:
          '9e2038890dd6370bed2e80b0ee17109876a5f94b76c2baaf83c5225bc559df54',
        salt: 'a271de3ce442031a61bf70166644437b',
        resetToken: null,
        resetTokenExpiresAt: null,
      },
    ]
    console.info('')
    console.info('  Seeding admin user:')
    console.info('')
    console.info('    Email: admin@admin.com')
    console.info('    Password: AdminPassword')
    console.info('')
    console.info(`  (Please don't use this login in a production environment)`)
    console.info('')

    // Note: if using PostgreSQL, using `createMany` to insert multiple records is much faster
    // @see: https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#createmany
    Promise.all(
      data.map(async (data: Prisma.UserCreateArgs['data']) => {
        const record = await db.user.create({ data })
        console.log(record)
      })
    )

    // If using dbAuth and seeding users, you'll need to add a `hashedPassword`
    // and associated `salt` to their record. Here's how to create them using
    // the same algorithm that dbAuth uses internally:
    //
    //   import { hashPassword } from '@redwoodjs/api'
    //
    //   const users = [
    //     { name: 'john', email: 'john@example.com', password: 'secret1' },
    //     { name: 'jane', email: 'jane@example.com', password: 'secret2' }
    //   ]
    //
    //   for (user of users) {
    //     const [hashedPassword, salt] = hashPassword(user.password)
    //     await db.user.create({
    //       data: {
    //         name: user.name,
    //         email: user.email,
    //         hashedPassword,
    //         salt
    //       }
    //     })
    //   }
  } catch (error) {
    console.warn('Please define your seed data.')
    console.error(error)
  }
}

import type { Prisma } from '@prisma/client'
import { db } from 'api/src/lib/db'

export default async () => {
  try {
    const userData: Prisma.UserCreateArgs['data'][] = [
      {
        name: 'Admin User',
        email: 'admin@admin.com',
        hashedPassword:
          '9e2038890dd6370bed2e80b0ee17109876a5f94b76c2baaf83c5225bc559df54',
        salt: 'a271de3ce442031a61bf70166644437b',
        resetToken: null,
        resetTokenExpiresAt: null,
        roles: ['admin'],
        posts: {
          create: [
            {
              title: 'Welcome to the blog!',
              body: "I'm baby single- origin coffee kickstarter lo - fi paleo skateboard.Tumblr hashtag austin whatever DIY plaid knausgaard fanny pack messenger bag blog next level woke.Ethical bitters fixie freegan,helvetica pitchfork 90's tbh chillwave mustache godard subway tile ramps art party. Hammock sustainable twee yr bushwick disrupt unicorn, before they sold out direct trade chicharrones etsy polaroid hoodie. Gentrify offal hoodie fingerstache.",
              comments: {
                create: [
                  {
                    name: 'Mario Mario',
                    body: 'Mamma mia!',
                  },
                  {
                    name: 'Luigi Mario',
                    body: 'Okey-dokey!',
                  },
                  {
                    name: 'Yoshi',
                    body: 'Alright!',
                  },
                ],
              },
            },
            {
              title: 'A little more about me',
              body: "Raclette shoreditch before they sold out lyft. Ethical bicycle rights meh prism twee. Tote bag ennui vice, slow-carb taiyaki crucifix whatever you probably haven't heard of them jianbing raw denim DIY hot chicken. Chillwave blog succulents freegan synth af ramps poutine wayfarers yr seitan roof party squid. Jianbing flexitarian gentrify hexagon portland single-origin coffee raclette gluten-free. Coloring book cloud bread street art kitsch lumbersexual af distillery ethical ugh thundercats roof party poke chillwave. 90's palo santo green juice subway tile, prism viral butcher selvage etsy pitchfork sriracha tumeric bushwick.",
            },
          ],
        },
      },
      {
        name: 'Moderator User',
        email: 'moderator@moderator.com',
        hashedPassword:
          '830a417c433c10e98b576fcf833a09a1095b05456138947286a1b459ed0cc136',
        salt: '1714d1a0952fdb253ea3e045fb8d2147',
        resetToken: null,
        resetTokenExpiresAt: null,
        roles: ['moderator'],
        posts: {
          create: [
            {
              title: 'Welcome to the blog!',
              body: "I'm baby single- origin coffee kickstarter lo - fi paleo skateboard.Tumblr hashtag austin whatever DIY plaid knausgaard fanny pack messenger bag blog next level woke.Ethical bitters fixie freegan,helvetica pitchfork 90's tbh chillwave mustache godard subway tile ramps art party. Hammock sustainable twee yr bushwick disrupt unicorn, before they sold out direct trade chicharrones etsy polaroid hoodie. Gentrify offal hoodie fingerstache.",
              comments: {
                create: [
                  {
                    name: 'Mario Mario',
                    body: 'Mamma mia!',
                  },
                  {
                    name: 'Luigi Mario',
                    body: 'Okey-dokey!',
                  },
                  {
                    name: 'Yoshi',
                    body: 'Alright!',
                  },
                ],
              },
            },
            {
              title: 'A little more about me',
              body: "Raclette shoreditch before they sold out lyft. Ethical bicycle rights meh prism twee. Tote bag ennui vice, slow-carb taiyaki crucifix whatever you probably haven't heard of them jianbing raw denim DIY hot chicken. Chillwave blog succulents freegan synth af ramps poutine wayfarers yr seitan roof party squid. Jianbing flexitarian gentrify hexagon portland single-origin coffee raclette gluten-free. Coloring book cloud bread street art kitsch lumbersexual af distillery ethical ugh thundercats roof party poke chillwave. 90's palo santo green juice subway tile, prism viral butcher selvage etsy pitchfork sriracha tumeric bushwick.",
            },
          ],
        },
      },
    ]

    // Note: if using PostgreSQL, using `createMany` to insert multiple records is much faster
    // @see: https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#createmany
    Promise.all(
      userData.map(async (data: Prisma.UserCreateArgs['data']) => {
        const record = await db.user.create({ data })
        console.log(record)
      })
    )

    console.info('')
    console.info('  Seeded admin user:')
    console.info('')
    console.info('    Name: Admin User')
    console.info('    Email: admin@admin.com')
    console.info('    Password: AdminPassword')
    console.info('')
    console.info(`  (Please don't use this login in a production environment)`)
    console.info('')

    console.info('')
    console.info('  Seeded moderator user:')
    console.info('')
    console.info('    Name: Moderator User')
    console.info('    Email: moderator@moderator.com')
    console.info('    Password: ModeratorPassword')
    console.info('')
    console.info(`  (Please don't use this login in a production environment)`)
    console.info('')

    const contactData: Prisma.ContactCreateArgs['data'][] = [
      {
        name: 'Mario Mario',
        email: 'mario@mariobros.com',
        message: 'Mamma mia!',
      },
      {
        name: 'Luigi Mario',
        email: 'luigi@mariobros.com',
        message: 'Okey-dokey!',
      },
      {
        name: 'Yoshi',
        email: 'yoshi@mariobros.com',
        message: 'Alright!',
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

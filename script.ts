import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {

  const users = await prisma.user.create(
    {
      data: {
        name: "ted",
        email: "hhh",
      }
    }
  )
  console.dir(users, { depth: null })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

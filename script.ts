import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {

  const users = await prisma.user.createMany(
    {
      data: [
        { email: "abc", name: "john" },
        { email: "abcdef", name: "johnny" },
      ]
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

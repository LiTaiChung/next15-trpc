import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

const todoData: Prisma.TodoCreateInput[] = [
  {
    text: '學習 Next.js',
    completed: false,
  },
  {
    text: '學習 tRPC',
    completed: true,
  },
  {
    text: '建構 Todo 應用',
    completed: false,
  },
]

export async function main() {
  console.log('開始清理資料...')
  await prisma.todo.deleteMany({})

  console.log('開始新增初始資料...')
  for (const t of todoData) {
    const todo = await prisma.todo.create({
      data: t,
    })
    console.log(`建立了 todo: ${todo.text}`)
  }
  console.log('資料新增完成！')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 
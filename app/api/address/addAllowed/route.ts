import { db } from '@/libs/drizzle/db'
import { contentAddresses } from '@/libs/drizzle/schema'

export default async function POST(req: Request) {
  const { addressId, contentIds } = await req.json()
  const date = new Date()
  const response = await contentIds.forEach((contentId: any) => {
    db.insert(contentAddresses).values({
      addressId,
      contentId,
      createdAt: date,
      updatedAt: date,
    })
  })
  return Response.json({ response })
}

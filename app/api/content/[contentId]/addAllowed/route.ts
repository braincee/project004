import { db } from '@/libs/drizzle/db'
import { contentAddresses, logs } from '@/libs/drizzle/schema'
import { v4 as uuidV4 } from 'uuid'

export async function POST(req: Request) {
  const { contentId, addressIds } = await req.json()
  const date = new Date()
  const response = await addressIds.forEach((addressId: any) => {
    db.insert(contentAddresses).values({
      addressId,
      contentId,
      createdAt: date,
      updatedAt: date,
    })
  })
  const id: any = uuidV4()
  const data = {
    id: id,
    log: Date.now() as any,
  }
  await db.insert(logs).values({ ...data, createdAt: date, updatedAt: date })

  return Response.json({ response })
}

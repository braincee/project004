import { db } from '@/libs/drizzle/db'
import { contentAddresses, logs } from '@/libs/drizzle/schema'
import { NextApiRequest, NextApiResponse } from 'next'
import { v4 as uuidV4 } from 'uuid'

export async function POST(req: NextApiRequest) {
  const { contentId, addressIds } = req.body
  const response = await addressIds.forEach((addressId: any) => {
    db.insert(contentAddresses).values({
      addressId,
      contentId,
    })
  })
  const id: any = uuidV4()
  const data = {
    id: id,
    log: Date.now() as any,
  }
  await db.insert(logs).values(data)

  return Response.json(response)
}

import { db } from '@/libs/drizzle/db'
import { contentAddresses } from '@/libs/drizzle/schema'
import { and, eq } from 'drizzle-orm'
import { NextApiRequest, NextApiResponse } from 'next'

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  const { contentId, addressIds } = req.body
  const response = await addressIds.forEach((addressId: string) => {
    db.delete(contentAddresses).where(
      and(
        eq(contentAddresses.contentId, contentId),
        eq(contentAddresses.addressId, addressId)
      )
    )
  })
  return Response.json(response)
}

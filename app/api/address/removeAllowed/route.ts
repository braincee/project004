import { db } from '@/libs/drizzle/db'
import { contentAddresses } from '@/libs/drizzle/schema'
import { and, eq } from 'drizzle-orm'

export default async function POST(req: Request) {
  const { contentIds, addressId } = await req.json()
  const response = await contentIds.forEach((contentId: string) => {
    db.delete(contentAddresses).where(
      and(
        eq(contentAddresses.contentId, contentId),
        eq(contentAddresses.addressId, addressId)
      )
    )
  })
  return Response.json({ response })
}

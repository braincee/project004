import { db } from '@/libs/drizzle/db'
import { contents } from '@/libs/drizzle/schema'
import { NextApiRequest } from 'next'

export async function POST(req: NextApiRequest) {
  const data = req.body
  const response = await db.insert(contents).values(data)

  return Response.json(response)
}

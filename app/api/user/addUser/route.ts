import { db } from '@/libs/drizzle/db'
import { users } from '@/libs/drizzle/schema'
import { NextApiRequest, NextApiResponse } from 'next'

export async function POST(req: NextApiRequest) {
  const data = req.body
  const response = await db.insert(users).values(data)
  return Response.json(response)
}

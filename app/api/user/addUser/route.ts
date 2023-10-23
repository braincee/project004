import { db } from '@/libs/drizzle/db'
import { Users } from '@/libs/drizzle/schema'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function GET(req: NextApiRequest) {
  const data = req.body
  const response = await db.insert(Users).values(data)
  return Response.json(response)
}

import { NextApiRequest, NextApiResponse } from 'next'
import { compareSync } from 'bcrypt-ts'
import { db } from '@/libs/drizzle/db'

const comparePassword = (password: string, hash: any) => {
  const result = compareSync(password, hash)
  return result
}

export async function POST(req: NextApiRequest) {
  const data = req.body
  const user = JSON.parse(
    JSON.stringify(
      await db.query.users.findMany({
        where: (users, { eq }) => eq(users.email, data.email),
      })
    )
  )
  let response
  if (user) {
    const status = comparePassword(data.password, user.password)
    if (status) {
      response = {
        id: user.id,
        email: user.email,
      }
    } else {
      response = 'Invalid password'
    }
  } else {
    response = null
  }

  return Response.json(response)
}

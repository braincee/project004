import { db } from '@/libs/drizzle/db'

export default async function GET() {
  const response = await db.query.addresses.findMany({
    orderBy: (address, { desc }) => [desc(address.createdAt)],
    with: {
      ContentAddresses: {
        columns: {
          contentId: false,
          addressId: false,
          createdAt: false,
          updatedAt: false,
        },
        with: {
          content: true,
        },
      },
    },
  })
  return Response.json({ response })
}

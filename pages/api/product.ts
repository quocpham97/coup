import type { NextApiRequest, NextApiResponse } from 'next'
import Product from 'models/product'
import dbConnect from 'libs/dbConnect'
import { IProduct } from 'types'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req

  await dbConnect()

  switch (method) {
    case 'POST':
      try {
        const { id } = req.body as {
          id: string
        }

        if (!id) {
          res.status(200).json({ success: false, data: [] })
          return
        }

        const product = await Product.findOne<IProduct>({ _id: id }).exec()

        res.status(200).json({ success: true, product })
      } catch (error) {
        res.status(400).json(null)
      }
      break

    default:
      res.setHeader('Allow', ['POST'])
      res.status(405).end(`Method ${method || ''} Not Allowed`)
      break
  }
}

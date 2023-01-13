import Ably from 'ably/promises';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = new Ably.Realtime(process.env.ABLY_API_KEY as string);
  const clientId =
    Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  const tokenRequestData = await client.auth.createTokenRequest({ clientId });
  res.status(200).json(tokenRequestData);
}

import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    await res.revalidate('/');
  } catch (err) {
    res.status(500).send('Revalidation Failed');
  }
}

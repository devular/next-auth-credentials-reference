import { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';
import argon2 from 'argon2';
import { prisma } from '../../../lib/db';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Only POST method allowed' });
    return;
  }
  const session = await getToken({ req });
  if (session) {
    res.status(403).json({ message: 'You are already authenticated' });
    return;
  }
  const { email, password, confirmPassword } = req.body;
  if (password !== confirmPassword) {
    res.status(400).json({ message: 'Passwords do not match' });
    return;
  }
  const exists = await prisma.user.findUnique({ where: { email } });
  if (exists) res.json({ success: false, message: 'User already exists' });
  else if (!email || !email.includes('@') || !password)
    res.json({ success: false, message: 'Invalid data' });
  else {
    await prisma.user.create({
      data: { email, password: await argon2.hash(password) },
    });
    res.json({ success: true });
  }
};
export default handler;

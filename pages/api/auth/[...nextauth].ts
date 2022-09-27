import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from '../../../lib/db';
import argon2 from 'argon2';
import { SessionStrategy } from 'next-auth/core/types';

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        const submittedCredentials = credentials;
        // Find user by email
        const userToCheck = await prisma.user.findFirst({
          where: { email: submittedCredentials?.email },
        });
        // Do a fast check
        if (userToCheck?.password && submittedCredentials?.password)
          if (
            // Do a cryptographically secure check
            await argon2.verify(
              userToCheck?.password,
              submittedCredentials?.password
            )
          ) {
            // Return the user object
            // You can also fetch more data from the database at this point
            // If you want the session to store more user data like, roles, team memberships, etc.
            return userToCheck;
          }
        return null;
      },
    }),
  ],
  pages: {
    signIn: '/sign-in',
    // New users will be directed here on first sign in
    newUser: '/app/dashboard',
  },
  callbacks: {
    async redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
      // Allows relative callback URLs
      if (url.startsWith('/')) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
  session: {
    strategy: 'jwt' as SessionStrategy,
  },
};

export default NextAuth(authOptions);

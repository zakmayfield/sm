import { db } from '@/lib/db';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { nanoid } from 'nanoid';
import { NextAuthOptions, getServerSession } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/sign-in',
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async session({ token, session }) {
      // declare which values are accessible when requesting session data from next-auth
      // via getServerSession()
      if (token) {
        // next-auth is aware of this session type via `types/next-auth.d.ts`
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
        session.user.username = token.username;
      }
      return session;
    },

    async jwt({ token, user }) {
      const dbUser = await db.user.findFirst({
        where: {
          email: token.email,
        },
      });

      if (!dbUser) {
        token.id = user!.id;
        return token;
      }

      // username will typeerror IF default next-auth prisma tables don't include a username column
      if (!dbUser.username) {
        const generatedUsername = nanoid(10);

        await db.user.update({
          where: {
            id: dbUser.id,
          },
          data: {
            username: generatedUsername,
          },
        });
      }

      return {
        id: dbUser.id,
        email: dbUser.email,
        name: dbUser.name,
        picture: dbUser.image,
        username: dbUser.username,
      };
    },

    redirect() {
      return '/ ';
    },
  },
};

export const getAuthSession = () => getServerSession(authOptions);

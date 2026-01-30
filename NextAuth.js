npm install next-auth

import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: '/login', // Optional: your custom login page
  },
  callbacks: {
    async session({ session, token }) {
      return session;
    },
  },
});

export { handler as GET, handler as POST };

"use client";
import { signIn, useSession, signOut } from "next-auth/react";

export default function LoginPage() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="flex items-center gap-4 bg-gray-100 p-2 rounded-lg">
        <img src={session.user?.image!} className="w-8 h-8 rounded-full" />
        <div className="text-sm">
          <p className="font-bold">{session.user?.name}</p>
          <button onClick={() => signOut()} className="text-red-500 hover:underline">Logout</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="p-10 bg-white shadow-xl rounded-2xl text-center">
        <h1 className="text-3xl font-bold mb-6">Welcome to ReachInbox</h1>
        <button 
          onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
          className="flex items-center gap-3 px-6 py-3 border border-gray-300 rounded-full hover:bg-gray-50 transition"
        >
          <img src="https://authjs.dev/img/providers/google.svg" width="24" />
          <span>Sign in with Google</span>
        </button>
      </div>
    </div>
  );
}


import { SessionProvider } from "next-auth/react";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}

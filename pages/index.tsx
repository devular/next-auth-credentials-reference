import type { NextPage } from 'next';
import Link from 'next/link';

const Home: NextPage = () => {
  return (
    <>
      <h1>Welcome to Next.js + Next Auth</h1>
      <article>
        <h2>
          This is a reference app for using the <code>credentials</code>{' '}
          provider with <code>next-auth</code>
        </h2>
        <p>
          We use an SQLite database with Prisma to work through the various
          parts required to get it working.
        </p>
        <ol>
          <li>Registration</li>
          <li>Login</li>
          <li>Authenticated Pages</li>
          <li>Authenticated APIs</li>
        </ol>
        <p>To get started either Login or Register:</p>
        <Link href="/sign-in">Sign in</Link> or{' '}
        <Link href="/register">Register</Link>
        <section></section>
      </article>
    </>
  );
};

export default Home;

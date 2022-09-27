import type { GetServerSideProps, NextPage } from 'next';
import { authOptions } from './api/auth/[...nextauth]';
import { unstable_getServerSession } from 'next-auth/next';

const ProtectedRoute: NextPage<{ session: any }> = ({ session }) => {
  return (
    <article>
      <h1>Auth protected Route</h1>
      <section>
        <p>Welcome to a protected Route. (Auth required)</p>
        <p>
          Any route that lives outside <code>pages/app</code> is unprotected. If
          you want to protect routes outside there, you can either change the
          matcher or add <code>unstable_getServerSession</code>
        </p>
        <p>
          This route is not in the protected <code>app</code> folder, but
          instead uses <code>unstable_getServerSession</code>
        </p>
        <p>
          You can see the code at <code>pages/protected-route.tsx</code>
          <details>
            <summary>Current Session</summary>
            <code>
              <pre>{JSON.stringify(session, null, 2)}</pre>
            </code>
          </details>
        </p>
      </section>
    </article>
  );
};

export default ProtectedRoute;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  if (!session) {
    return {
      redirect: {
        destination: '/401',
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
};

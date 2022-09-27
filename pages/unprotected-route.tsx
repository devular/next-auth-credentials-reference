import type { NextPage } from 'next';

const UnprotectedRoute: NextPage = () => {
  return (
    <article>
      <h1>Unprotected Route</h1>
      <section>
        <p>Welcome to an unprotected Route. (No auth required)</p>
        <p>
          Any route that live outside <code>pages/app</code> is unprotected
        </p>
        <p>
          To protect all routes change the matcher in{' '}
          <code>./middleware.ts</code> in the project root.
        </p>
      </section>
    </article>
  );
};

export default UnprotectedRoute;

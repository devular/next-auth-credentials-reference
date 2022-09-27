import type { NextPage } from 'next';

const Dashboard: NextPage = () => {
  return (
    <article>
      <h1>Dashboard</h1>
      <section>
        <p>Welcome to your dashboard.</p>
        <p>
          This route is protected by the Next Auth middleware in{' '}
          <code>./middleware.ts</code>
        </p>
        <p>
          Any page or route in the <code>pages/app/</code> folder is protected
          by default
        </p>
      </section>
    </article>
  );
};

export default Dashboard;

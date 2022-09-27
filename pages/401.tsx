import type { NextPage } from 'next';
import Link from 'next/link';

const FourZeroOne: NextPage = () => {
  return (
    <>
      <h1>401: Unauthorized</h1>
      <article>
        <h2>
          You have attempted to access a protected route without being signed in
        </h2>
        <p>You have been redirected to this URL</p>
      </article>
    </>
  );
};

export default FourZeroOne;

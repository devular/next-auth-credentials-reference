import { signOut } from 'next-auth/react';
import type { AppProps } from 'next/app';
import Link from 'next/link';
import '../styles/mvp.css';
import GithubCorner from '../components/github-corner';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <main>
        <nav>
          <Link href="/">Next Auth Credentials Reference</Link>
          <ul>
            <li data-cy="sign-in-list-item">
              <Link href="/sign-in">Sign in</Link>
            </li>
            <li>
              <Link href="/register">Register</Link>
            </li>
            <li>
              <Link href="/unprotected-route">Unprotected Route</Link>
            </li>
            <li>
              <Link href="/protected-route">Protected Route</Link>
            </li>
            <li>
              <Link href="/app/dashboard">Protected App</Link>
            </li>
            <li data-cy="sign-out-list-item">
              {/* Slightly strange name callbackUrl, i.e where to go after a logout */}
              <a href="#" onClick={() => signOut({ callbackUrl: '/' })}>
                Sign Out
              </a>
            </li>
          </ul>
        </nav>

        <Component {...pageProps} />
        {process.env.NODE_NV === 'production' ? (
          <GithubCorner href="https://github.com/devular/next-auth-credentials-reference" />
        ) : null}
        <footer>
          <p>© {new Date().getFullYear()} Devular</p>
        </footer>
      </main>
    </>
  );
}

export default MyApp;

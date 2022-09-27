import { signOut } from 'next-auth/react';
import type { AppProps } from 'next/app';
import Link from 'next/link';
import '../styles/mvp.css';
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <main>
      <nav>
        <Link href="/">Next Auth Credentials Reference</Link>
        <ul>
          <li>
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
          <li>
            {/* Slightly strange name callbackUrl, i.e where to go after a logout */}
            <a href="#" onClick={() => signOut({ callbackUrl: '/' })}>
              Log Out
            </a>
          </li>
        </ul>
      </nav>

      <Component {...pageProps} />
      <footer>
        <p>© {new Date().getFullYear()} Devular</p>
      </footer>
    </main>
  );
}

export default MyApp;

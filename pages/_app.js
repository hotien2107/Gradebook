import { AuthUserProvider } from '../context/auth-context';
import '../styles/globals.scss';

function MyApp({ Component, pageProps }) {
  return (
    <AuthUserProvider>
      <Component {...pageProps} />
    </AuthUserProvider>
  );
}

export default MyApp;

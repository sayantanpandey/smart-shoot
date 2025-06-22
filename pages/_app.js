import '../styles/globals.css';
import { AuthProvider } from '../context/AuthContext';
import Layout from '../components/Layout';
import { Toaster } from 'react-hot-toast';

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
    <Layout>
      <Toaster position="top-center" toastOptions={{ duration: 4000 }} />
      <Component {...pageProps} />
    </Layout> 
    </AuthProvider>
  );
}
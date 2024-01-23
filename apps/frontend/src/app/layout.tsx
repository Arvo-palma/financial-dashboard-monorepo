import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import PrivateRoute from './core/components/private-route';
import './globals.css';
import { AuthProvider } from './login/providers/auth-provider';
import QueryClientProvider from './login/providers/query-client-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Financial Dashboard',
  description: 'Bix technical challenge',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {' '}
        <QueryClientProvider>
          <AuthProvider>
            <PrivateRoute>{children}</PrivateRoute>
          </AuthProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}

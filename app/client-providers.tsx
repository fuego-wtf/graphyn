'use client';

import { ClerkProvider } from '@clerk/nextjs';
import { ThemeProvider } from 'next-themes';
import Provider from './provider';

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <ClerkProvider
        appearance={{ variables: { colorPrimary: '#000000' } }}
        signInUrl="/sign-in"
        signUpUrl="/sign-up"
      >
        <Provider>
          {children}
        </Provider>
      </ClerkProvider>
    </ThemeProvider>
  );
} 
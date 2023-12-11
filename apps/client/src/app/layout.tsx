import React from 'react';
import { Metadata } from 'next';
import { AppShell, AppShellMain, AppShellNavbar, MantineProvider, ColorSchemeScript } from '@mantine/core';

import { theme } from './theme';
import { SFProDisplay } from './fonts';
import { Providers } from './providers';

import { NavBar } from '@/components/common/NavBar';

import '@/styles/globals.scss';
import '@mantine/core/styles.css';

export const metadata: Metadata = {
  title: 'Engineering Leaderboard',
  description: 'Engineering Leaderboard'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={SFProDisplay.className}>
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no" />
      </head>
      <body>
        <MantineProvider theme={theme} withCssVariables>
          <AppShell
            navbar={{
              width: 300,
              breakpoint: 'sm',
              collapsed: { mobile: false }
            }}
          >
            <AppShellNavbar>
              <NavBar />
            </AppShellNavbar>
            <AppShellMain>
              <Providers>{children}</Providers>
            </AppShellMain>
          </AppShell>
        </MantineProvider>
      </body>
    </html>
  );
}

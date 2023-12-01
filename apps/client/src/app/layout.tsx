import {
  rem,
  AppShell,
  createTheme,
  AppShellMain,
  AppShellNavbar,
  MantineProvider,
  ColorSchemeScript
} from '@mantine/core';
import React from 'react';
import { Metadata } from 'next';
import { Open_Sans } from 'next/font/google';

import { Providers } from './providers';
import { Navbar } from '@/components/NavBar';

import '@/styles/globals.scss';
import '@mantine/core/styles.css';
import styles from './page.module.scss';

const theme = createTheme({
  primaryColor: 'bright-pink',
  colors: {
    'ocean-blue': [
      '#7AD1DD',
      '#5FCCDB',
      '#44CADC',
      '#2AC9DE',
      '#1AC2D9',
      '#11B7CD',
      '#09ADC3',
      '#0E99AC',
      '#128797',
      '#147885'
    ],
    'bright-pink': [
      '#F0BBDD',
      '#ED9BCF',
      '#EC7CC3',
      '#ED5DB8',
      '#F13EAF',
      '#F71FA7',
      '#FF00A1',
      '#E00890',
      '#C50E82',
      '#AD1374',
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
    ]
  },

  defaultRadius: 'xl',
  shadows: {
    md: '1px 1px 3px rgba(0, 0, 0, .25)',
    xl: '5px 5px 3px rgba(0, 0, 0, .25)'
  },

  headings: {
    fontFamily: 'Roboto, sans-serif',
    sizes: {
      h1: { fontSize: rem(36) }
    }
  }
});

export const metadata: Metadata = {
  title: 'Engineering Leaderboard',
  description: 'Engineering Leaderboard'
};

const openSans = Open_Sans({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin']
});

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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
            padding="md"
          >
            <AppShellNavbar p="md" className={styles.NoRightPadding}>
              <Navbar />
            </AppShellNavbar>
            <AppShellMain className={openSans.className}>
              <Providers>{children}</Providers>
            </AppShellMain>
          </AppShell>
        </MantineProvider>
      </body>
    </html>
  );
}

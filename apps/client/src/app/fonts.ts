import localFont from 'next/font/local';
import { Open_Sans } from 'next/font/google';

export const SFProDisplay = localFont({
  src: [
    {
      path: './fonts/SF-Pro-Display-Regular.otf',
      weight: '400',
      style: 'normal'
    },
    {
      path: './fonts/SF-Pro-Display-Semibold.otf',
      weight: '600',
      style: 'normal'
    },
    {
      path: './fonts/SF-Pro-Display-Bold.otf',
      weight: '700',
      style: 'normal'
    }
  ],
  display: 'swap',
  variable: '--font-sf-pro-display'
});

export const OpenSans = Open_Sans({
  weight: ['400'],
  subsets: ['latin']
});

import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Engineering Leaderboard',
  description: 'Engineering Leaderboard'
};

export default function ChallangesLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div>
        <p>search component</p>
      </div>
      <div>{children}</div>
    </div>
  );
}

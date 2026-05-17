import React from 'react';
import { GeistSans } from 'geist/font/sans';

import '../styles/globals.css';

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Lucky Draw</title>
      </head>
      <body className={GeistSans.className}>{children}</body>
    </html>
  );
}

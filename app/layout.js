import './globals.css';

export const metadata = {
  title: 'Abdal Khalil — Paid Media & Performance Marketing',
  description:
    'Google Ads, Local Services Ads and Meta Ads managed for US, Canada, UK and UAE clients. $600K+ in ad spend, 60+ live accounts, measurement built before budget scales.',
  openGraph: {
    title: 'Abdal Khalil — Paid Media & Performance Marketing',
    description:
      'Google Ads, Local Services Ads and Meta Ads managed for US, Canada, UK and UAE clients. $600K+ in ad spend across 60+ live accounts.',
    type: 'website',
  },
};

export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#05060A' },
    { media: '(prefers-color-scheme: light)', color: '#F9FAFC' },
  ],
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  const noFlash = `(function(){try{var t=localStorage.getItem('abdal-theme');if(!t){t='dark';}document.documentElement.setAttribute('data-theme',t);}catch(e){document.documentElement.setAttribute('data-theme','dark');}})();`;

  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: noFlash }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Dancing+Script:wght@600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-bg text-fg/90 antialiased">{children}</body>
    </html>
  );
}

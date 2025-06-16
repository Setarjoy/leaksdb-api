export const metadata = {
  title: 'LeaksDB API',
  description: 'API for searching leaks database',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

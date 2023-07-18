import './globals.css'

export const metadata = {
  title: 'What to Make?',
  description: 'A GPT-Powered Voice App that recommends you recipes',
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


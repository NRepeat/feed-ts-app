import { Provider } from './components/Provider/provider'
import './globals.css'




export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (

    <html lang="en">
      <Provider>
        <body >{children}</body>

      </Provider>
    </html>
  )
}

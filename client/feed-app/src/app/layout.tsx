
import Header from './components/Header/header'
import './globals.css'
import Footer from "@/app/components/Footer/footer"
import ReduxProvider from './provider/reduxProvider'
import { ProviderSession } from './provider/provider'


export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {


  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <ProviderSession>
          <ReduxProvider>
            < Header />
            {children}
            <Footer />
          </ReduxProvider>
        </ProviderSession>
      </body>
    </html>

  )
}

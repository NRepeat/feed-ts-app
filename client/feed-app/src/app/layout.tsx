
import Header from './components/Header/header'
import './globals.css'
import { ProviderSession } from './provider/provider'
import Footer from "@/app/components/Footer/footer"



export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {


  return (


    <html lang="en">
      <body suppressHydrationWarning={true}>
        <ProviderSession>
        < Header />

          {children}
          <Footer />
        </ProviderSession>

      </body>
    </html>

  )
}

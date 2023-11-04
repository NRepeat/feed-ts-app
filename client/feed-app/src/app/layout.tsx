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
      <body>
        <ProviderSession>
            {children}
        </ProviderSession>
        <Footer/>
      </body>
    </html>

  )
}

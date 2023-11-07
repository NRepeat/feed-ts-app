
import { Provider } from 'react-redux'
import Header from './components/Header/header'
import './globals.css'
import { ProviderSession } from './provider/provider'
import Footer from "@/app/components/Footer/footer"
import store from "./redux/store";


export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {


  return (


    <html lang="en">
      <body suppressHydrationWarning={true}>
        <ProviderSession>
          <Provider store={store}>
            < Header />

            {children}
            <Footer />
          </Provider>

        </ProviderSession>

      </body>
    </html>

  )
}

import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Header from '../components/header'
import Footer from '../components/footer'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex flex-col items-center p-8 flex-1">
        <Component {...pageProps} />
      </main>
      <Footer />
    </div>
  )
}

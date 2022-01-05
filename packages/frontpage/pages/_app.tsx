import { AppProps } from 'next/app'
import '../styles/index.css'

export default function MyApp({ Component, pageProps }: AppProps) {
  console.log('frontpage');
  
  return <Component {...pageProps} />
}

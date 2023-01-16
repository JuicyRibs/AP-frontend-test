import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { Navbar } from '@/component/Layout/Navbar';

config.autoAddCss = false;

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className='font-prompt'>
      <Navbar />
      <Component {...pageProps} />
    </div>
  );
}

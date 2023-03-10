import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Layout from '../components/ui/layout';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.svg" />
        <title>Menu Helper</title>
        <meta
          name="description"
          content="A simple application to help build and persist a weekly food menu."
        />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </LocalizationProvider>
  );
}

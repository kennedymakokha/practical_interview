import type { AppProps } from 'next/app'
import '../app/globals.css'
import toast, { Toaster } from 'react-hot-toast';

const notify = () => toast('Here is your toast.');
export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <Component {...pageProps} />
            <Toaster />

        </>
    );
}
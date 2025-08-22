import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import HeaderBar from '../components/HeaderBar';
import './globals.css';
import Footer from '../components/Footer';
import Script from 'next/script';  // Import Next.js Script component for client-side scripts
import AnimationTrigger from '../components/AnimationTrigger';

export default async function RootLayout({ children, params: paramsPromise }) {
    const params = await paramsPromise; // ✅ await before using
    const messages = await getMessages({ locale: params.locale });
    const { locale } = params;
    return (
        <html lang={locale}>
            <body>
                {/* Pass both locale and messages to the provider */}
                <NextIntlClientProvider locale={locale} messages={messages}>
                    {/* Wrap the content */}
                    <HeaderBar />
                    <main>{children}</main>
                    <Footer />
                </NextIntlClientProvider>
                <AnimationTrigger />
            </body>
        </html>
    );
}
    
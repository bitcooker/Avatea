import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import "react-multi-carousel/lib/styles.css";
import Layout from "../src/components/Layout";
import Router from 'next/router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { GoogleAnalytics } from "nextjs-google-analytics";


Router.events.on('routeChangeStart', () => NProgress.start()); Router.events.on('routeChangeComplete', () => NProgress.done()); Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
        <GoogleAnalytics trackPageViews />
        <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;

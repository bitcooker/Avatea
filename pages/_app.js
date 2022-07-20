import "../styles/main.scss";
import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import "react-multi-carousel/lib/styles.css";
import Layout from "../src/components/Layout";

import { AppWrapper } from "../src/context/AppContext";

function MyApp({ Component, pageProps }) {
  return (
    <AppWrapper>
        <Layout>
            <Component {...pageProps} />
        </Layout>
    </AppWrapper>
  );
}

export default MyApp;

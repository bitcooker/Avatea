import '../styles/main.scss'
import '../styles/globals.css'
import 'react-toastify/dist/ReactToastify.css';
import Layout from "../src/components/Layout";

function MyApp({ Component, pageProps }) {
  return <Layout>
    <Component {...pageProps} />
  </Layout>
}

export default MyApp

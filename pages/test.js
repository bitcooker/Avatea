import styles from '../styles/Home.module.css'
import axios from 'axios';
import {useWallet} from "use-wallet";
import {useState, useEffect} from "react";

export default function Home() {

  const wallet = useWallet();

  const [savedVaults,setSavedVaults] = useState({});
  const [investedVaults,setInvestedVaults] = useState({});
  const [investedMarketMakingPool,setInvestedMarketMakingPool] = useState({});
  const [savedMarketMakingPool,setSavedMarketMakingPool] = useState({});



  const connectWallet = () => {
    wallet.connect('injected');
  }


  const getData = async () => {
    const invested_vaults_response = await axios.get(`http://127.0.0.1:8000/Vault/?invested=` + wallet?.account , {});
      setInvestedVaults(invested_vaults_response.data);

    const saved_vaults_response = await axios.get(`http://127.0.0.1:8000/Vault/?saved=` + wallet?.account , {});
      setSavedVaults(saved_vaults_response.data);

    const invested_market_making_response = await axios.get(`http://127.0.0.1:8000/MarketMakingPool/?invested=` + wallet?.account , {});
      setInvestedMarketMakingPool(invested_market_making_response.data);

    const saved_market_making_response = await axios.get(`http://127.0.0.1:8000/MarketMakingPool/?saved=` + wallet?.account , {});
      setSavedMarketMakingPool(saved_market_making_response.data);
  }

  return (
    <div className={styles.container}>

      <main className={styles.main}>

        <h1 className={styles.title}>
          Welcome to the learning school Appie
        </h1>
        <hr/>

        {
          wallet.status === "connected" ? <button className={'w-50'}  onClick={() => wallet.reset()} color={'secondary'}>
            Disconnect
          </button> :   <button className={'w-50'}  onClick={() => connectWallet()} color={'secondary'}>
            Connect with wallet
          </button>
        }

        {
          wallet?.account ? <p>{wallet.account} | Chain ID {wallet.chainId}</p> : <p>Disconnected</p>
        }

        <hr/>
        <h2>Fetch data</h2>
        <button onClick={() => getData()}>Run GetData</button>

        <h3>Invested vaults</h3>
        <pre>
          {JSON.stringify({investedVaults}, null, 2) }
        </pre>

        <h3>Saved vaults</h3>
        <pre>
          {JSON.stringify({savedVaults}, null, 2) }
        </pre>

        <h3>Invested MarketMakingPool</h3>
        <pre>
          {JSON.stringify({investedMarketMakingPool}, null, 2) }
        </pre>

        <h3>Saved MarketMakingPool</h3>
        <pre>
          {JSON.stringify({savedMarketMakingPool}, null, 2) }
        </pre>

      </main>

    </div>
  )
}

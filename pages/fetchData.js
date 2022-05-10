import styles from '../styles/Home.module.css'
import axios from 'axios';
import {useWallet} from "use-wallet";
import {useState, useEffect} from "react";
import {getVaults, getMarketMakingPools} from '../src/helpers';

export default function Home() {

  const wallet = useWallet();

  const [savedVaults, setSavedVaults] = useState({});
  const [investedVaults, setInvestedVaults] = useState({});
  const [investedMarketMakingPool, setInvestedMarketMakingPool] = useState({});
  const [savedMarketMakingPool, setSavedMarketMakingPool] = useState({});

  useEffect(() => {

    if (wallet.status === "connected") {
      getVaults({invested: wallet?.account, callback: setInvestedVaults});
      getVaults({saved: wallet?.account, callback: setSavedVaults});
      getMarketMakingPools({invested: wallet?.account, callback: setInvestedMarketMakingPool});
      getMarketMakingPools({saved: wallet?.account, callback: setSavedMarketMakingPool});
    } else {
      setInvestedVaults();
      setSavedVaults();
      setInvestedMarketMakingPool();
      setSavedMarketMakingPool();
    }

  }, [wallet])

  const connectWallet = () => {
    wallet.connect('injected');
  }


  return (
      <div className={styles.container}>

        <main className={styles.main}>

          <h1 className={styles.title}>
            Welcome to the learning school Appie
          </h1>
          <hr/>

          {
            wallet.status === "connected" ?
                <button className={'w-50'} onClick={() => wallet.reset()} color={'secondary'}>
                  Disconnect
                </button> : <button className={'w-50'} onClick={() => connectWallet()} color={'secondary'}>
                  Connect with wallet
                </button>
          }

          {
            wallet?.account ? <p>{wallet.account} | Chain ID {wallet.chainId}</p> : <p>Disconnected</p>
          }

          <hr/>

          <h3>Invested vaults</h3>
          <pre>

            {JSON.stringify({investedVaults}, null, 2)}

          </pre>

          <h3>Saved vaults</h3>
          <pre>
          {JSON.stringify({savedVaults}, null, 2)}

        </pre>

          <h3>Invested MarketMakingPool</h3>
          <pre>
          {JSON.stringify({investedMarketMakingPool}, null, 2)}

        </pre>
          <h3>Saved MarketMakingPool</h3>
          <pre>
          {JSON.stringify({savedMarketMakingPool}, null, 2)}
        </pre>

        </main>

      </div>
  )
}

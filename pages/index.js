import styles from '../styles/Home.module.css'
import axios from 'axios';
import {useWallet} from "use-wallet";
import {useState, useEffect} from "react";

export default function Home() {

  const wallet = useWallet();
  const [project,setProject] = useState({});
  const [user,setUser] = useState({})
  const [result, setResult] = useState({});
  const [name, setName] = useState('')
  const [fetchedData, setFetchedData] = useState(null)


  useEffect(() => {
     alert('Message to Uri: Don\'t fuck up the code 😂');
     console.log('Fire')
  },[])

  const connectWallet = () => {
    wallet.connect('injected');
  }

  const postUser = async (e) => {
    e.preventDefault();
    const data = {
      address: e.target.wallet.value
    }
    try {
      const result = await axios.post(`http://127.0.0.1:8000/UserAddress/`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setResult(result);
    } catch (e) {
      setResult(e);
    }
  }

  // Losse functie om een field te handelen zonder form, zie code voorbeeld onder in HTML hoe we er mee om gaan
  const postName = async () => {
    const data = {
      address: name
    }
    try {
      const result = await axios.post(`http://127.0.0.1:8000/UserAddress/`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setResult(result);
    } catch (e) {
      setResult(e);
    }
  }

  const getData = async () => {
    const result = await axios.get(`http://127.0.0.1:8000/UserAddress/`, {});
    setFetchedData(result.data);
  }

  return (
    <div className={styles.container}>

      <main className={styles.main}>

        <h1 className={styles.title}>
          Welcome to the learning school { name ? name : "Joerie"}
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

        {
          wallet?.status === "connected" ? <>
              <iframe src="https://giphy.com/embed/gKI9st8yXty2k8yAsf" width="100%" height="100%" frameBorder="0" className="giphy-embed" allowFullScreen/>
          </> : ""
        }
        <br/>
        {/*Submit form for the user*/}
        <form onSubmit={postUser}>
          <input type="text" name='wallet' value={wallet?.account || 'null'} />
          <button type='submit'>Submit</button>
        </form>

        <hr/>
        {/*Je kunt ook gewoon een losse input maken, die een state wijzigt, dit doen ze bijv met de een on off switch, maar hieronder een voorbeeld met een veld en hoe je er dan mee omgaat*/}
        <input placeholder={'Enter address'} type="text" onChange={(e) => setName(e.target.value)}/>
        <button onClick={() => postName()}>Run functie postName</button>
        <pre>
          {JSON.stringify(result, null, 2) }
        </pre>
        <hr/>
        <h2>Fetch data example</h2>
        <button onClick={() => getData()}>Run GetData</button>
        <pre>
          {JSON.stringify(fetchedData, null, 2) }
        </pre>

        {
          wallet?.status === "connected" ? <>
            <iframe src="https://giphy.com/embed/7K95K2SuBOaBaXXlGH" width="100%" height="100%" frameBorder="0" className="giphy-embed" allowFullScreen/>
          </> : ""
        }

      </main>

    </div>
  )
}

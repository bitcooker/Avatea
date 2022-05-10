import styles from '../styles/Home.module.css'
import axios from 'axios';
import {useWallet} from "use-wallet";
import {useState, useEffect} from "react";
import {approveToken} from '../src/helpers';

export default function Home() {

    const wallet = useWallet();

    const [approvedAmount, setApprovedAmount] = useState(0);

    const connectWallet = () => {
        wallet.connect('injected');
    }


    const approve = async (e) => {
        e.preventDefault();
        try {
            await approveToken(wallet, e.target.address.value, e.target.amount.value, setApprovedAmount);
        } catch(e) {
            console.log(e)
        }
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

                <h3>Approval</h3>


                <form onSubmit={approve}>
                    <input placeholder={'Enter amount'} type="number" name='amount'/>
                    <input placeholder={'address'} type="text" name='address'/>
                    <button type='submit'>Submit</button>
                </form>
                <hr/>


                <p>Amount approved: {approvedAmount} </p>


            </main>

        </div>
    )
}

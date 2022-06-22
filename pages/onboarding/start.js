import axios from 'axios';
import {useWallet} from "use-wallet";
import {useRouter} from "next/router";


export default function Start({projects}) {

    const router = useRouter();

    const callForm = async (e) => {
        e.preventDefault();
        console.log(e);
        const result = await axios.post('/api/packet/create', {
            firstName: e.target.firstName.value,
            lastName: e.target.lastName.value,
            email: e.target.email.value,
            date: e.target.date.value,
            ssn: e.target.ssn.value,
            address: e.target.address.value
        })
        router.push(result.data.signingPageURL)
    }

    return (
        <div>
            <div className="index">
                <form onSubmit={(e) => callForm(e)}>
                    <input name="firstName" type="text" />
                    <input name="lastName" type="text" />
                    <input name="email" type="email" />
                    <input name="date" type="date" />
                    <input name="ssn" type="text" />
                    <input name="address" type="text" />
                    <input type="submit" value="Submit" />
                </form>
            </div>
        </div>
    )
}

export async function getServerSideProps(context) {
    return {
        props: {
        }
    }
}
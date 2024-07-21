import { auth } from "../firebase"

export default function Home() {
    const logOut=() => {
        auth.signOut();
    }
    return <>
    <h1>home  !!!</h1>
    <button onClick={logOut}>log Out</button>
    
    </>
}
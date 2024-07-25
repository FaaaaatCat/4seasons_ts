import MakeTweet from "../components/makeTweet"
import { auth } from "../firebase"

export default function Home() {

    return <>
        
        <div className="home-area">
            <h1>home  !!!</h1>
            <MakeTweet></MakeTweet>
        </div>
    
    </>
}
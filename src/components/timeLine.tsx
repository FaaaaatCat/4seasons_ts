import { collection, getDocs, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react"
import { dbService } from "../firebase";
import Tweet from "./tweet";

export interface ITweet{
    id: string;
    photo?: string;
    tweet: string;
    userId: string;
    userName: string;
    photoURL: string;
    createdAt: number;
    missionType: string;
}

export default function TimeLine() {
    const [tweet, setTweet] = useState<ITweet[]>([]);
    const unsubscribe : Unsubscribe | null = null;
    const fetchTweets = async () => {
        const tweetQuery = query(
            collection(dbService, "tweets"),
            orderBy("createdAt", "desc")
        );
        const unsubscribe = await onSnapshot(tweetQuery, (snapshot) => {
            const tweetData = snapshot.docs.map((doc) => {
                const { tweet, createdAt, userId, userName, photoURL,photo, missionType } = doc.data();
                return {
                    tweet,
                    createdAt,
                    userId,
                    userName,
                    photo,
                    photoURL,
                    missionType,
                    id: doc.id,
                };
            });
            setTweet(tweetData);
        })
       
        // const snapshot = await getDocs(tweetQuery);
        // const tweetdata = snapshot.docs.map((doc) => {
        //     const { tweet, createdAt, userId, userName, photo } = doc.data();
        //     return {
        //         tweet,
        //         createdAt,
        //         userId,
        //         userName,
        //         photo,
        //         id:doc.id,
        //     }
        // });
        
    }
    useEffect(() => {
        fetchTweets();
    }, []);
    return <>
        <div className="mission-list">
            {tweet.map((item) => (
                <Tweet key={item.id}{...item} />
            ))}
        </div>
        {/* {JSON.stringify(tweet)} */}
    </>
}
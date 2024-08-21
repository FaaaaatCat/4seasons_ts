import { useEffect, useMemo, useRef, useState } from "react";
import MakeTweet from "../components/makeTweet";
import TimeLine from "../components/timeLine";
import Quest from "./quest";
import { FaCaretDown } from "react-icons/fa";
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { dbService } from "../firebase";
import Tweet from "../components/tweet";

export interface ITweet {
    id: string;
    photo?: string;
    tweet: string;
    userId: string;
    userName: string;
    photoURL: string;
    createdAt: number;
    missionType: string;
    page: string;
}

export default function Mission() {
     const [tweet, setTweet] = useState<ITweet[]>([]);
    // 현재 선택된 페이지를 상태로 관리
    const [selectedPage, setSelectedPage] = useState<string>("page1");
    const selectedValueRef = useRef<string>("page1");
    

    // 페이지 변경 핸들러
    const handlePageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedPage(event.target.value);
        selectedValueRef.current = event.target.value;
        fetchTweets();
    };

    // 각 페이지에 대한 내용 정의
    type Page = {
        date: string;
        title: string;
        content: string;
    };
    const pages: { [key: string]: Page } = {
        page1: {
        date: "1/1(월)",
        title: "먹보 강아지를 찾아줘",
        content: "마을 주민(보니 / 68세)은 강아지(기르드왕 / 7세 / 푸들)를 산책시키러 나갔다가 그만 목줄을 놓쳐버렸다. 평소 식탐이 강한 녀석이라 어떤 음식 냄새를 맡고 뛰쳐나간게 아닐까… 작고 잽싸서 도저히 찾을수가 없어 길드에 의뢰를 맡긴다.",
        },
        page2: {
        date: "1/2(화)",
        title: "잠을 자고 싶어요",
        content: "야채가게 상인(그루언스 / 42세)은 최근 옆집의 소음때문에 불면증에 시달리고 있다. 아이가 매일 뛰어노는 소리에 경찰에 신고도 해보았지만 그때 잠시 뿐, 몇 일 후면 또 시끄러워 잠을 설쳐버린다. 숙면할 수만 있다면 100만금을 준다며 길드를 찾아왔다. ",
        },
        page3: {
        date: "1/3(수)",
        title: "러브레터를 전해줘",
        content: "솔레디토 시청 의 문지기(랜돌프 / 21세)는 요즘 고민이 많다. 그것은 매일 밝게 인사해주는 비서 루네일 에게 반했는데, 영 쑥맥이라 단 한번도 말을 건네보지 못한 것. 어떻게 해야 자연스럽게 러브레터를 전할 수 있을지 몰라 길드에 의뢰를 맡긴다.",
        },
    };

    //선택한 셀렉트박스 값에 따라 query를 나눠주는 기능
    const fetchTweets = async () => {
        const tweetQuery = query(
            collection(dbService, "tweets"),
            orderBy("createdAt", "desc"),
            where("page", "==", selectedValueRef.current)
        );
        const unsubscribe = await onSnapshot(tweetQuery, (snapshot) => {
            const tweetData = snapshot.docs.map((doc) => {
                const { tweet, createdAt, userId, userName, photoURL,photo, missionType, page } = doc.data();
                return {
                    tweet,
                    createdAt,
                    userId,
                    userName,
                    photo,
                    photoURL,
                    missionType,
                    id: doc.id,
                    page
                };
            });
            setTweet(tweetData);
        })
        return () => { unsubscribe(); }
    }
    useEffect(() => {
        fetchTweets();
    }, []);

    // useEffect(() => {
    //     const tweetQuery = query(
    //         collection(dbService, "tweets"),
    //         where("page", "==", selectedPage),
    //         orderBy("createdAt", "desc"),
    //     );
    //     const unsubscribe = onSnapshot(tweetQuery, (snapshot) => {
    //         const tweetData = snapshot.docs.map((doc) => {
    //             const { tweet, createdAt, userId, userName, photoURL,photo, missionType, page } = doc.data();
    //             return {
    //                 tweet,
    //                 createdAt,
    //                 userId,
    //                 userName,
    //                 photo,
    //                 photoURL,
    //                 missionType,
    //                 id: doc.id,
    //                 page
    //             };
    //         });
    //         setTweet(tweetData);
    //     })
    //     return () => { unsubscribe(); }
    // }, []);


    return (
        <div className="mission-area">
            <div className="flx-row flx-end pr-3 pt-3">
                {/* <button className="btn btn-gray btn-small">다른 날짜 선택 <FaCaretDown /></button> */}
                <select value={selectedPage} onChange={handlePageChange}>
                    <option value="page1">{pages.page1.date}</option>
                    <option value="page2">{pages.page2.date}</option>
                    <option value="page3">{pages.page3.date}</option>
                </select>
            </div>
            <Quest date={pages[selectedPage].date} title={pages[selectedPage].title} content={pages[selectedPage].content} />
            {/* <TimeLine /> */}
            <div className="mission-list">
                {tweet.map((item) => (
                    <Tweet key={item.id}{...item} />
                ))}
            </div>
            <MakeTweet />
            
        </div>
    )

}
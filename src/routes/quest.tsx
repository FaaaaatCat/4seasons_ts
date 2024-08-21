import { useEffect, useState } from "react";
import MakeTweet from "../components/makeTweet";
import TimeLine from "../components/timeLine";
import Mission from "./mission";

type PageContentProps = {
    date: string;
    title: string;
  content: string;
};

export default function Quest({ date, title, content }) {
    //남은 시간 보여주는 기능
    const [timeRemaining, setTimeRemaining] = useState<string>('');
    useEffect(() => {
        const calculateTimeRemaining = () => {
            const now = new Date();
            const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);
            const timeDiff = endOfDay.getTime() - now.getTime();
            const hours = Math.floor(timeDiff / (1000 * 60 * 60));
            const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
            setTimeRemaining(`${hours} : ${minutes} : ${seconds} 남음`);
        };
        calculateTimeRemaining(); // 초기 계산
        const intervalId = setInterval(calculateTimeRemaining, 1000); // 매 초마다 업데이트
        return () => clearInterval(intervalId); // 컴포넌트가 언마운트될 때 interval 해제
    }, []);

    return (
        <>
            <div className="mission-quest">
                <div className="leftTime"><span>{timeRemaining}</span></div>
                <p>{date} 의뢰</p>
                <h2>{title}</h2>
                <h3>{content}</h3>
            </div>
        </>

    )
}
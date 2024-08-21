import { Link, useNavigate } from "react-router-dom"
import { auth } from "../firebase";
import { useEffect, useState } from "react";

export default function Home() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const user = auth.currentUser;
    useEffect(() => {
        if (user === null) {
            setIsLoggedIn(false);
        }
        else {
            setIsLoggedIn(true);
        }
    }, []);


    const navigate = useNavigate();
    const askLogin = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
        event.preventDefault();
        const ok = window.confirm('로그인이 필요합니다');
        if (ok) {
            navigate('/login');
        }
    }
    return <>
        <div className="home-area">
            <div className="home__banner"> 진행 중(예정)인 이벤트의 배너
            </div>
            {isLoggedIn ? (
                <ul className="home__menu">
                    <li>
                        <Link to="/attend">출석</Link>
                    </li>
                    <li>
                        <Link to="/shop">상점</Link>
                    </li>
                    <li>
                        <Link to="/member">길드원</Link>
                    </li>
                    <li>
                        <Link to="/mission">의뢰</Link>
                    </li>
                </ul>
            ) : (
                <ul className="home__menu test" onClick={askLogin}>
                    <li>
                         <a href="#">출석</a>
                    </li>
                    <li>
                        <a href="#">상점</a>
                    </li>
                    <li>
                        <a href="#">길드원</a>
                    </li>
                    <li>
                        <a href="#">의뢰</a>
                    </li>
                </ul>
            )}
            <div className="home__information">
                <p>아라트리스 안내서</p>
                <ul className="link-list">
                    <li>
                        <a href="#">공지사항</a>
                    </li>
                    <li>
                        <a href="#">시스템</a>
                    </li>
                    <li>
                        <a href="#">캐릭터 가이드</a>
                    </li>
                    <li>
                        <a href="#">합격자 가이드</a>
                    </li>
                    <li>
                        <a href="#">세계관</a>
                    </li>
                    <li>
                        <a href="#">질문답변</a>
                    </li>
                </ul>
            </div>
        </div>
    
    </>
}
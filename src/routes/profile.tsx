import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";

export default function Profile() {
    const navigate = useNavigate();
    const onLogOut = async () => {
        const ok = confirm("진짜 로그아웃 합니까?");
        if (ok) {
            await auth.signOut();
            navigate("/login")
        }
    }

    return (
        <div className="profile-area">
            <p>프로파일 페이지</p>
            
            <div className="profile__info">
                <div className="flx-row gap-1">
                    <img src="" alt="" className="profilePic"/>
                    <div className="flx-col">
                        <p>사용자 이름</p>
                        <p>사용자 아이디</p>
                    </div>
                </div>
            </div>
            <button onClick={onLogOut}>logout</button>
        </div>
    )
}
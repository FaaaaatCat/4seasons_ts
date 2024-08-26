import { useNavigate } from "react-router-dom";
import { auth, dbService } from "../firebase";
import { useState } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useOutletContext } from "react-router-dom";


interface UserData {  // UserData 타입 정의
  item: unknown;
  money: number;
  id: string;
}
interface ProfileProps {
  fbUserObj: UserData[] | null;
}


export default function Profile() {
    const user = auth.currentUser;
    const { fbUserObj } = useOutletContext<ProfileProps>();
    console.log('profile')
    console.log(fbUserObj) //왜 null이지??

    
    // const fetchTweets = async () => {
    //     const tweetQuery = query(
    //         collection(dbService, "user"),
    //         where("uid", "==", user?.uid)
    //     );
    //     const unsubscribe = await onSnapshot(tweetQuery, (snapshot) => {
    //         const tweetData = snapshot.docs.map((doc) => {
    //             const { item, money } = doc.data();
    //             return {
    //                 item,
    //                 money,
    //                 id: doc.id,
    //             };
    //         });
    //         setTweet(tweetData);
    //     })
    //     return () => { unsubscribe(); }
    // }
    // useEffect(() => {
    //     fetchTweets();
    // }, []);

    // const [newDisplayName, setNewDisplayName] = useState(user.displayName);
    // const [newGold, setNewGold] = useState(fbUserObj.gold);
    // const [newHp, setNewHp] = useState(fbUserObj.hp);
    // const [newItem, setNewItem] = useState(fbUserObj.item);
    // const [newProfilePic, setNewProfilePic] = useState(fbUserObj.photoURL);
    // const defaultProfile = 'https://firebasestorage.googleapis.com/v0/b/gratia-2cdd0.appspot.com/o/gratine%2Fdefault_profile.png?alt=media&token=9003c59f-8f33-4d0a-822c-034682416355';
    // //새 소지금액 인풋
    // const onGoldChange = (e) => {
    //     setNewGold(Number(e.target.value));
    // };
    // //새 소지품 인풋
    // const onItemChange = (e) => {
    //     setNewItem(e.target.value);
    // };
    // //새 닉네임 인풋
    // const onNameChange = (e) => {
    //     setNewDisplayName(e.target.value);
    // };
    // //새 hp 인풋
    // const onHpChange = (e) => {
    //     setNewHp(Number(e.target.value));
    // };


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
            <div className="profile__pic mb-5">
                <img src={user?.photoURL} alt="" className="profilePic" />
                <button className="btn">사진 업로드</button>
            </div>
            <form action="">

            </form>
            <div className="flx-col">
                <p>이름</p>
                <input type="text" />
            </div>
            <div className="flx-col">
                <p>프로필 링크</p>
                <input type="text" />
            </div>
            <div className="flx-col">
                <p>소지금(R)</p>
                <input type="text" />
            </div>
            <div className="flx-col">
                <p>소지품</p>
                <input type="text" />
            </div>
            <button onClick={onLogOut}>logout</button>
        </div>
    )
}
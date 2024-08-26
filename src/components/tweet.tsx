import { deleteDoc, doc } from "firebase/firestore";
import { auth, dbService, storage } from "../firebase"
import { ITweet } from "./timeLine"
import { deleteObject, ref } from "firebase/storage";

export default function Tweet({userName, photo, tweet, photoURL, createdAt, missionType, userId, id }:ITweet) {
    const user = auth.currentUser;

    const deleteMission = async() => {
        if (user?.uid !== userId) return;
        const ok = window.confirm('정말로 삭제하시나요?');
        if (ok) {
            try {
                await deleteDoc(doc(dbService, "tweets", id))
                //사진도 지우기
                // const photoRef = ref(storage, `tweets/${user.uid}/${id}`);
                // await deleteObject(photoRef);
            }
            catch (e) {
                console.log(e);
            }
            finally{}
        }
    }
    return (
        <div className="mission-item">
            <div className="mission__profile">
                <img src={photoURL} alt="" className="userPhoto"/>
                <div className="flx-col flx-1">
                    <b>{userName}</b>
                    <p>{createdAt}</p>
                </div>
                {user?.uid === userId ? <>
                    <button onClick={deleteMission} className="btn btn-small">삭제</button>
                </> : null}
            </div>
            <div className="mission__content">
                {missionType === 'text' ?
                    <>{tweet}</>
                    : missionType === 'link' ?
                    <>
                        <a href={tweet} target="_blank" rel="noopener noreferrer"> {tweet}
                            <div>{photo && <img src={photo} alt='' style={{ width: '100px', height: '100px', objectFit: 'cover' }} />}</div>
                        </a>
                    </>
                    : null
                }
            </div>

            
            {/* {photo ? <img className="mission-img" src={photo} alt="" /> : null} */}
        </div>
    )
}
import { getAuth } from "firebase/auth";
import { addDoc, collection, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react"
import { dbService, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import axios from 'axios';

export default function MakeTweet() {
    const auth = getAuth();
    const user = auth.currentUser;
    const [isLoading, setLoading] = useState(false);
    const [tweet, setTweet] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const [inputCount, setInputCount] = useState(0);
    const [linkUrl, setLinkUrl] = useState<string>("");
    const [metadata, setMetadata] = useState<{ title: string; image: string } | null>(null);


    //미션 타입 선택기능
    const [selectedOption, setSelectedOption] = useState<string>('')

    //사진 넣는 기능 (삭제됨)
    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = e.target;
        if (files && files.length === 1) {
            setFile(files[0]);
        }
    }

    //날짜 변환 기능
    const formatDate = () => {
        const now = new Date();
        return `${now.getMonth() + 1}/${now.getDate()} (${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')})`;
    };

    //값 입력
    const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTweet(e.target.value);
        setInputCount(e.target.value.length);
    }
    
    //의뢰완료 버튼 클릭시 기능
    const onSubmit = async(e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if ( !user || isLoading) return;
        try {
            setLoading(true);
            if (selectedOption === 'text') {
                await addDoc(collection(dbService, "tweets"), {
                    tweet,
                    createdAt: formatDate(),
                    userName: user.displayName || "익명의 마법사",
                    userId: user.uid,
                    photoURL: user.photoURL,
                    missionType: 'text'
                });
            }
            else if (selectedOption === 'link') {
                //링크 썸네일 가져오는 코드
                //const response = await axios.get('/api/metadata', { params: { url: linkUrl } });
                // const response = await axios.get('http://localhost:3000/api/metadata', { params: { url: linkUrl } });
                // setMetadata(response.data);
                // console.log(metadata)
                // console.log(metadata?.image)
                await addDoc(collection(dbService, "tweets"), {
                    tweet : linkUrl,
                    createdAt: formatDate(),
                    userName: user.displayName || "익명의 마법사",
                    userId: user.uid,
                    photoURL: user.photoURL,
                    //photo: metadata?.image,
                    missionType: 'link'
                });
                
            }
            // if (file) {
            //     const locationRef = ref(storage, `tweets/${user.uid}-${user.displayName}/${doc.id}`);
            //     const result = await uploadBytes(locationRef, file);
            //     const url = await getDownloadURL(result.ref);
            //     await updateDoc(doc, { //파일의 다운로드url을 알기 위해선 우선 파이어베이스에 업로드 해야하기 때문에,
            //         photo: url //우선 파일을 먼저 올리고, url을 읽어와서 doc에 업데이트 하는 방법으로 진행함.
            //     })
            // }
            setLinkUrl("");
            setTweet("");
        }
        catch (e) {
            console.log(e)
        } finally {
            setLoading(false);
        }
    }
    
    return <>
        <div className="mission-do">
            <form onSubmit={onSubmit} className="flx-col gap-2">
                <div className="flx-col gap-0 mission-link">
                    <label>
                        <input
                            type="radio"
                            name="option"
                            checked={selectedOption === 'link'}
                            onChange={() => setSelectedOption('link')}
                            />
                            <span>URL로 입력</span>
                    </label>
                    <input
                        type="text"
                        value={linkUrl}
                        onChange={(e) => setLinkUrl(e.target.value)}
                        onClick={() => setSelectedOption('link')}
                        placeholder="링크를 넣어주세요"
                        //disabled = {selectedOption === 'text'}
                        className={selectedOption === 'text' ? 'opacity-05' : ''}
                    />
                </div>
                <div className="flx-col gap-0 mission-text">
                    <label>
                        <input
                            type="radio"
                            name="option"
                            checked={selectedOption === 'text'}
                            onChange={() => setSelectedOption('text')}
                        />
                        <span>텍스트로 입력</span>
                    </label>
                    <textarea
                        onChange={onChange}
                        onClick={() => setSelectedOption('text')}
                        maxLength={1000}
                        rows={5}
                        value={tweet}
                        placeholder="오늘의 의뢰를 적어주세요"
                        //disabled={selectedOption === 'link'}
                        className={selectedOption === 'link' ? 'opacity-05' : ''}
                    />
                    <div className="textAccount"><span>{inputCount} / 1000</span></div>
                </div>
                <div className="flx-row gap-2 flx-end">
                    {/* <label className="btn" htmlFor="file">{ file? "Photo added✅" : "Add photo"}</label>
                    <input onChange={onFileChange} type="file" id="file" accept="image/*" /> */}
                    <input className="btn btn-big btn-white" type="submit" value={isLoading ? "게시중..." : "의뢰 완료"}></input>
                </div>
            </form>
        </div>
        
    </>
}
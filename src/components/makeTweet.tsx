import { getAuth } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { useState } from "react"
import { dbService } from "../firebase";

export default function MakeTweet() {
    const auth = getAuth();
    const user = auth.currentUser;
    const [isLoading, setLoading] = useState(false);
    const [tweet, setTweet] = useState("");
    const [file, setFile] = useState<File | null>(null);
    
    const onChange = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
        setTweet(e.target.value);
    }
    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = e.target;
        if (files && files.length === 1) {
            setFile(files[0]); 
        }
    }
    const onSubmit = async(e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if ( !user || isLoading || tweet === "") return;
        try {
            setLoading(true);
            await addDoc(collection(dbService, "tweets"), {
                tweet,
                createdAt: Date.now(),
                userName: user.displayName || "익명의 마법사",
                userId: user.uid,
            });
        }
        catch (e) {
            console.log(e)
        } finally {
            setLoading(false);
        }
    }
    return <>
        <div className="mission-area">
            <form onSubmit={onSubmit}>
                <textarea onChange={onChange} rows={5} value={tweet} placeholder="오늘의 의뢰를 적어주세요" />
                <div className="flx-row gap-2 flx-end">
                    <label htmlFor="file">{ file? "Photo added✅" : "Add photo"}</label>
                    <input onChange={onFileChange} type="file" id="file" accept="image/*" />
                    <input className="sz-btn" type="submit" value={isLoading? "게시중...":"의뢰 완료"}></input>
                </div>
            </form>
        </div>
        
    </>
}
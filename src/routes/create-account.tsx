import { createUserWithEmailAndPassword, getAuth, updateProfile } from "firebase/auth";
import { useState } from "react"
import { dbService } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { addDoc, collection } from "firebase/firestore";
import { GoHomeFill } from "react-icons/go";

export default function CreateAccount() {
    const auth = getAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const defaultProfile = 'https://firebasestorage.googleapis.com/v0/b/gratia-2cdd0.appspot.com/o/gratine%2Fdefault_profile.png?alt=media&token=9003c59f-8f33-4d0a-822c-034682416355';

    const goToHome = () => {
        navigate('/')
    }

    const onChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const {target:{name,value}} = e;
        if(name === 'email'){
            setEmail(value);
        }
        if(name === 'password'){
            setPassword(value);
        }
    };
    const onSubmit = async(e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        if(isLoading || email ==="" || password ==="") return;
        try{
            setIsLoading(true);
            const credentials = await createUserWithEmailAndPassword(auth, email, password);
            //회원가입시 유저 정보 저장
            const fbUserObj = {
                uid: credentials.user.uid,
                email: email,
                displayName: email.split("@")[0], //파이어베이스에서 관리유용을 위해(이름 없으면 누가누군지 구별x) 중복데이터지만 여기에도 저장함.
                money: 0,
                item: '소지품',
                login: true,
                attendCount : 0,
                attendRanNum: 0,
                totalAttend: 0,
                attendDate: '',
            }
            await addDoc(collection(dbService, "user"), fbUserObj);

            await updateProfile(credentials.user,{
                displayName: email.split("@")[0],
                photoURL: defaultProfile,
            });
            navigate("/");
        }
        catch(e){
            if(e instanceof FirebaseError){
                setError(e.message);
                // const tryErroMsg = {
                //     "auth/email-already-in-use" : "이미 사용중인 이메일 입니다."
                // }
            }
        }
        finally{
            setIsLoading(false);
        }
    };

    return (
        <>
            <div className={"login-area"}>
                <div className="goToHome" onClick={goToHome}>
                    <GoHomeFill size="24" />
                    <p>홈으로</p>
                </div>
                <h4>회원가입</h4>
                {error !="" ? <p className={"errorMsg"}>{error}</p> : null}
                <form onSubmit={onSubmit}>
                    <input name="email" placeholder="email" type="email" onChange={onChange} value={email} required/>
                    <input name="password" placeholder="password" type="password" onChange={onChange} value={password} required/>
                    <input type="submit" value={isLoading ? "Loading..." : "계정 생성하기"} />
                </form>
                <div>
                    이미 계정이 있나요? <Link to="/login">로그인 하기 &rarr;</Link>
                </div>
            </div>
        </>
    )
    
}
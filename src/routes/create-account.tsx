import { createUserWithEmailAndPassword, getAuth, updateProfile } from "firebase/auth";
import { useState } from "react"
import { auth, dbService } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { addDoc, collection } from "firebase/firestore";

export default function CreateAccount() {
    const auth = getAuth();
    const user = auth.currentUser;
    const [isLoading, setIsLoading] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const onChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const {target:{name,value}} = e;
        if(name === 'name'){
            setName(value);
        }
        else if(name === 'email'){
            setEmail(value);
        }
        if(name === 'password'){
            setPassword(value);
        }
    };
    const onSubmit = async(e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        if(isLoading || name ==="" || email ==="" || password ==="") return;
        try{
            setIsLoading(true);
            const credentials = await createUserWithEmailAndPassword(auth, email, password);
            //회원가입시 유저 정보 저장
            const fbUserObj = {
                uid: credentials.user.uid,
                email: email,
                money: 0,
                item: '완드, 학생증',
                hp: 100,
                login: true,
                displayName: email.split("@")[0],
                // photoURL: defaultProfile,
                attendCount : 0,
                attendRanNum: 0,
                totalAttend: 0,
                attendDate: '',
            }
            await addDoc(collection(dbService, "user"), fbUserObj);

            await updateProfile(credentials.user,{
                displayName: name,
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
            <div className={"signin-area"}>
                <p>Create Account</p>
                <form onSubmit={onSubmit}>
                    <input name="name" placeholder="name" type="text" onChange={onChange} value={name}  required />
                    <input name="email" placeholder="email" type="email" onChange={onChange} value={email} required/>
                    <input name="password" placeholder="password" type="password" onChange={onChange} value={password} required/>
                    <input type="submit" value={isLoading ? "Loading..." : "Create Account"} />
                </form>
                {error !="" ? <p className={"errorMsg"}>{error}</p> : null}
                <div>
                    Already have an account? <Link to="/login">Log in &rarr;</Link>
                </div>
            </div>
        </>
    )
    
}
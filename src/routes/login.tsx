import { useState } from "react"
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import { GoHomeFill } from "react-icons/go";

export default function Login() {
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

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
            await signInWithEmailAndPassword(auth, email, password);
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
                <h4>로그인</h4>
                {error !="" ? <p className={"errorMsg"}>{error}</p> : null}
                <form onSubmit={onSubmit}>
                    <input name="email" placeholder="email" type="email" onChange={onChange} value={email} required/>
                    <input name="password" placeholder="password" type="password" onChange={onChange} value={password} required/>
                    <input type="submit" className="btn btn-brown w-100" value={isLoading ? "Loading..." : "로그인 하기"} />
                </form>
                <div>
                    새로오셨나요? <Link to = "/create-account">회원가입 하기 &rarr;</Link>
                </div>
                
            </div>
        </>
    )
    
}
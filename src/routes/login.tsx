import { useState } from "react"
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function Login() {

    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

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
                <p>Log in</p>
                <form onSubmit={onSubmit}>
                    <input name="email" placeholder="email" type="email" onChange={onChange} value={email} required/>
                    <input name="password" placeholder="password" type="password" onChange={onChange} value={password} required/>
                    <input type="submit" value={isLoading ? "Loading..." : "Log in"} />
                </form>
                {error !="" ? <p className={"errorMsg"}>{error}</p> : null}
                <div>
                    Don't have an account? <Link to = "/create-account">Create one &rarr;</Link>
                </div>
                
            </div>
        </>
    )
    
}
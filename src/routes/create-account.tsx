import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react"
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";

export default function CreateAccount() {

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
            console.log(credentials.user);
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
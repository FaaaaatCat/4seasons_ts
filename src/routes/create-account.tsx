import { useState } from "react"

export default function CreateAccount() {

    const [isLoading, setIsLoading] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    return (
        <>
            <div className={"login-area"}>
                <h1>create account</h1>
                <form>
                    <input name="name" placeholder="name" type="text" value={name} required />
                    <input name="email" placeholder="email" type="email" required value={email} />
                    <input name="password" placeholder="password" type="password" required value={password} />
                    <input type="submit" value="Create Account" />
                </form>
            </div>
        </>
    )
    
}
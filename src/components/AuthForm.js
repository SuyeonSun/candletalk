import React,{ useState } from "react";
import { authService, firebaseInstance } from "fbase";

const AuthForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const[newAccount, setNewAccount] =useState(true);
    const [error, setError] = useState("");

    const onChange = (event) => {
        const {target: {name, value}} = event;
        if (name === "email"){
            setEmail(value)
        }
        else if (name === "password") {
            setPassword(value);
        }
    }

    const onSubmit = async(event) => {
        event.preventDefault();
        try {
            let data;
            if (newAccount) {
                data = await authService.createUserWithEmailAndPassword (email, password)
            } else {
                data = await authService.signInWithEmailAndPassword(email, password)
            }
            console.log(data);
        } catch (error) {
            setError(error.message);
        }

    };

    const toggleAccount = () => {
        setNewAccount((prev) => !prev);
    }
    return (
        <>
            <form onSubmit={onSubmit} className="container">
                <input name="email" type="text" placeholder="Email" 
                required value={email} onChange={onChange} className="authInput"></input>

                <input name="password" type="password" placeholder="Password" 
                required value={password} onChange={onChange} className="authInput"></input>

                <input type="submit" value={newAccount ? "Create Account" : "Log In"} className="authInput"></input>
                {error}
            </form>
            <span onClick = {toggleAccount} className="authSwitch">{newAccount ? "Sign In" : "Create Account"}</span>
        </>
    )
};

export default AuthForm;
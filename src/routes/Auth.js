import AuthForm from "components/AuthForm";
import { authService, firebaseInstance } from "fbase";
import { auth } from "firebase";
import React, { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faGoogle,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";

import { faFire } from "@fortawesome/free-solid-svg-icons";

function Auth() {
    const onSocialClick = async (event) => {
        const {
            target : {name},
        } = event;
        let provider;
        if (name === "google") {
            provider = new firebaseInstance.auth.GoogleAuthProvider();
        } else if (name === "github") {
            provider = new firebaseInstance.auth.GithubAuthProvider();
        }
        await authService.signInWithPopup(provider);

    }

    return (
        <div className="authContainer">
            <FontAwesomeIcon
                icon={faFire}
                color={"#f3951f"}
                size="3x"
                style={{ marginBottom: 30 }}
            />
            <AuthForm/>
            <div className="authBtns">
                <button className="authBtn" name="google" onClick={onSocialClick}>Continue with Google<FontAwesomeIcon icon={faGoogle} /></button>
                <button name="github" onClick={onSocialClick} className="authBtn">Continue with Github<FontAwesomeIcon icon={faGithub} /></button>
            </div>
        </div>
    )
}

export default Auth;
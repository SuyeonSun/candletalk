import { authService } from "fbase";
import React from "react";

function Profile() {
    const onLogOutclick = () => {
        authService.signOut();
    }
    return (
        <>
        <button onClick = {onLogOutclick}>Log Out</button>
        </>
    )
}

export default Profile;
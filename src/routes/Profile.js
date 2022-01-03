import { authService, dbService } from "fbase";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";

function Profile({refreshUser, userObj}) {
    const history = useHistory();
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);

    const onLogOutclick = () => {
        authService.signOut();
        history.push("/");
    };

    const getMyNweets = async() => {
        const nweets = await dbService.collection("nweets")
        .where("creatorId", "==", userObj.uid)
        .orderBy("createdAt")
        .get();
        console.log(nweets.docs.map((doc) => doc.data()));
    }

    const onChange = (event) => {
        const {
          target: { value },
        } = event;
        setNewDisplayName(value);
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        if (userObj.displayName !== newDisplayName) {
          await userObj.updateProfile({
            displayName: newDisplayName,
          });
          refreshUser();
        }
      };

    return (
        <>
        <form onSubmit={onSubmit}>
            <input onChange={onChange} type="text" placeholder="Display name" value={newDisplayName}></input>
            <input type="submit" value="Update Profile" ></input>
        </form>
        <button onClick = {onLogOutclick}>Log Out</button>
        </>
    )
}

export default Profile;
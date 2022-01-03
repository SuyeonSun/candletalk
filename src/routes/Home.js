import { dbService } from "fbase";
import React, { useEffect, useState } from "react";
import Nweet from "../components/Nweet";

function Home({userObj}) {
    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);
    

    useEffect(() => {
        dbService.collection("nweets").onSnapshot((snapshot) => {
            const nweetArray = snapshot.docs.map((doc) => ({
                id: doc.id, 
                ...doc.data(),
            }));
            setNweets(nweetArray);
        });    
    }, []);

    const onSubmit = async (event) => {
        event.preventDefault();
        await dbService.collection("nweets").add({
            text:nweet,
            createdAt: Date.now(),
            creatorId: userObj.uid,
        });
        setNweet("");
    };

    const onChange = (event) => {
        const {target: {value}} = event; 
        setNweet(value);
    };

    const onFileChange = (event) => {
        const {target:{files},
        } = event;
        const theFile = files[0];
        const reader = new FileReader();
        reader.readAsDataURL(theFile);
    }

    return (
        <>
        <form onSubmit={onSubmit}>
            <input value={nweet} onChange={onChange} type="text" placeholder="what's on your mind?" maxLength={120}></input>
            <input type="file" accept="image/*" onChange={onFileChange}/>
            <input type="submit" value="share"></input>
        </form>
        <div>
            {nweets.map((nweet) => (
                <Nweet key={nweet.id} 
                nweetObj={nweet} 
                isOwner={nweet.creatorId === userObj.uid}/>
            ))}
        </div>
        </>
    )
}

export default Home;
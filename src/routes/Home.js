import { v4 as uuidv4 } from 'uuid';
import { dbService, storageService } from "fbase";
import React, { useEffect, useState } from "react";
import Nweet from "../components/Nweet";
import NweetFactory from 'components/NweetFactory';

function Home({userObj}) {
    
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

    

    return (
        <>
        <NweetFactory userObj={userObj}></NweetFactory>
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
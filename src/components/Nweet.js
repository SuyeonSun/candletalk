import { dbService } from "fbase";
import React, {useState} from "react";

const Nweet = ({nweetObj, isOwner}) => {
    const [editing, setEditing] = useState(false);
    const [newNweet, setNewNweet] = useState(nweetObj.text);

    const onDeleteClick = () => {
        const ok = window.confirm("Are you sure you want to delete this?");
        if (ok) {
            dbService.doc(`nweets/${nweetObj.id}`).delete();
        } 
    }
    const toggleEditing = () => setEditing((prev) => !prev);

    const onSubmit = (event) => {
        event.preventDefault();
        dbService.doc(`nweets/${nweetObj.id}`).update({
            text:newNweet
        });
        setEditing(false);
    }

    const onChange = (event) => {
        const {
            target:{value},
        } = event;
        setNewNweet(value);
    };

    return (
        <div>
            {editing ? (
                <>
                <form onSubmit={onSubmit}>
                    <input 
                    type="text" 
                    value={newNweet} 
                    onChange={onChange}
                    required 
                    />
                    <input type="submit" value="Update"></input>
                </form>
                <button onClick={toggleEditing}>Cancel</button>
                </>
            ) : (
                <>
                    <h4>{nweetObj.text}</h4>
                    {isOwner && (
                <>
                    <button onClick={onDeleteClick}>Delete</button>
                    <button onClick={toggleEditing}>Edit</button>
                </>
            )}
                </>
                )}
        </div>
    )
}

export default Nweet;
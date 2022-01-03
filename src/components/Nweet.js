import { dbService, storageService } from "fbase";
import React, {useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

const Nweet = ({nweetObj, isOwner}) => {
    const [editing, setEditing] = useState(false);
    const [newNweet, setNewNweet] = useState(nweetObj.text);

    const onDeleteClick = async () => {
        const ok = window.confirm("Are you sure you want to delete this?");
        if (ok) {
            await dbService.doc(`nweets/${nweetObj.id}`).delete();
            await  storageService.refFromURL(nweetObj.attachmentUrl).delete();
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
        <div className="nweet">
            {editing ? (
                <>
                <div>
                <form onSubmit={onSubmit} className="container nweetEdit">
                    <input 
                    type="text" 
                    value={newNweet} 
                    onChange={onChange}
                    required 
                    className="formInput"
                    />
                    <input type="submit" value="Update" className="formBtn"></input>
                </form>
                </div>
                <span onClick={toggleEditing} className="formBtn cancelBtn">Cancel</span>
                </>
            ) : (
                <>
                    <h4>{nweetObj.text}</h4>
                    {nweetObj.attachmentUrl && <img src={nweetObj.attachmentUrl}></img>}
                    {isOwner && (
                <div className="nweet__actions">
                    <span onClick={onDeleteClick}><FontAwesomeIcon icon={faTrash} /></span>
                    <span onClick={toggleEditing}><FontAwesomeIcon icon={faPencilAlt} /></span>
                </div>
            )}
                </>
                )}
        </div>
    )
}

export default Nweet;
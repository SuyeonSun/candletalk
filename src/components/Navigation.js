import React from "react";
import {Link} from 'react-router-dom';

function Navigation ({userObj}) {
    return (
        <>
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                {userObj && <Link to="/profile"> {userObj.displayName ? userObj.displayName : "유저"}의 프로필</Link>}
            </ul>
        </nav>
        </>
    )
} 

export default Navigation;
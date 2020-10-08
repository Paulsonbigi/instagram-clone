import React from 'react'
import "../css/post.css"


function Post(props) {
    return (
        <div className="post-container">
            <div className="post-header">
                <div className="header-avatar">R</div>
                <div className="post-details">
                    <h3>{props.username}</h3>
                    <h6>user location</h6>
                </div>
            </div>
            <div className="post-image">
                <img  className="post-url" src={props.imgURL} alt="paul"/>                    
            </div>
            {/* <div className="post-reactions">

            </div> */}
            <div className="post-caption">
                <h5>{props.caption}</h5>
            </div>
        </div>
    )
}

export default Post

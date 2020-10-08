import React, { useState, useEffect } from 'react'
import firebase from "firebase"
import { Button } from '@material-ui/core';
import { db, storage } from "../firebase/fbConfig"
function ImageUpload( {username}) {
    const [caption, setCaption] = useState("")
    const [image, setImage] =useState("")
    const [progress, setProgress] =useState("")


    const handleChange =(event) => {
        // event.preventDefault();
        if (event.target.files[0]){
            setImage(event.target.files[0]);
        }
    }
    const handleUpload = () => {
        const uploadTask = storage.ref(`images/${image.name}`).put(image)
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress = Math.round (
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(progress);
            },
            (error) =>{
                console.log(error.message)
            },
            () => {
                storage
                    .ref("images")
                    .child(image.name)
                    .getDownloadURL()
                    .then(url => {
                        db.collection("user_posts").add({
                            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                            caption: caption,
                            imgURL: url,
                            username: username
                        });
                        setProgress("");
                        setCaption("")
                        setImage("")
                    })
            }
        )
    }
    return (
        <div>
            <progress value={progress} max="100"/>
            <input type="text" placeholder="Enter a caption..." 
                    onChange={event => setCaption(event.target.value)} 
                    value={caption}/>
            <input type="file" onChange={handleChange}/>
            <Button className="imageupload_btn" onClick={handleUpload}>
                Upload</Button>
        </div>
    )
}

export default ImageUpload

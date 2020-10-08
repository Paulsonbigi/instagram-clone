// import React, { useState, useEffect } from 'react'
// import Post from "./Post"
// import img1 from "../images/img1.jpg"
// import img2 from "../images/img2.jpg"
// import img3 from "../images/img3.jpg"
// import { db } from "../firebase/fbConfig"

// function Posts() {

//     const [posts, setPosts] = useState([
//         {
//             Username: "Paulsonbigi",
//             imgURL: (img1),
//             Caption: "React gives such a nice component managment for both complex and simple development"
//         },
//         {
//             Username: "Peace Peace",
//             imgURL: (img3),
//             Caption: "What a great day with my sweetheart"
//         },
//         {
//             Username: "Peace Peace",
//             imgURL: (img2),
//             Caption: "What a great day with my sweetheart"
//         }
//     ])

//     useEffect (() => {
//         db.collection("Posts").onSnapshot(snapshot =>{
//             setPosts(snapshot.docs.map(doc => ({
//                 id: doc.id,
//                 post: doc.data()
//             })));
//         })
//     }, [])

//     return(
//         <div>
//             {
//                 posts.map(({id, post}) => (
//                     <Post key={id} username={post.Username} imgURL={post.imgURL} caption={post.Caption}/>
//                 ))
//             }
//         </div>
//     )
// }
// export default Posts

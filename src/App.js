import React, { useState, useEffect} from 'react'
import { auth, db, storage } from "../src/firebase/fbConfig"
import Header from "../src/Header/header"
import "../src/App.css"
import Post from "../src/Posts/Post"
import ImageUpload from "../src/Posts/ImageUpload"
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button, input } from "@material-ui/core"

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}
const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function App() {
  const classes = useStyles();
  const [user_posts, setUser_posts] = useState([]);
  const [open, setOpen] = useState(false)
  const [modalStyle] = React.useState(getModalStyle);
  const [email, setEmail] =useState("")
  const [password, setPassword] =useState("")
  const [username, setUsername] = useState("")
  const [user, setUser] = useState(null)
  const [openSignin, setOpenSignin] = useState(false)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser){
        // user has logged in
        console.log(authUser)
        setUser(authUser);
        if (authUser.displayName){
          // dont update user
        }
        else {
          // if user is just created update user
          return authUser.updateProfile({
            displayName: username
          })
        }
      }else{
        // user has logged out
        setUser(null)
      }
    })

    return () => {
      // perform some cleanUp actions
      unsubscribe();
    }
  }, [user, username])

  useEffect(() => {
    db.collection("user_posts").onSnapshot(snapshot =>{
      setUser_posts(snapshot.docs.map( doc => ({
        id: doc.id,
        post: doc.data()
      })
        ));
    })
  }, [])

  const signUp =(e) => {
    e.preventDefault();
    auth
    .createUserWithEmailAndPassword(email, password)
    .then((authUser) => {
      authUser.user.updateProfile({
        displayName: username
      })
    })
    .catch((error) => alert(error.message))

    setOpen(false)
  }
  const signIn = (e) => {
    e.preventDefault();
    auth
    .signInWithEmailAndPassword(email, password)
    .catch((error) => alert(error.message))

    setOpenSignin(false)
  }
  return (
    <div className="app">
      {
        user?.displayName ? (
          <ImageUpload username={user.displayName}/>
        ):
        (
          <h2>Sorry you need to login</h2>
        )
      }
      
      <Modal
        open={open}
        onClose={() => setOpen(false)}
      >
        <div style={modalStyle} className={classes.paper}>
        <form className="app_signup">
          <center>
            <h3>instagram</h3>
          </center>
            <input type="text"
                    placeholder="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}/>
            <input type="text"
                    placeholder="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}/>
            <input type="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}/>
            <Button onClick={signUp}>Sign Up</Button>
        </form>

    </div>
      </Modal>

      <Modal
        open={openSignin}
        onClose={() => setOpenSignin(false)}
      >
        <div style={modalStyle} className={classes.paper}>
        <form className="app_signup">
          <center>
            <h3>instagram</h3>
          </center>
            <input type="text"
                    placeholder="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}/>
            <input type="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}/>
            <Button onClick={signIn}>Sign In</Button>
        </form>

    </div>
      </Modal>
      <Header/>
      {user ? (
        <Button onClick={() => auth.signOut()}>Logout</Button>
      ):
        (
          <div className="login_container">
          <Button onClick={() => setOpenSignin(true)}>Sign In</Button>
            <Button onClick={() => setOpen(true)}>Sign Up</Button>
          </div>
        )
      }

      <h3>It is nice working on an instagram application using the react js technology</h3>
      {
                user_posts.map(({id, post}) => (
                    <Post key={id} username={post.username} imgURL={post.imgURL} caption={post.caption}/>
                ))
            }
    </div>
  )
}

export default App

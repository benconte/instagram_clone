import React, {useEffect, createContext, useState} from 'react'
import LeftNav from './Layout/LeftNav'
import TopNav from './Layout/TopNav'
import BottomNav from './Layout/BottomNav'
import Home from './pages/home/Home'
import Profile from './pages/profile/Profile'
import Create_post from "./post_form/Create_post"
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { BrowserRouter as Router, Routes, Route, useParams } from "react-router-dom";
import ViewPost from "./utils/ViewPost"

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const AppContext = createContext()

function Base() {
  const [isPostFormActive, setIsPostFormActive] = useState(false)
  const [user, setUser] = useState()
  const [open, setOpen] = React.useState(false);
  const [snackBarMsg, setSnackBarMsg] = useState('')
  const [postData, setPostData] = useState([])

  const handleClickSnackBar = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
    // get authenticated user
    fetch("/api/user/auth")
    .then(res => res.json()).then(user => {
      setUser(user)
    })

    fetch("/api/posts")
    .then(res => res.json())
    .then(data => {
      setPostData(data)
    })
  }, [])
  return (
    <AppContext.Provider value={{
      isPostFormActive,
      setIsPostFormActive,
      user,
      setUser,
      handleClickSnackBar,
      setSnackBarMsg,
      postData,
      setPostData,
    }}>

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          {snackBarMsg}
        </Alert>
      </Snackbar>
      <Router>
        <LeftNav />
        <BottomNav />
        {isPostFormActive && <Create_post />}
        <main className="md:ml-[73px] xl:ml-[245px] bg-[#FAFAFA] z-0 mb-16 md:mb-0">
          <Routes>
            <Route path={`/`} element={<Home />} />
            {<Route path={`/:username`} element={<Profile />} />}
            {<Route path={`/p/:id`} element={<ViewPost />} />}
          </Routes>
        </main>
      </Router>
    </AppContext.Provider>
  )
}

export default Base
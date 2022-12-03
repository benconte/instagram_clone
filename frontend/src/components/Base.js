import React, {useEffect, createContext, useState} from 'react'
import LeftNav from './Layout.,js/LeftNav'
import TopNav from './Layout.,js/TopNav'
import Home from './pages/home/Home'
import Create_post from "./post_form/Create_post"
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const AppContext = createContext()

function Base() {
  const [isPostFormActive, setIsPostFormActive] = useState(true)
  const [user, setUser] = useState()
  const [open, setOpen] = React.useState(false);
  const [snackBarMsg, setSnackBarMsg] = useState('')

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
    fetch("api/user/auth")
    .then(res => res.json()).then(user => {
      setUser(user)
    })

    // fetch("/api/posts")
    // .then(res => res.json())
    // .then(data => console.log(data))
  }, [])
  return (
    <AppContext.Provider value={{
      isPostFormActive,
      setIsPostFormActive,
      user,
      setUser,
      handleClickSnackBar,
      setSnackBarMsg
    }}>

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          {snackBarMsg}
        </Alert>
      </Snackbar>

      <LeftNav />
      <TopNav />
      <main className="md:ml-[73px] xl:ml-[245px] bg-[#FAFAFA] py-20 md:py-4 z-0">
        <Home />
        {isPostFormActive && <Create_post />}
      </main>
    </AppContext.Provider>
  )
}

export default Base
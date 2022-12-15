import React, {useContext} from 'react'
import { AppContext } from "../Base"
import HomeIcon from '@mui/icons-material/Home';
import ExploreIcon from '@mui/icons-material/Explore';
import ChatIcon from '@mui/icons-material/Chat';
import AddIcon from '@mui/icons-material/Add';

function BottomNav() {
    const { user, setIsPostFormActive } = useContext(AppContext)
    console.log(user)
  return (
    <div className="z-10 md:hidden h-16 px-4 bg-white border-t border-solid border-gray-300 fixed bottom-0 left-0 w-full">
        <ul className='m-0 w-full list-none flex items-center justify-around'>
            <li className="navitemmobile">
                <HomeIcon className="text-2xl" />
            </li>
            <li className="navitemmobile">
                <ExploreIcon className="text-2xl" />
            </li>
            <li className="navitemmobile" onClick={() => setIsPostFormActive(true)}>
                <AddIcon className="text-2xl" />
            </li>
            <li className="navitemmobile">
                <ChatIcon className="text-2xl" />
            </li>
            <li className="navitemmobile">
                <img src={user && user.profile} alt="profile.png" className="w-5 h-5 rounded-full" />
            </li>
        </ul>
    </div>
  )
}

export default BottomNav
import React, {useContext} from 'react'
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import ExploreIcon from '@mui/icons-material/Explore';
import ChatIcon from '@mui/icons-material/Chat';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AddIcon from '@mui/icons-material/Add';
import MenuIcon from '@mui/icons-material/Menu';
import InstagramIcon from '@mui/icons-material/Instagram';
import { AppContext } from "../Base"
import { Link } from "react-router-dom"

function LeftNav() {
    const { user, isPostFormActive, setIsPostFormActive } = useContext(AppContext)
    return (
        <div className='hidden xl:block xl:w-[245px] md:block md:w-[73px] overflow-hidden h-screen fixed top-o left-0 bg-transparent border-r border-solid border-gray-300 px-2 py-8'>
            <header className='font-sans text-xl p-2 flex items-center justify-center xl:justify-start'>
                <Link to={`/`} className="m-0 p-0 hover:no-underline">
                    <div className="md:block xl:hidden">
                        <InstagramIcon className="text-2xl text-black" />
                    </div>
                    <span className="md:hidden xl:block text-black">Instragram</span>
                </Link>
            </header>
            <ul className='m-0 w-full list-none'>
                <Link to={`/`}>
                    <li className="navitem">
                        <HomeIcon className="text-2xl" />
                        <span className="hidden xl:block">Home</span>
                    </li>
                </Link>
                <li className="navitem">
                    <SearchIcon className="text-2xl" />
                    <span className="hidden xl:block">Search</span>
                </li>
                <li className="navitem">
                    <ExploreIcon className="text-2xl" />
                    <span className="hidden xl:block">Explore</span>
                </li>
                <li className="navitem">
                    <ChatIcon className="text-2xl" />
                    <span className="hidden xl:block">Messages</span>
                </li>
                <li className="navitem">
                    <FavoriteBorderIcon className="text-2xl" />
                    <span className="hidden xl:block">Notifications</span>
                </li>
                <li className="navitem" onClick={() => setIsPostFormActive(true)}>
                    <AddIcon className="text-2xl" />
                    <span className="hidden xl:block">Create</span>
                </li>
                <Link to={`/${user && user.username}`} className="m-0 p-0 hover:no-underline">
                    <li className="navitem">
                        <img src={user && user.profile} alt="profile.png" className="w-5 h-5 rounded-full" />
                        <span className="hidden xl:block">Profile</span>
                    </li>
                </Link>
            </ul>

            <div className="absolute bottom-0 left-2 right-2 p-[12px] rounded-full my-2 text-[rgba(38,38,38,.8)] cursor-pointer hover:bg-[rgb(250,250,250)] flex items-center gap-4">
                <MenuIcon />
                <span className="hidden xl:block">More</span>
            </div>
        </div>
    )
}

export default LeftNav

{/* <div className='hidden lg:block lg:w-[245px] md:block md:w-[73px] overflow-hidden h-screen fixed top-o left-0 bg-transparent border-r border-solid border-gray-300 px-2 py-8'> */}

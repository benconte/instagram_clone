import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import ExploreIcon from '@mui/icons-material/Explore';
import ChatIcon from '@mui/icons-material/Chat';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AddIcon from '@mui/icons-material/Add';
import MenuIcon from '@mui/icons-material/Menu';
import InstagramIcon from '@mui/icons-material/Instagram';

function LeftNav() {
    return (
        <div className='hidden xl:block xl:w-[245px] md:block md:w-[73px] overflow-hidden h-screen fixed top-o left-0 bg-transparent border-r border-solid border-gray-300 px-2 py-8'>
            <header className='font-sans text-xl p-2 flex items-center justify-center xl:justify-start'>
                <div className="md:block xl:hidden">
                    <InstagramIcon className="text-2xl text-black" />
                </div>
                <span className="md:hidden xl:block">Instragram</span>
            </header>
            <ul className='m-0 w-full list-none'>
                <li className="navitem">
                    <HomeIcon className="text-2xl" />
                    <span className="hidden xl:block">Home</span>
                </li>
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
                <li className="navitem">
                    <AddIcon className="text-2xl" />
                    <span className="hidden xl:block">Create</span>
                </li>
                <li className="navitem">
                    <img src="/static/images/me.jpg" alt="profile.png" className="w-5 h-5 rounded-full" />
                    <span className="hidden xl:block">Profile</span>
                </li>
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

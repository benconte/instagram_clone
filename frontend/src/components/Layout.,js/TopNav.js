import React from 'react'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import SearchIcon from '@mui/icons-material/Search';

function TopNav() {
  return (
    <div className="z-10 md:hidden h-16 px-4 bg-white border-b border-solid border-gray-300 flex items-center justify-between fixed top-0 left-0 w-full">
        <header className="font-sans text-xl cursor-pointer">
            Instragram
        </header>
        <div className="flex items-center gap-4">
            <div className="flex items-center bg-[#EFEFEF] h-9 w-[275px] px-2 py-2 rounded gap-2">
                <SearchIcon className="text-gray-500 text-base" />
                <input type="search" placeholder="Search" className="w-full outline-none bg-transparent h-full" />
            </div>
            <div className="flex items-center m-0 p-0">
                <FavoriteBorderIcon className="text-3xl hover:scale-105 cursor-pointer" />
                <div className="w-2 h-2 rounded-full bg-[#FF3040] absolute top-5 right-6 border border-solid border-white"></div>
            </div>
        </div>
    </div>
  )
}

export default TopNav
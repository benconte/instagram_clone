import React from 'react'

function Suggestion() {
  return (
    <div>
      <header className='w-full flex items-center h-10 justify-between'>
        <p className='text-sm font-medium m-0 p-0 text-lightGrey'>Suggestions For You</p>
        <span className='text-lightDark m-0 text-xs font-bold cursor-pointer'>See All</span>
      </header>
      <div className='w-full h-auto'>
        <div className="flex items-center w-full h-12">
          <img src="/static/images/profile.jpg" className="w-8 h-8 rounded-full cursor-pointer" alt="" />
          <div className='basis-full ml-2 flex flex-col justify-center leading-3'>
            <p className="text-sm font-medium m-0 p-0 text-lightDark cursor-pointer">Auguste__21</p>
            <span className="font-semi-bold text-xs text-lightGrey">Foolowed by Lamar + 3 more</span>
          </div>
          <span className='text-igBlue m-0 text-sm font-medium cursor-pointer'>Follow</span>
        </div>
        <div className="flex items-center w-full h-12">
          <img src="/static/images/profile.jpg" className="w-8 h-8 rounded-full" alt="" />
          <div className='basis-full ml-2 flex flex-col justify-center leading-3'>
            <p className="text-sm font-medium m-0 p-0 text-lightDark">Auguste__21</p>
            <span className="font-semi-bold text-xs text-lightGrey">Foolowed by Lamar + 3 more</span>
          </div>
          <span className='text-igBlue m-0 text-sm font-medium cursor-pointer'>Follow</span>
        </div>
        <div className="flex items-center w-full h-12">
          <img src="/static/images/profile.jpg" className="w-8 h-8 rounded-full" alt="" />
          <div className='basis-full ml-2 flex flex-col justify-center leading-3'>
            <p className="text-sm font-medium m-0 p-0 text-lightDark">Auguste__21</p>
            <span className="font-semi-bold text-xs text-lightGrey">Foolowed by Lamar + 3 more</span>
          </div>
          <span className='text-igBlue m-0 text-sm font-medium cursor-pointer'>Follow</span>
        </div>
        <div className="flex items-center w-full h-12">
          <img src="/static/images/profile.jpg" className="w-8 h-8 rounded-full" alt="" />
          <div className='basis-full ml-2 flex flex-col justify-center leading-3'>
            <p className="text-sm font-medium m-0 p-0 text-lightDark">Auguste__21</p>
            <span className="font-semi-bold text-xs text-lightGrey">Foolowed by Lamar + 3 more</span>
          </div>
          <span className='text-igBlue m-0 text-sm font-medium cursor-pointer'>Follow</span>
        </div>
        <div className="flex items-center w-full h-12">
          <img src="/static/images/profile.jpg" className="w-8 h-8 rounded-full" alt="" />
          <div className='basis-full ml-2 flex flex-col justify-center leading-3'>
            <p className="text-sm font-medium m-0 p-0 text-lightDark">Auguste__21</p>
            <span className="font-semi-bold text-xs text-lightGrey">Foolowed by Lamar + 3 more</span>
          </div>
          <span className='text-igBlue m-0 text-sm font-medium cursor-pointer'>Follow</span>
        </div>
      </div>
    </div>
  )
}

export default Suggestion
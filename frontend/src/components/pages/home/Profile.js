import React, {useContext} from 'react'
import { AppContext } from "../../Base"
import { Link } from "react-router-dom"

function Profile() {
  const { user } = useContext(AppContext)
  return (
    <div className="flex items-center w-full h-12">
      <Link to={`/${user.username}`} className="m-0 p-0 hover:no-underline flex items-center w-full">
        <img src={user.profile} className="w-[45px] h-[45px] rounded-full object-fit cursor-pointer" />
        <div className='basis-full ml-2 flex flex-col justify-center leading-4'>
            <p className="text-sm font-medium m-0 p-0 text-lightDark cursor-pointer">{user.username}</p>
            <span className="font-semi-bold text-sm text-lightGrey capitalize">{user.fullname}</span>
        </div>
      </Link>
      <a href='logout/' className="m-0 p-0 no-underline text-igBlue">
        <p className="m-0 text-base font-medium cursor-pointer">Switch</p>
      </a>
    </div>
  )
}

export default Profile
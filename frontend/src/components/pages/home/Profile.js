import React, {useContext} from 'react'
import { AppContext } from "../../Base"

function Profile() {
  const { user } = useContext(AppContext)
  return (
    <div className="flex items-center w-full h-12">
        <img src={user.profile} className="w-[45px] h-[45px] rounded-full object-fit cursor-pointer" />
        <div className='basis-full ml-2 flex flex-col justify-center leading-4'>
            <p className="text-sm font-medium m-0 p-0 text-lightDark cursor-pointer">{user.username}</p>
            <span className="font-semi-bold text-sm text-lightGrey capitalize">{user.fullname}</span>
        </div>
        <p className="text-igBlue m-0 text-base font-medium cursor-pointer">Switch</p>
    </div>
  )
}

export default Profile
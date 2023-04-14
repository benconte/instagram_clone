import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import { getRandomName } from "../../utils/randomizer"

function Suggestion() {
  const [users, setUsers] = useState([]);

  const handleFollowing = async (id, location) => {
    const req = await fetch("/api/userFollowing/"+id);
    const data = await req.json();

    setUsers((prevState) => {
      const newState = [...prevState];
      newState[location].isFollowed = data.isFollowing;
      return newState;
    })
  }

  useEffect(() => {
    fetch("/api/getSuggestionUsers")
    .then(res => res.json())
    .then(data => {
      setUsers(data)
      console.log(data)
    })
  }, [])
  return (
    <div>
      <header className='w-full flex items-center h-10 justify-between'>
        <p className='text-sm font-medium m-0 p-0 text-lightGrey'>Suggestions For You</p>
        {/*<span className='text-lightDark m-0 text-xs font-bold cursor-pointer'>See All</span>*/}
      </header>
      <div className='w-full h-auto'>
        {users && users.map((user, index) => (
          <div className="flex items-center w-full h-12" key={index}>
            <Link to={`/${user.username}`} className="m-0 p-0 hover:no-underline flex items-center w-full">
              <img src={user.profile} className="w-8 h-8 rounded-full cursor-pointer" alt="" />
              <div className='basis-full ml-2 flex flex-col justify-center leading-3'>
                <p className="text-sm font-medium m-0 p-0 text-lightDark cursor-pointer capitalize">{user.username}</p>
                <span className="font-semi-bold text-xs text-lightGrey">Followed by {getRandomName()} + 3 more</span>
              </div>
            </Link>
            {user.isFollowed? 
              <span 
              className='text-lightGrey border border-solid border-lightDark rounded p-1 m-0 text-sm font-medium cursor-pointer'
              onClick={() => handleFollowing(user.user_id, index)}
              >Following</span>
            :
              <span 
              className='text-igBlue m-0 text-sm font-medium cursor-pointer'
              onClick={() => handleFollowing(user.user_id, index)}
              >Follow</span>
            }
          </div>
        ))}
      </div>
    </div>
  )
}

export default Suggestion
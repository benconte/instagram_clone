import React, {useContext, useEffect} from 'react'
import Story from "./Story"
import Post from "./Post"
import Profile from "./Profile"
import Suggestion from "./Suggestion"
import Footer from "./Footer"
import { dummyData } from "../../../dummy"
import {AppContext} from "../../Base"

function Home() {
  const {postData, user} = useContext(AppContext)
  return (
    <div className="m-auto px-1.5 py-3 md:p-0 lg:w-[75%] w-[470px] h-auto flex items-start lg:gap-5">
      <div className="w-[470px]">
        <Story />
        <div className="mt-2 w-[470px]">
          {postData && postData.map((post, index) => (
            <Post key={index} post={post} />
          ))}
        </div>
      </div>
      <div className="w-full h-auto hidden lg:block mt-4">{/* width: 43%; */}
        {user && <Profile />}
        <Suggestion />
        <Footer />
      </div>
    </div>
  )
}

export default Home

{/* <div className="w-[56%] bg-red-400 h-screen"> */}

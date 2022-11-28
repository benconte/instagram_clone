import React from 'react'
import LeftNav from './Layout.,js/LeftNav'
import TopNav from './Layout.,js/TopNav'
import Home from './pages/home/Home'

function Base() {
  return (
    <div className="">
      <LeftNav />
      <TopNav />
      <main className="md:ml-[73px] xl:ml-[245px] bg-[#FAFAFA] py-20 md:py-4 z-0">
        <Home />
      </main>
    </div>
  )
}

export default Base
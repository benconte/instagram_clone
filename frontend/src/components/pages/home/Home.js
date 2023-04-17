import React, { useContext, useEffect } from "react";
import Story from "./Story";
import Post from "./Post";
import Profile from "./Profile";
import Suggestion from "./Suggestion";
import Footer from "./Footer";
import { AppContext } from "../../Base";
import TopNav from "../../Layout/TopNav";
import Lottie from "react-lottie-player";

const animation = require("/static/images/lottiefiles/contact-us-lottie.json");

function Home() {
  const { postData, setPostData, user } = useContext(AppContext);
  return (
    // adding a padding top and down for mobile view for home page
    <div className="py-20 md:py-4">
      <div className="m-auto px-1.5 py-3 md:p-0 lg:w-[75%] w-[470px] h-auto flex items-start lg:gap-5">
        <TopNav />
        <div className="w-full md:w-[470px]">
          {/* <Story /> */}
          <div className="w-full md:w-[470px]">
            {postData && postData.length > 0 ? (
              postData.map((post, index) => (
                <Post
                  key={index}
                  post={post}
                  index={index}
                  setPost={setPostData}
                />
              ))
            ) : (
              <div className="w-full flex items-center justify-center mt-10">
                <div className="w-full flex flex-col justify-center items-center gap-3">
                  <h3 className="text-lg text-igBlue font-medium">
                    Posts unavailable
                  </h3>
                  <Lottie
                    loop
                    animationData={animation}
                    play
                    className="w-3/6 h-3/6"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="w-full h-auto hidden lg:block mt-2">
          {/* width: 43%; */}
          {user && <Profile />}
          <Suggestion />
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default Home;

{
  /* <div className="w-[56%] bg-red-400 h-screen"> */
}

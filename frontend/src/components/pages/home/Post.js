import React, { useState, useLayoutEffect, useContext } from 'react'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import SendIcon from '@mui/icons-material/Send';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import ChatIcon from '@mui/icons-material/Chat';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import TelegramIcon from '@mui/icons-material/Telegram';
import { AppContext } from "../../Base"


// header: #444444
// icons: #262626
// comments name: #404040
function Post({ post, index }) {
    const [comment, setComment] = useState()
    const { postData, setPostData } = useContext(AppContext)

    const handlecomment = (e) => {
        setComment(e.target.value)
    }

    const handleLikes = async (id) => {
        const response = await fetch(`/api/post/like/${id}`)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json();
        // console.log(postData.filter(pst => pst.post_id === id))
        setPostData(prev => {
            const newPost = [...prev];
            newPost[index].is_liked = data.isLiked;
            newPost[index].total_likes = data.total_likes;
            return newPost;
        })
    }

    const handleFavorite = (id) => {
        fetch(`/api/post/favorite/${id}`)
        .then(res => res.json())
        .then(data => {
            setPostData(prev => {
                const newPost = [...prev];
                newPost[index].is_favorite = data.isFavorite;
                return newPost;
            })
        })
    }
    return (
        <article className="w-full flex flex-col border border-solid border-[#DBDBDB] bg-white rounded-[8px] mb-2">
            <header className="px-2 flex items-center justify-between w-full h-14 ">
                <div className="flex items-center gap-3">
                    <img src={post.user.profile} alt="/me.j" className="w-[40px] h-[40px] rounded-full" />
                    <span className="text-base font-medium text-[#444444]">{post.user.username}</span>
                </div>

                <MoreHorizIcon className="text-xl cursor-pointer text-[#444444]" />
            </header>
            <div className="w-full h-fit">
                <img src={post.imageUrl} alt="post" className="w-full max-h-[30rem] object-contain" />
            </div>
            {/* controls */}
            <div className="w-full px-2 h-12 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    {post.is_liked ?
                        <FavoriteIcon className="text-xl cursor-pointer text-red-700" onClick={() => handleLikes(post.post_id)} />
                        :
                        <FavoriteBorderIcon className="text-xl cursor-pointer text-[#262626] hover:text-[#8E8E8E]" onClick={() => handleLikes(post.post_id)} />
                    }
                    <ChatIcon className="text-lg cursor-pointer text-[#262626] hover:text-[#8E8E8E]" />
                    <TelegramIcon className="text-xl cursor-pointer text-[#262626] hover:text-[#8E8E8E]" />
                </div>
                {post.is_favorite?
                    <BookmarkIcon className="text-xl cursor-pointer text-[#262626]" onClick={() => handleFavorite(post.post_id)} />
                    :
                    <BookmarkBorderIcon className="text-xl cursor-pointer text-[#262626] hover:text-[#8E8E8E]" onClick={() => handleFavorite(post.post_id)} />
                }
            </div>
            {/* bottom */}
            <div className="w-full px-2 pb-2">
                {/* views */}
                <p className="text-[#262626] font-base pb-1">{post.total_likes > 0 ? post.total_likes + " likes" : "2,702,556 likes"}</p>
                <p className="text-[#262626] text-sm">
                    <span className="font-medium mr-2">{post.user.username}</span>
                    {post.post}
                </p>
                <p className="text-[#8E8E8E] text-sm my-2 cursor-pointer">2,135 comments</p>
                <p className="text-[#8E8E8E] text-sm my-2">1 Day Ago</p>
            </div>
            <div className="w-full h-12 flex items-center gap-2 border-t border-solid border-[#DBDBDB] px-2">
                <SentimentSatisfiedAltIcon className="text-2xl text-[#262626] cursor-pointer" />
                <input type="text" className="border-0 bg-transparent text-[#262626] basis-full text-sm outline-0" placeholder="Add a comment..." onChange={(e) => handlepost(e)} />
                <button type="button" disabled={!comment && true} className={`focus:outline-0  text-[${comment ? "#0F9BF7" : "#C5E7FD"}] text-base font-medium cursor-${comment ? "pointer" : "default"}`}>Post</button>
            </div>
        </article>
    )
}

export default Post
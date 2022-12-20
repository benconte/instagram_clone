import React, { useState, useEffect } from 'react'
import { Link, useParams } from "react-router-dom"
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SendIcon from '@mui/icons-material/Send';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import ChatIcon from '@mui/icons-material/Chat';
import TelegramIcon from '@mui/icons-material/Telegram';
import { create_PostCommentEntry } from "../API"
import { csrftoken } from '../Cookie'

function ViewPost() {
  const [post, setPost] = useState({})
  const { id } = useParams()
  const [comment, setComment] = useState("")
  const [postComments, setPostComments] = useState()
  const [error, setError] = useState()

  const handlecomment = (e) => {
    setComment(e.target.value)
  }

  const handleLikes = async (id) => {
    const response = await fetch(`/api/post/like/${id}`)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json();

    setPost(prev => {
      const newPost = { ...prev };
      newPost.is_liked = data.isLiked;
      newPost.total_likes = data.total_likes;
      return newPost;
    })
  }

  const handleCommentLike = (com_id, index) => {
    fetch(`/api/post/comment/like/${com_id}`)
      .then(res => res.json())
      .then(data => {
        setPost(prev => {
          const newPost = { ...prev };
          newPost.comments[index].is_comm_liked = data.is_comm_liked;
          return newPost;
        })
      })
  }

  const handlePost = (e) => {
    setComment(e.target.value)
  }

  const handleFavorite = (id) => {
    fetch(`/api/post/favorite/${id}`)
      .then(res => res.json())
      .then(data => {
        setPost(prev => {
          const newPost = { ...prev };
          newPost.is_favorite = data.isFavorite;
          return newPost;
        })
      })
  }

  useEffect(() => {
    fetch(`/api/getPost/${id}`)
      .then(res => res.json())
      .then(data => {
        console.log("Post:", data)
        setPost(data)
      })
  }, [])

  const doSubmit = async (e) => {
    e.preventDefault()
    const dta = {
      "post_id": post.post_id,
      "comment": comment
    }
    const response = await create_PostCommentEntry(dta)
    if (response.status === 400) {
      setError(response.data)
      console.log(error)
    } else {
      const newComm = response.data;
      const newComment = {...post};
      newComment.comments.unshift(newComm)
      setPost(newComment)
      setComment("")
    }
  }

  const CSRFToken = () => {
    return (
      <input type="hidden" name="csrfmiddlewaretoken" value={csrftoken} />
    );
  };
  return (
    <div className="w-full min-h-screen md:p-4 md:px-5 rounded mx-auto">
      <div className="flex items-center justify-center w-full h-12 fixed md:hidden top-0 left-0 bg-white">
        <h2 className="font-medium text-lg">Post</h2>
      </div>

      {post && post.user && post.comments &&
        <div className="pt-12 md:pt-0 lg:w-full lg:max-w-[935px] h-auto block md:flex items-start border border-solid border-gray-300 rounded-r-[3px]">
          <header className="w-full h-14 px-4 flex md:hidden items-center justify-between border-b border-solid border-grey-200">
            <Link className='m-0 p-0 hover:no-underline'>
              <div className='flex items-center gap-3'>
                <img src={post.user.profile} alt={post.user.username} className="w-7 h-7 rounded-full" />
                <p className="flex items-center flex-wrap">
                  <span className="font-medium text-sm">{post.user.username}</span>
                </p>
              </div>
            </Link>
            <MoreHorizIcon className='cursor-pointer' />
          </header>
          <div className="flex-1 h-fit md:h-[calc(100vh-50px)] bg-black flex items-center justify-center">
            <img src={post.imageUrl} className="w-full h-full object-cover" />
          </div>
          <div className="w-full md:w-[40%] h-full">
            <div className="w-full h-full block bg-white">
              <header className="w-full h-14 px-4 hidden md:flex items-center justify-between border-b border-solid border-grey-200">
                <Link className='m-0 p-0 hover:no-underline'>
                  <div className='flex items-center gap-3'>
                    <img src={post.user.profile} alt={post.user.username} className="w-7 h-7 rounded-full" />
                    <p className="flex items-center flex-wrap">
                      <span className="font-medium text-sm">{post.user.username}</span>
                    </p>
                  </div>
                </Link>
                <MoreHorizIcon className='cursor-pointer' />
              </header>
              {/* comments */}
              <div className="flex flex-col justify-start w-full h-[calc(373px)] px-4 py-2 scrollbar-hide overflow-x-hidden overflow-y-auto">
                <div className="flex items-start gap-3 mb-3">
                  <img src={post.user.profile} alt="" className="w-7 h-7 rounded-full" />
                  <div className='flex-1'>
                    <p className="text-sm">
                      <span className="font-medium text-sm mr-1">{post.user.username}</span>
                      {post.post}
                    </p>
                    <p className="flex items-center">
                      <span className="text-xs text-lightGrey">2d</span>
                    </p>
                  </div>
                </div>
                {/* comments loop */}
                {post.comments.map((com, index) => (
                  <div className="flex items-start gap-3 mb-3" key={index}>
                    <img src={com.userProfile} alt={com.username} className="w-7 h-7 rounded-full" />
                    <div className='flex-1 flex flex-col justify-start'>
                      <p className="text-sm">
                        <span className="font-medium text-sm  mr-1">{com.username}</span>
                        {com.comment}
                      </p>
                      <p className="flex items-center gap-2">
                        <span className="text-xs text-lightGrey">2d</span>
                        <span className="text-xs text-lightGrey">{com.total_comments_likes > 0 ? com.total_comments_likes : "93 likes"}</span>
                      </p>
                    </div>
                    {com.is_comm_liked ?
                      <FavoriteIcon className="cursor-pointer text-red-700" onClick={() => handleCommentLike(com.com_id, index)} style={{ fontSize: "15px" }} />
                      :
                      <FavoriteBorderIcon className="cursor-pointer text-[#262626] hover:text-[#8E8E8E]" onClick={() => handleCommentLike(com.com_id, index)} style={{ fontSize: "15px" }} />
                    }
                  </div>
                ))}
              </div>

              {/* -------------------------------------- */}

              <div className="w-full h-full bg-white pt-1 relative z-10">
                <div className="w-full border-t border-solid border-grey-300">
                  <div className="w-full h-10 flex items-center justify-between px-4">
                    <div className="flex items-center gap-4">
                      {post.is_liked ?
                        <FavoriteIcon className="text-xl cursor-pointer text-red-700" onClick={() => handleLikes(post.post_id)} />
                        :
                        <FavoriteBorderIcon className="text-xl cursor-pointer text-[#262626] hover:text-[#8E8E8E]" onClick={() => handleLikes(post.post_id)} />
                      }
                      <ChatIcon className="text-lg cursor-pointer text-[#262626] hover:text-[#8E8E8E]" />
                      <TelegramIcon className="text-xl cursor-pointer text-[#262626] hover:text-[#8E8E8E]" />
                    </div>
                    {post.is_favorite ?
                      <BookmarkIcon className="text-xl cursor-pointer text-[#262626]" onClick={() => handleFavorite(post.post_id)} />
                      :
                      <BookmarkBorderIcon className="text-xl cursor-pointer text-[#262626] hover:text-[#8E8E8E]" onClick={() => handleFavorite(post.post_id)} />
                    }
                  </div>

                  {/* bottom input form */}
                  <div className="w-full pb-2 px-4 bg-white">
                    {/* views */}
                    <p className="text-[#262626] font-base pb-1">{post.total_likes > 0 ? post.total_likes + " likes" : "2,702,556 likes"}</p>
                    <p className="text-[#8E8E8E] text-sm my-2">1 Day Ago</p>
                  </div>
                  <form className="w-full h-12 flex items-center gap-2 border-t border-solid border-[#DBDBDB] px-4">
                    <CSRFToken />
                    <SentimentSatisfiedAltIcon className="text-2xl text-[#262626] cursor-pointer" />

                    <input type="text" className="border-0 bg-transparent text-[#262626] basis-full text-sm outline-0" placeholder="Add a comment..." value={comment} onChange={(e) => handlePost(e)} />

                    <button type="submit" disabled={comment == "" && true} className={`focus:outline-0  text-[${comment ? "#0F9BF7" : "#C5E7FD"}] text-base font-medium cursor-${comment ? "pointer" : "default"}`}
                    onClick={(e) => doSubmit(e)} >Post</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  )
}

export default ViewPost
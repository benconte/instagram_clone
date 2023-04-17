import React, { useState, useLayoutEffect, useContext } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import SendIcon from "@mui/icons-material/Send";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import ChatIcon from "@mui/icons-material/Chat";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import TelegramIcon from "@mui/icons-material/Telegram";
import { AppContext } from "../../Base";
import { Link } from "react-router-dom";
import { create_PostCommentEntry } from "../../API";
import ClickAwayListener from "@mui/base/ClickAwayListener";

function Post({ post, index, setPost }) {
  const [comment, setComment] = useState("");
  const {
    postData,
    setPostData,
    user,
    handleClickSnackBar,
    setSnackBarMsg,
    setSnackBarSeverity,
  } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);
  const [deletePost, setDeletePost] = useState(false);
  const [deletePostLoading, setDeletePostLoading] = useState(false);

  const handleComment = (e) => {
    setComment(e.target.value);
  };

  const handleLikes = async (id) => {
    const response = await fetch(`/api/post/like/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    // console.log(postData.filter(pst => pst.post_id === id))
    setPostData((prev) => {
      const newPost = [...prev];
      newPost[index].is_liked = data.isLiked;
      newPost[index].total_likes = data.total_likes;
      return newPost;
    });
  };

  const handleFavorite = (id) => {
    fetch(`/api/post/favorite/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setPostData((prev) => {
          const newPost = [...prev];
          newPost[index].is_favorite = data.isFavorite;
          return newPost;
        });
      });
  };

  const handlePost = async () => {
    setIsLoading(true);

    const dta = {
      post_id: post.post_id,
      comment: comment,
    };
    const response = await create_PostCommentEntry(dta);
    if (response.status === 400) {
      setError(response.data);
      console.log(error);
    } else {
      setIsLoading(false);
      setComment("");

      setPost((prevState) => {
        const newState = [...prevState];
        newState[index].total_comments += 1;
        return newState;
      });
    }
  };

  const handleClickAway = () => {
    setDeletePost(false);
  };

  const handleDeletePost = async (id) => {
    setDeletePostLoading(true);
    const req = await fetch("/api/deletePost/" + id);
    const data = await req.json();

    if (data.success) {
      console.log(data.message);
      setDeletePostLoading(false);

      const newPosts = postData.filter((post) => post.post_id !== id);
      setPostData(newPosts);
      setSnackBarSeverity("success");
      handleClickSnackBar();
      setSnackBarMsg(data.message);
    } else {
      console.log(data.message);
      setDeletePostLoading(false);

      setSnackBarSeverity("error");
      handleClickSnackBar();
      setSnackBarMsg(data.message);
    }
  };
  return (
    <article className="relative w-full flex flex-col border border-solid border-[#DBDBDB] bg-white rounded-[8px] mb-2">
      {deletePostLoading && (
        <div className="absolute top-0 bottom-0 left-0 w-full h-full bg-black opacity-80 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-solid border-igBlue border-r-transparent rounded-full animate-spin"></div>
        </div>
      )}
      <header className="px-2 flex items-center justify-between w-full h-14 ">
        <Link
          to={`/${post.user.username}`}
          className="m-o p-o hover:no-underline flex items-center gap-3"
        >
          <img
            src={post.user.profile}
            alt="/me.j"
            className="w-[40px] h-[40px] rounded-full"
          />
          <span className="text-base font-medium text-[#444444]">
            {post.user.username}
          </span>
        </Link>

        {post.user.id === user.id && (
          <ClickAwayListener onClickAway={handleClickAway}>
            <div className="relative">
              <MoreHorizIcon
                className="text-xl cursor-pointer text-[#444444]"
                onClick={() => setDeletePost(!deletePost)}
              />
              {deletePost && (
                <div
                  className="absolute p-2 rounded bg-red-600 text-white top-10 right-0 cursor-pointer"
                  onClick={() => handleDeletePost(post.post_id)}
                >
                  <h3 className="text-sm capitalize">Delete</h3>
                </div>
              )}
            </div>
          </ClickAwayListener>
        )}
      </header>
      <div className="w-full h-fit bg-black">
        <img
          src={post.imageUrl}
          alt="post"
          className="w-full max-h-[30rem] object-contain"
        />
      </div>
      {/* controls */}
      <div className="w-full px-2 h-12 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {post.is_liked ? (
            <FavoriteIcon
              className="text-xl cursor-pointer text-red-700"
              onClick={() => handleLikes(post.post_id)}
            />
          ) : (
            <FavoriteBorderIcon
              className="text-xl cursor-pointer text-[#262626] hover:text-[#8E8E8E]"
              onClick={() => handleLikes(post.post_id)}
            />
          )}
          <Link
            to={`/p/${post.post_id}`}
            className="m-0 p-0 hover:no-underline"
          >
            <ChatIcon className="text-lg cursor-pointer text-[#262626] hover:text-[#8E8E8E]" />
          </Link>
          <TelegramIcon className="text-xl cursor-pointer text-[#262626] hover:text-[#8E8E8E]" />
        </div>
        {post.is_favorite ? (
          <BookmarkIcon
            className="text-xl cursor-pointer text-[#262626]"
            onClick={() => handleFavorite(post.post_id)}
          />
        ) : (
          <BookmarkBorderIcon
            className="text-xl cursor-pointer text-[#262626] hover:text-[#8E8E8E]"
            onClick={() => handleFavorite(post.post_id)}
          />
        )}
      </div>
      {/* bottom */}
      <div className="w-full px-2 pb-2">
        {/* views */}
        <p className="text-[#262626] font-base pb-1">
          {post.total_likes > 0
            ? post.total_likes + " likes"
            : "2,702,556 likes"}
        </p>
        <p className="text-[#262626] text-sm">
          <span className="font-medium mr-2">{post.user.username}</span>
          {post.post}
        </p>
        <Link to={`/p/${post.post_id}`} className="m-0 p-0 hover:no-underline">
          <p className="text-[#8E8E8E] text-sm my-2 cursor-pointer">
            {post.is_comments_allowed
              ? post.total_comments + " comments"
              : "No comments"}
          </p>
        </Link>
        <p className="text-[#8E8E8E] text-sm my-2">{post.date_posted}</p>
      </div>
      {post.is_comments_allowed ? (
        <div className="w-full h-12 flex items-center gap-2 border-t border-solid border-[#DBDBDB] px-2">
          <SentimentSatisfiedAltIcon className="text-2xl text-[#262626] cursor-pointer" />
          <input
            type="text"
            className="border-0 bg-transparent text-[#262626] basis-full text-sm outline-0"
            value={comment}
            placeholder="Add a comment..."
            onChange={(e) => handleComment(e)}
          />
          {isLoading ? (
            <div className="w-5 h-5 mx-auto border-2 border-solid border-[#0F9BF7] border-r-transparent rounded-full animate-spin"></div>
          ) : (
            <button
              type="button"
              disabled={!comment.length > 0 && "on"}
              className={`focus:outline-0 ${
                comment.length > 0 ? "text-[#0F9BF7]" : "text-[#C5E7FD]"
              } text-base font-medium cursor-${
                comment.length > 0 ? "pointer" : "default"
              }`}
              onClick={() => handlePost()}
            >
              Post
            </button>
          )}
        </div>
      ) : (
        <div className="w-full h-12 flex items-center gap-2 border-t border-solid border-[#DBDBDB] px-2">
          <h3 className="text-sm text-gray-400">Comments turned off</h3>
        </div>
      )}
    </article>
  );
}

export default Post;

// "#0F9BF7" : "#C5E7FD"

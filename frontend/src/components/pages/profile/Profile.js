import React, { useContext, useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import { AppContext } from "../../Base"
import SettingsIcon from '@mui/icons-material/Settings';
import GridOnIcon from '@mui/icons-material/GridOn';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';

function Profile() {
    const { user } = useContext(AppContext)
    const [tabIndex, setTabIndex] = useState(0);
    const [posts, setPosts] = useState([])
    const [saved, setSaved] = useState([])

    useEffect(() => {
        fetch("/api/user/getprofilePost").
        then(res => res.json())
        .then(data => {
            setPosts(data);
        });
    }, [])

    const getProfileSaved = () => {
        fetch("/api/user/getprofileSaved")
        .then(res => res.json())
        .then(data => {
            setSaved(data)
        });
    }
    return (
        <>
            {user && <div className='w-auto max-w-full md:max-w-[935px] m-auto px-3 md:px-0'>
                <header className="mt-4 flex items-start gap-20 border-b border-solid border-gray-300 py-3 ">
                    <img src={user.profile} alt={user && user.username} className="w-6 h-6 md:w-40 md:h-40 rounded-full object-cover" />
                    <div className='flex flex-col gap-5'>
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl">{user.username}</h2>
                            <div className='flex items-center gap-3'>
                                <button className="outline-0 rounded border border-solid border-grey text-[rgba(38,38,38,.8)] p-1 font-medium text-sm" type="button">Edit profile</button>
                                <SettingsIcon className="text-2xl text-[rgba(38,38,38,.8)] cursor-pointer" />
                            </div>
                        </div>
                        <p className="flex items-center justify-between">
                            <span className="text-[rgba(38,38,38,.8)] text-base">2 posts</span>
                            <span className="text-[rgba(38,38,38,.8)] text-base">133 followers</span>
                            <span className="text-[rgba(38,38,38,.8)] text-base">596 following</span>
                        </p>
                        <div className="inline-block">
                            <h3 className="font-medium text-base">{user.fullname}</h3>
                            <span className="text-base text-[rgba(38,38,38,.8)]">Words cannot express my passion and love for Fridays</span>
                        </div>
                    </div>
                </header>
                <div className="mb-3">
                    {/* tabs */}
                    <div className="flex justify-center h-12 gap-16">
                        <p className={`flex items-center gap-2 ${tabIndex === 0 ? "text-[rgba(38,38,38,.8)] border-black" : "text-gray-400"} border-t border-solid  cursor-pointer`} onClick={() => setTabIndex(0)}>
                            <GridOnIcon style={{ fontSize: "14px" }} />
                            <span className="text-xs font-normal">POSTS</span>
                        </p>
                        <p className={`flex items-center gap-2 ${tabIndex === 1 ? "text-[rgba(38,38,38,.8)] border-black" : "text-gray-400"} border-t border-solid  cursor-pointer`} onClick={() => {
                            setTabIndex(1);
                            getProfileSaved();
                        }}>
                            <BookmarkBorderIcon style={{ fontSize: "14px" }} />
                            <span className="text-xs font-normal">SAVED</span>
                        </p>
                    </div>
                    <div className="grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 place-items-center">
                        {tabIndex === 0 ?
                            <>
                                {posts && posts.map((post, index) => (
                                    <div className="relative cursor-pointer group w-[293px] h-[293px] mb-3" key={index}>
                                        <img src={post.imageUrl} alt="" className='w-full h-full object-cover' />
                                        <div className="absolute hidden group-hover:flex top-0 left-0 w-full h-full  items-center justify-center gap-3 bg-[rgba(0,0,0,.6)]">
                                            <div className="text-white flex items-center gap-2">
                                                <FavoriteIcon style={{ fontSize: "20px" }} />
                                                <span className="text-sm">321.2k</span>
                                            </div>
                                            <div className="text-white flex items-center gap-2">
                                                <ChatBubbleIcon style={{ fontSize: "20px" }} />
                                                <span className="text-sm">321.2k</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </>
                            :
                            <>
                                {saved && saved.map((post, index) => (
                                    <div className="relative cursor-pointer group w-[293px] h-[293px] mb-3" key={index}>
                                        <img src={post.imageUrl} alt="" className='w-full h-full object-cover' />
                                        <div className="absolute hidden group-hover:flex top-0 left-0 w-full h-full  items-center justify-center gap-3 bg-[rgba(0,0,0,.6)]">
                                            <div className="text-white flex items-center gap-2">
                                                <FavoriteIcon style={{ fontSize: "20px" }} />
                                                <span className="text-sm">321.2k</span>
                                            </div>
                                            <div className="text-white flex items-center gap-2">
                                                <ChatBubbleIcon style={{ fontSize: "20px" }} />
                                                <span className="text-sm">321.2k</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </>
                        }
                    </div>

                </div>
            </div>
            }
        </>
    )
}

export default Profile
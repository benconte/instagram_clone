import React, { useState, useContext } from 'react'
import { FileUploader } from "react-drag-drop-files";
import BrokenImageOutlinedIcon from '@mui/icons-material/BrokenImageOutlined';
import ImageIcon from '@mui/icons-material/Image';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import Switch from "react-switch";
import { AppContext } from "../Base"
import { csrftoken } from '../Cookie'
import { create_PostEntry } from "../API"
import Snackbar from '@mui/material/Snackbar';
import ClearIcon from '@mui/icons-material/Clear';

const fileTypes = ["JPG", "JPEG", "PNG", "GIF"];

function Create_post() {
    const [image, setImage] = useState(null)
    const [worldCount, setWorldCount] = useState(0)
    const [isChecked, setIsChecked] = useState(false)
    const [isLikesChecked, setIsLikesChecked] = useState(false)
    const [open, setOpen] = React.useState(false); // for snackbar
    const [post, setPost] = useState({
        'post': '',
        'imageUrl': '',
        'is_comments_allowed': isChecked
    })
    const [error, setError] = useState({
        'title': '',
        'description': '',
        'imageUrl': '',
        'middlewaretoken': csrftoken
    })

    const { user, setIsPostFormActive, handleClickSnackBar, setSnackBarMsg, postData, setPostData } = useContext(AppContext)
    const fileReader = new FileReader() // creating a file reader

    const handleChange = () => {
        setIsChecked(!isChecked)

        const newData = { ...post }
        newData["is_comments_allowed"] = isChecked
        setPost(newData)
        console.log(isChecked)
        console.log(post)
    }

    const handleChangeLikes = () => {
        setIsLikesChecked(!isLikesChecked)
    }

    const handleFile = (file) => {
        const newData = { ...post }
        newData["imageUrl"] = file
        setPost(newData)

        fileReader.onload = function (event) {
            setImage(event.target.result)
        }
        fileReader.readAsDataURL(file);
    }

    const [slider_counter, setSlider_counter] = useState(0)
    function slide(command) {
        if (command == "close") {
            // handle close
            alert("form cleared")
            setImage(null)
        }

        if (command === "back") {
            // clear the state
            setSlider_counter(slider_counter - 1)
        } else if (command === "next") {
            setSlider_counter(slider_counter + 1)
        }
    }

    const handlePost = ({ currentTarget: input }) => {
        let newData = { ...post };
        newData[input.name] = input.value;
        setPost(newData)
    }

    const doSubmit = async (e) => {
        e.preventDefault()
        const response = await create_PostEntry(post);
        if (response.status === 400) {
            setError(response.data)
            alert(error)
        } else {
            const newPost = response.data
            const newPostData = [...postData]
            newPostData.unshift(newPost)
            setPostData(newPostData)

            setIsPostFormActive(false)
            // snackbar
            handleClickSnackBar()
            setSnackBarMsg("Post uploaded successfully.")
        }
    }

    const CSRFToken = () => {
        return (
            <input type="hidden" name="csrfmiddlewaretoken" value={csrftoken} />
        );
    };
    return (
        <div className='clicked py-10 z-20 fixed top-0 left-0 right-0 bottom-0 w-full min-h-screen bg-[rgba(0,0,0,.65)] flex items-center justify-center'>
            <div>
                <div className="relative w-full h-10">
                    <ClearIcon 
                        className="text-3xl text-white absolute top-10 -right-6 cursor-pointer" 
                        onClick={() => setIsPostFormActive(false)}
                    />
                </div>

                <form className='mix-w-[348px] max-w-[855px] min-h-[391px] max-h-[898px] bg-white rounded' >
                    <CSRFToken />
                    <div className='w-full h-[43px] border-b-2 border-solid border-lightgrey flex items-center justify-between px-2 duration-75'>
                        <KeyboardBackspaceIcon
                            className="cursor-pointer"
                            style={{ fontSize: "30px" }}
                            onClick={() => slide(slider_counter > 0 ? "back" : "close")}
                        />
                        <h3 className='font-medium text-black'>Create new post</h3>
                        <div>
                            {image ? slider_counter != 1 ?
                                <span className='text-igBlue m-0 text-sm font-medium cursor-pointer' onClick={() => slide("next")}>Next</span>
                                :
                                <button type="submit" className='text-igBlue m-0 text-sm font-medium cursor-pointer border-0 bg-transparent outline-0' onClick={(e) => doSubmit(e)}>Share</button>
                                : <></>}
                        </div>
                    </div>
                    <div className={`flex flex-col md:flex-row items-center justify-center mix-w-[348px] max-w-[855px] min-h-[391px] `}>
                        {image == null ?
                            <FileUploader
                                handleChange={handleFile}
                                name="file"
                                types={fileTypes}
                                label="Drag photos and videos here"
                                maxSize={10}
                                style={{ height: "100%" }}>
                                <div className="min-w-[410px] min-h-[400px] flex items-center justify-center flex-col gap-5">
                                    <div className="w-auto h-auto flex justify-center items-center relative">
                                        <BrokenImageOutlinedIcon className="text-[#262626] -rotate-3" style={{ fontSize: "60px" }} />
                                        <ImageIcon className="text-[#262626]  absolute bottom-[-14px] right-[-21px] rotate-6" style={{ fontSize: "60px" }} />
                                    </div>
                                    <p className="text-lg text-[#262626]">Drag Photos and Videos here</p>
                                    <button tyle="button" className="py-[5px] px-[9px] bg-[#0095f6] text-[14px] text-white text-center rounded-[4px] border border-solid border-transparent font-medium outline-0 cursor-pointer">Select from computer</button>
                                </div>
                            </FileUploader>
                            :
                            <div className={`w-[400px] ${slider_counter === 1 ? "h:[200px]": "h:[400px]" } md:h-[400px]`}>
                                <img src={image} alt="" className="w-full h-full rounded object-cover" />
                            </div>
                        }

                        {/* post  */}
                        {slider_counter === 1 &&
                            <div className={`w-[340px] h-[400px] bg-white overflow-x-hidden overflow-y-scroll`}>
                                <header className="flex gap-2 h-16 items-center px-[10px] py-[8px]">
                                    <img src={user.profile} className="w-[40px] h-[40px] rounded-full object-cover" alt="" />
                                    <span className="text-sm text-black font-medium">{user.username}</span>
                                </header>
                                <div className="w-full h-[168px]">
                                    <textarea className="w-full h-full resize-none border-0 outline-0 text-grey-300 px-[10px]"
                                        name="post"
                                        placeholder="Write a caption..." maxLength={2200} onChange={(e) => {
                                            setWorldCount(e.target.value.length)
                                            handlePost(e)
                                        }}></textarea>
                                </div>
                                <p className="flex items-center justify-between h-14 w-full border-b border-solid border-lightgrey px-[10px]">
                                    <SentimentSatisfiedAltIcon className="text-3xl text-lightGrey cursor-pointer" />
                                    <span className="text-sm text-lightGrey">{worldCount}/2,200</span>
                                </p>
                                {/* settings */}
                                <div className="w-full h-auto pt-[7px] px-[2px] md:px-[5px] pb-[10px]">
                                    <h3 className="font-bold mb-1">Advanced Settings</h3>
                                    <div className="w-full">
                                        <div className="flex items-center justify-between leading-4 gap-2">
                                            <span className="flex items-center flex-wrap text-base text-[#262626]">Hide likes and view count on this post</span>
                                            <Switch
                                                onChange={handleChangeLikes}
                                                checked={isLikesChecked}
                                                height={24}
                                                width={45}
                                            />
                                        </div>
                                        <p className="text-xs text-lightGrey">Only you will see the total number of likes and views on this post. You can change this later by going to the ··· menu at the top of the post. To hide like counts on other people's posts, go to your account settings.</p>
                                    </div>
                                    <div className="w-full mt-3 mb-5">
                                        <div className="flex items-center justify-between leading-4 gap-2">
                                            <span className="flex items-center flex-wrap text-base text-[#262626]">Turn off comments</span>
                                            <Switch
                                                onChange={handleChange}
                                                checked={isChecked}
                                                height={24}
                                                width={45}
                                            />
                                        </div>
                                        <p className="text-xs text-lightGrey">You can change this later by going to the ··· menu at the top of your post.</p>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>

                </form>
            </div>
        </div>
    )
}

export default Create_post
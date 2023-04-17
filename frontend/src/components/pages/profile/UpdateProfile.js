import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import ImageIcon from "@mui/icons-material/Image";
import CloseIcon from "@mui/icons-material/Close";
import Dialog from "@mui/material/Dialog";
import Cookies from "js-cookie";

export default function UpdateProfile({ open, handleClose, user }) {
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [username, setUsername] = useState(user.username);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const [filename, setFileName] = useState("");
  const [isChangePassword, setIsChangePassword] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [csrftoken, setCsrftoken] = useState("");

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    setFileName(file.name);
    // Convert the image file to base64 using the FileReader API
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(reader.result);
    };
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      if (oldPassword.length > 0 && newPassword !== confirmNewPassword) {
        setError("Please make sure your password match!");
        setIsLoading(false);
        return;
      }

      fetch("/api/updateProfile")
        .then((res) => res.json())
        .then((data) => null);

      // Reset the form and display a success message
      setImage(null);
      setFileName("");
      setError("");
      setIsLoading(false);

      // sign out user to update changes on the client
      handleOpenModal();
    } catch (err) {
      setError(err);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // handling props changing after component render
    // we make sure all props have fully loaded
    if (user) {
      setUsername(user.username);
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setEmail(user.email);
    }

    const cookie = Cookies.get("csrftoken");
    setCsrftoken(cookie);
  }, [user]);

  return (
    <Dialog open={open} onClose={handleClose}>
      <div className="w-full block md:flex items-start justify-center gap-3">
        <div className="w-full p-3 h-auto md:rounded-lg bg-white">
          {/* profile card */}
          <div className="w-full flex items-center gap-3 border-b border-solid border-gray-300 mb-3 pb-3">
            <img
              src={user.profile}
              alt="profile picture"
              width={50}
              height={50}
              className="rounded-full"
            />
            <div className="flex flex-col justify-center">
              <h3 className="text-lg font-medium text-[var(--dark)] leading-5">
                {user && user.username}
              </h3>
              <span className="text-sm font-medium text-gray-500">
                {user && user.email}
              </span>
            </div>
          </div>

          <h3 className="text-2xl font-medium text-[var(--dark)]">
            Personal info
          </h3>
          <span className="text-base text-gray-500">
            Update your profile photo and personal details here
          </span>

          {error.length > 0 && (
            <div className="w-full flex items-center py-3 justify-center font-medium rounded px-4 bg-red-400 text-white mt-3">
              {error}
            </div>
          )}
          <form className="w-full" action="/user/profile/" method="POST" encType="multipart/form-data">
            <input type="hidden" name="csrfmiddlewaretoken" value={csrftoken} />

            <input
              type="file"
              className="invisible"
              name="image"
              id="file"
              onChange={handleFileInputChange}
            />
            <div className="w-full">
              <span className="text-base font-medium text-gray-500">
                Profile Picture
              </span>
              <div className="w-full h-20 flex items-center gap-3 mt-2 border-2 border-dashed border-gray-300 p-3 rounded-lg">
                <div className="w-28 h-16">
                  {image !== null ? (
                    <div className="w-full h-full relative">
                      <img
                        src={image}
                        alt="profile"
                        className="h-full object-cover rounded"
                        fill={true}
                      />
                      <div
                        className="absolute -top-2 -right-2 flex items-center justify-center bg-white cursor-pointer border border-solid border-gray-200 rounded-full z-[1]"
                        onClick={() => {
                          setImage(null);
                          setFileName("");
                        }}
                      >
                        <CloseIcon className="text-sm p-1 text-[var(--dark-blue)]" />
                      </div>
                    </div>
                  ) : (
                    <div className="w-full h-full rounded bg-blue-100 flex items-center justify-center">
                      <ImageIcon className="text-blue-500" />
                    </div>
                  )}
                </div>
                <p className="text-sm text-gray-500 basis-full">
                  {filename.length > 0
                    ? filename
                    : "Upload a profile picture(jpg, jpeg, png). Max size 1MB"}
                </p>
                <label
                  htmlFor="file"
                  className="px-3 py-2 text-sm rounded-md cursor-pointer hover:bg-[#0F9BF7] hover:text-white text-[var(--dark)] border-2 border-solid border-gray-300 hover:border-transparent"
                >
                  Browse
                </label>
              </div>
            </div>

            {/* username */}
            <div className="w-full flex flex-col justify-start gap-1 mt-3">
              <label
                className="text-base font-medium antialiased text-gray-500"
                htmlFor="username"
              >
                Username
              </label>
              <input
                id="username"
                className="h-9 rounded outline border-none focus:shadow-lg focus:outline-[#0F9BF7] outline-gray-200 text-sm px-2 outline-2 outline-offset-0 text-gray-500"
                type="text"
                placeholder="Username...."
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            {/* first name */}
            <div className="w-full flex flex-col justify-start gap-1 mt-3">
              <label
                className="text-base font-medium antialiased text-gray-500"
                htmlFor="firstName"
              >
                First name
              </label>
              <input
                id="firstName"
                className="h-9 rounded outline border-none focus:shadow-lg focus:outline-[#0F9BF7] outline-gray-200 text-sm px-2 outline-2 outline-offset-0 text-gray-500"
                type="text"
                placeholder="First Name...."
                name="first_name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>

            {/* last name */}
            <div className="w-full flex flex-col justify-start gap-1 mt-3">
              <label
                className="text-base font-medium antialiased text-gray-500"
                htmlFor="lastName"
              >
                Last Name
              </label>
              <input
                id="lastName"
                className="h-9 rounded outline border-none focus:shadow-lg focus:outline-[#0F9BF7] outline-gray-200 text-sm px-2 outline-2 outline-offset-0 text-gray-500"
                type="text"
                placeholder="Last Name...."
                name="last_name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            {/* email */}
            <div className="w-full flex flex-col justify-start gap-1 mt-3">
              <label
                className="text-base font-medium antialiased text-gray-500"
                htmlFor="email"
              >
                Email
              </label>
              <input
                id="email"
                className="h-9 rounded outline border-none focus:shadow-lg focus:outline-[#0F9BF7] outline-gray-200 text-sm px-2 outline-2 outline-offset-0 text-gray-500"
                type="email"
                placeholder="email...."
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>

            <div className="my-4 w-full">
              <span
                className="text-sm text-[#0F9BF7] font-medium hover:underline cursor-pointer"
                onClick={() => setIsChangePassword(!isChangePassword)}
              >
                Change password?
              </span>

              {isChangePassword && (
                <div className="w-full flex flex-col gap-2">
                  <div className="w-full flex flex-col justify-start gap-1 mt-3">
                    <label
                      className="text-base font-medium antialiased text-gray-500"
                      htmlFor="p1"
                    >
                      Old Password
                    </label>
                    <input
                      id="p1"
                      className="h-9 rounded outline border-none focus:shadow-lg focus:outline-[#0F9BF7] outline-gray-200 text-sm px-2 outline-2 outline-offset-0 text-gray-500"
                      type="password"
                      placeholder="old password"
                      name="password1"
                      onChange={(e) => setOldPassword(e.target.value)}
                      autoComplete="new-password"
                    />
                  </div>
                  <div className="w-full flex flex-col justify-start gap-1 mt-3">
                    <label
                      className="text-base font-medium antialiased text-gray-500"
                      htmlFor="p2"
                    >
                      New Password
                    </label>
                    <input
                      id="p2"
                      className="h-9 rounded outline border-none focus:shadow-lg focus:outline-[#0F9BF7] outline-gray-200 text-sm px-2 outline-2 outline-offset-0 text-gray-500"
                      type="password"
                      placeholder="New password"
                      name="password2"
                      onChange={(e) => setNewPassword(e.target.value)}
                      autoComplete="new-password"
                    />
                  </div>
                  <div className="w-full flex flex-col justify-start gap-1 mt-3">
                    <label
                      className="text-base font-medium antialiased text-gray-500"
                      htmlFor="p3"
                    >
                      Re-enter new password
                    </label>
                    <input
                      id="p3"
                      className="h-9 rounded outline border-none focus:shadow-lg focus:outline-[#0F9BF7] outline-gray-200 text-sm px-2 outline-2 outline-offset-0 text-gray-500"
                      type="password"
                      placeholder="Re-enter new password"
                      name="password"
                      onChange={(e) => setConfirmNewPassword(e.target.value)}
                      autoComplete="new-password"
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="w-full mt-8 flex items-center justify-center">
              <button
                type="submit"
                className="text-white bg-[#0F9BF7] rounded-full w-6/12 py-2 font-medium outline-none text-center hover:bg-lightDark"
              >
                {isLoading ? (
                  <div className="w-5 h-5 mx-auto border-2 border-solid border-white border-r-transparent rounded-full animate-spin"></div>
                ) : (
                  "Save Changes"
                )}
              </button>
            </div>
          </form>
        </div>
        <br />
      </div>
      {/* </Box> */}
    </Dialog>
  );
}

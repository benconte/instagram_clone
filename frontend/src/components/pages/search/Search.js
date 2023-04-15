import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import Lottie from "react-lottie-player";
import { Link } from "react-router-dom";


const animation = require("/static/images/lottiefiles/user-reviews");

const Search = () => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);

  const getUsers = (search) => {
    fetch(`/api/users/search/${search}`)
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
      });
  };
  return (
    <div className="w-full py-10 md:px-40 bg-white min-h-screen">
      <div className="px-3 w-full">
        <div className="w-full bg-white rounded-full flex items-center gap-3 px-3 h-10 border border-solid border-gray-200 shadow-md">
          <SearchIcon className="text-2xl text-[rgba(38,38,38,.8)]" />
          <input
            type="search"
            placeholder="search for a user..."
            className="w-full h-full bg-transparent text-gray-400 text-sm border-none outline-none"
            onChange={(e) => {
              getUsers(e.target.value);
              setSearch(e.target.value);
            }}
          />
        </div>
      </div>

      <div className="w-full flex flex-col items-center justify-center mt-5">
        {users.length > 0 && search.length > 0 ? (
          <div className="w-full rounded-lg p-2">
            {users.map((user, index) => (
              <Link to={`/${user.username}`} className="m-0 p-0 no-underline">
                <div
                  className="flex w-full p-2 items-center gap-3 text-lightDark hover:bg-igBlue hover:text-white rounded-lg cursor-pointer"
                  key={index}
                >
                  <img
                    src={user.profile}
                    alt={user.username}
                    className="w-12 h-12 rounded-full"
                  />
                  <span className="text-sm">{user.username}</span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <Lottie loop animationData={animation} play className="w-3/6 h-3/6" />
        )}
      </div>
    </div>
  );
};

export default Search;

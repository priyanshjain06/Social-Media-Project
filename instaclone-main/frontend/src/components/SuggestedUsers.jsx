import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import useGetSuggestedUsers from "@/hooks/useGetSuggestedUsers"; // Importing our hook

const SuggestedUsers = () => {
  const { suggestedUsers } = useSelector((store) => store.auth);
  //REVIEW
  // useGetSuggestedUsers();
  //REVIEW 🔥 Hook runs automatically when the component loads
  return (
    <div className="my-10">
      <div className="flex items-center justify-between text-sm">
        <h1 className="font-semibold text-gray-600">Suggested for you</h1>
        <span className="font-medium cursor-pointer">See All</span>
      </div>
      //REVIEW
      {suggestedUsers.map((user) => {
        return (
          <div
            key={user._id}
            className="flex items-center justify-between my-5"
          >
            <div className="flex items-center gap-2">
              <Link to={`/profile/${user?._id}`}>
                {" "}
                //REVIEW
                <Avatar>
                  <AvatarImage src={user?.profilePicture} alt="post_image" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </Link>
              <div>
                <h1 className="font-semibold text-sm">
                  <Link to={`/profile/${user?._id}`}>{user?.username}</Link>
                  //REVIEW -
                </h1>
                <span className="text-gray-600 text-sm">
                  {user?.bio || "Bio here..."}
                </span>
              </div>
            </div>
            <span className="text-[#3BADF8] text-xs font-bold cursor-pointer hover:text-[#3495d6]">
              Follow
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default SuggestedUsers;

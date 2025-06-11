import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constant";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
    const feed = useSelector((store) => store.feed);
    const dispatch = useDispatch();

    const getFeed = async () => {
        try {
            if (feed) return;
            const res = await axios.get(BASE_URL + "/feed", {
                withCredentials: true,
            });
            dispatch(addFeed(res?.data?.data?.users));
        } catch (error) {
            console.error("Error fetching feed:", error);
        }
    };

    useEffect(() => {
        getFeed();
    }, []);

    if (!feed) return;

    if (feed.length <= 0) {
        return (
            <div className="flex justify-center my-10">
                <h1 className="text-bold text-2xl">No Users Found</h1>
            </div>
        );
    }

    return (
        feed && (
            <div className="flex flex-col md:flex-row justify-center my-10">
                {feed.map((user) => (
                    <div key={user._id} className="mx-auto">
                        <UserCard user={user} />
                    </div>
                ))}
            </div>
        )
    );
};

export default Feed;

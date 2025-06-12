import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";

const Body = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userData = useSelector((store) => store.user);
    const fetchUser = async () => {
        try {
            const user = await axios.get(BASE_URL + "/profile/view", {
                withCredentials: true,
            });
            dispatch(addUser(user?.data?.data?.user));
        } catch (error) {
            if (error?.status === 401) {
                navigate("/login");
            }
            console.error("Error fetching user:", error);
        }
    };

    useEffect(() => {
        if (!userData) {
            fetchUser();
        }
    }, []);
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    );
};

export default Body;

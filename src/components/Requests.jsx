import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addRequest } from "../utils/requestSlice";
import ConnectionCard from "./ConnectionCard";
import RequestCard from "./RequestCard";

const Requests = () => {
    const requests = useSelector((store) => store.requests);
    const dispatch = useDispatch();
    const fetchRequest = async () => {
        try {
            const res = await axios.get(BASE_URL + "/user/requests/received", {
                withCredentials: true,
            });
            dispatch(addRequest(res?.data?.data?.connectionRequests));
        } catch (error) {
            console.error("Error fetching requests:", error);
        }
    };
    useEffect(() => {
        fetchRequest();
    }, []);

    if (!requests) return;

    if (requests.length === 0) {
        return (
            <div className="flex justify-center my-10">
                <h1 className="text-bold text-2xl">No Requests Found</h1>
            </div>
        );
    }
    return (
        <div className="flex flex-col items-center justify-center my-10">
            <h1 className="text-bold text-2xl">Requests</h1>
            {requests.map((request) => {
                return (
                    <div
                        key={request._id}
                        className="border border-base-300 rounded-lg p-5 my-5"
                    >
                        <RequestCard request={request} />
                    </div>
                );
            })}
        </div>
    );
};

export default Requests;

import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import ConnectionCard from "./ConnectionCard";

const Connections = () => {
    const connections = useSelector((store) => store.connections);
    const dispatch = useDispatch();
    const fetchConnections = async () => {
        try {
            const response = await axios.get(BASE_URL + "/user/connections", {
                withCredentials: true,
            });
            dispatch(addConnections(response?.data?.data?.connections));
        } catch (error) {
            console.error("Error fetching connections:", error);
        }
    };
    useEffect(() => {
        fetchConnections();
    }, []);

    if (!connections) return;

    if (connections.length === 0) {
        return (
            <div className="flex justify-center my-10">
                <h1 className="text-bold text-2xl">No Connections Found</h1>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center my-10">
            <h1 className="text-bold text-2xl">Connections</h1>
            {connections.map((connection) => (
                <div
                    key={connection._id}
                    className="border border-base-300 rounded-lg p-5 my-5"
                >
                    <ConnectionCard connections={connection} />
                </div>
            ))}
        </div>
    );
};

export default Connections;

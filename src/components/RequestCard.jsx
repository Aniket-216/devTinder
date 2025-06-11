import axios from "axios";
import React from "react";
import { BASE_URL } from "../utils/constant";
import { useDispatch } from "react-redux";
import { removeRequest } from "../utils/requestSlice";

const RequestCard = ({ request }) => {
    const dispatch = useDispatch();
    const { firstName, lastName, age, gender, photoUrl, about } =
        request.fromUserId;

    const requestReview = async (status, _id) => {
        try {
            await axios.post(
                BASE_URL + `/request/review/${status}/${_id}`,
                {},
                { withCredentials: true }
            );
            dispatch(removeRequest(_id));
        } catch (error) {
            console.error("Error reviewing request:", error);
        }
    };
    return (
        <div className="card card-side bg-base-300 shadow-sm p-5">
            <figure>
                <img
                    className="w-40 h-40 rounded-lg object-cover"
                    src={
                        photoUrl ||
                        "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    }
                    alt="photo"
                />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{firstName + " " + lastName}</h2>
                <p>{about}</p>
                {age && gender && <p>{age + ", " + gender}</p>}
            </div>

            <div className="card-actions items-center">
                <button
                    className="btn btn-secondary"
                    onClick={() => requestReview("accepted", request._id)}
                >
                    Accept
                </button>
                <button
                    className="btn btn-primary"
                    onClick={() => requestReview("rejected", request._id)}
                >
                    Reject
                </button>
            </div>
        </div>
    );
};

export default RequestCard;

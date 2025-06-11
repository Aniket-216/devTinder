import React from "react";

const ConnectionCard = ({ connections }) => {
    const { firstName, lastName, age, gender, photoUrl, about } = connections;
    return (
        <div className="card card-side bg-base-300 shadow-sm">
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
        </div>
    );
};

export default ConnectionCard;

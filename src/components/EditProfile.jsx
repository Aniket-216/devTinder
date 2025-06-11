import React, { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
    const [firstName, setFirstName] = useState(user?.firstName || "");
    const [lastName, setLastName] = useState(user?.lastName || "");
    const [age, setAge] = useState(user?.age || "");
    const [gender, setGender] = useState(user?.gender || "");
    const [about, setAbout] = useState(user?.about || "");
    const [photoUrl, setPhotoUrl] = useState(user?.photoUrl || "");
    const [error, setError] = useState("");
    const [showToast, setShowToast] = useState(false);
    const dispatch = useDispatch();

    const handleSaveProfile = async (e) => {
        try {
            setError("");
            e.preventDefault();
            const res = await axios.patch(
                BASE_URL + "/profile/edit",
                {
                    firstName,
                    lastName,
                    age,
                    gender,
                    about,
                    photoUrl,
                },
                {
                    withCredentials: true,
                }
            );
            dispatch(addUser(res?.data?.data?.user));
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000); // Hide toast after 3 seconds
        } catch (error) {
            setError(
                error?.response?.data?.message ||
                    "Profile update failed. Please try again."
            );
            console.error("Profile update failed:", error);
        }
    };
    return (
        <>
            <div className="flex justify-center my-10">
                <div className="flex justify-center mx-10">
                    <div className="card bg-base-300 w-96 shadow-sm">
                        <div className="card-body">
                            <h2 className="card-title flex justify-center">
                                Edit Profile
                            </h2>
                            <div>
                                <fieldset className="fieldset my-4">
                                    <legend className="fieldset-legend">
                                        First Name
                                    </legend>
                                    <input
                                        type="text"
                                        value={firstName}
                                        onChange={(e) =>
                                            setFirstName(e.target.value)
                                        }
                                        className="input"
                                    />
                                </fieldset>
                                <fieldset className="fieldset my-4">
                                    <legend className="fieldset-legend">
                                        Last Name
                                    </legend>
                                    <input
                                        type="text"
                                        value={lastName}
                                        onChange={(e) =>
                                            setLastName(e.target.value)
                                        }
                                        className="input"
                                    />
                                </fieldset>
                                <fieldset className="fieldset my-4">
                                    <legend className="fieldset-legend">
                                        Age
                                    </legend>
                                    <input
                                        type="number"
                                        value={age}
                                        onChange={(e) => setAge(e.target.value)}
                                        className="input"
                                    />
                                </fieldset>
                                <fieldset className="fieldset my-4">
                                    <legend className="fieldset-legend">
                                        Gender
                                    </legend>
                                    <input
                                        type="text"
                                        value={gender}
                                        onChange={(e) =>
                                            setGender(e.target.value)
                                        }
                                        className="input"
                                    />
                                </fieldset>
                                <fieldset className="fieldset my-4">
                                    <legend className="fieldset-legend">
                                        About
                                    </legend>
                                    <input
                                        type="text"
                                        value={about}
                                        onChange={(e) =>
                                            setAbout(e.target.value)
                                        }
                                        className="input"
                                    />
                                </fieldset>
                                <fieldset className="fieldset my-4">
                                    <legend className="fieldset-legend">
                                        Photo Url
                                    </legend>
                                    <input
                                        type="text"
                                        value={photoUrl}
                                        onChange={(e) =>
                                            setPhotoUrl(e.target.value)
                                        }
                                        className="input"
                                    />
                                </fieldset>
                            </div>
                            {error && <p className="text-red-500">{error}</p>}
                            <div className="card-actions justify-center">
                                <button
                                    className="btn btn-primary"
                                    onClick={handleSaveProfile}
                                >
                                    Save Profile
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <UserCard
                    user={{ firstName, lastName, age, gender, about, photoUrl }}
                />
            </div>
            {showToast && (
                <div className="toast toast-top toast-end">
                    <div className="alert alert-success">
                        <span>Profile updated successfully.</span>
                    </div>
                </div>
            )}
        </>
    );
};

export default EditProfile;

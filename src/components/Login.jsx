import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constant";

const Login = () => {
    const [emailId, setEmailId] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [isLoginForm, setIsLoginForm] = useState(true);
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        try {
            e.preventDefault();
            const res = await axios.post(
                BASE_URL + "/login",
                {
                    emailId: emailId,
                    password: password,
                },
                { withCredentials: true }
            );

            dispatch(addUser(res?.data?.data?.user));
            navigate("/");
        } catch (error) {
            setError(
                error?.response?.data?.message ||
                    "Login failed. Please try again."
            );
            console.error("Login failed:", error);
        }
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(
                BASE_URL + "/signup",
                { firstName, lastName, emailId, password },
                { withCredentials: true }
            );
            dispatch(addUser(res?.data?.data?.user));
            return navigate("/profile");
        } catch (error) {
            console.error("Sign Up failed:", error);
        }
    };

    return (
        <div className="flex justify-center my-10">
            <div className="card bg-base-300 w-96 shadow-sm">
                <div className="card-body">
                    <h2 className="card-title flex justify-center">
                        {isLoginForm ? "Login" : "Sign Up"}
                    </h2>
                    <div>
                        {!isLoginForm && (
                            <>
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
                            </>
                        )}
                        <fieldset className="fieldset my-4">
                            <legend className="fieldset-legend">
                                Email ID
                            </legend>
                            <input
                                type="text"
                                value={emailId}
                                onChange={(e) => setEmailId(e.target.value)}
                                className="input"
                            />
                        </fieldset>
                        <fieldset className="fieldset my-4">
                            <legend className="fieldset-legend">
                                Password
                            </legend>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="input"
                            />
                        </fieldset>
                    </div>
                    <p className="text-red-500">{error}</p>
                    <div className="card-actions justify-center">
                        <button
                            className="btn btn-primary"
                            onClick={isLoginForm ? handleLogin : handleSignUp}
                        >
                            {isLoginForm ? "Login" : "Sign Up"}
                        </button>
                    </div>

                    <p
                        className="text-center my-5 cursor-pointer"
                        onClick={() => setIsLoginForm((value) => !value)}
                    >
                        {isLoginForm
                            ? "New User? Sign Up Here"
                            : "Already have an account? Login"}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;

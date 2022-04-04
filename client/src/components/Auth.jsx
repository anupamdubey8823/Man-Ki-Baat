import React, { useState } from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';

import signInImage from '../assets/signup.jpg';
import { BACKEND_URL } from '../constants/APIurl';

const initialState = {
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    avatarURL: ""
}

const cookies = new Cookies();

const Auth = () => {

    const [isSignup, setIsSignup] = useState(true);
    const [form, setForm] = useState(initialState);

    const handleChange = (event) => {
        setForm({ ...form, [event.target.name] : event.target.value });
    }

    const switchMode = () => {
        setIsSignup((prevIsSignUp) => !prevIsSignUp);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { username, password, phoneNumber, avatarURL } = form;
        const url = new URL("/auth", BACKEND_URL);

        const { data: {token, userId, hashedPassword, fullName } } = await axios.post(`${url}/${isSignup ? "signup" : "login" }`, {
            username, 
            password, 
            fullName: form.fullName, 
            phoneNumber, 
            avatarURL
        });
        cookies.set('token', token);
        cookies.set('username', username);
        cookies.set('fullName', fullName);
        cookies.set('userId', userId);
        
        if (isSignup) {
            cookies.set('phoneNumber', phoneNumber);
            cookies.set('avatarURL', avatarURL);
            cookies.set('hashedPassword', hashedPassword);
        }
        window.location.reload();
    }

    return (
        <div className='auth__form-container'>
            <div className='auth__form-container_fields'>
                <div className='auth__form-container_fields-content'>
                    <p>{isSignup ? "Sign Up" : "Sign In"}</p>

                    <form onSubmit={handleSubmit}>
                        {isSignup && (
                            <div className='auth__form-container_fields-content_input'>
                                <label htmlFor='fullName'>Full Name</label>
                                <input
                                    name="fullName"
                                    type="text"
                                    placeholder='Full Name'
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        )}

                        <div className='auth__form-container_fields-content_input'>
                            <label htmlFor='username'>Username</label>
                            <input
                                name="username"
                                type="text"
                                placeholder='UserName'
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {isSignup && (
                            <div className='auth__form-container_fields-content_input'>
                                <label htmlFor='phoneNumber'>Phone Number</label>
                                <input
                                    name="phoneNumber"
                                    type="text"
                                    placeholder='Phone Number'
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        )}

                        {isSignup && (
                            <div className='auth__form-container_fields-content_input'>
                                <label htmlFor='avatarURL'>Avatar URL</label>
                                <input
                                    name="avatarURL"
                                    type="text"
                                    placeholder='Avatar URL'
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        )}

                        <div className='auth__form-container_fields-content_input'>
                            <label htmlFor='password'>Password</label>
                            <input
                                name="password"
                                type="password"
                                placeholder='Password'
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {isSignup && (
                            <div className='auth__form-container_fields-content_input'>
                                <label htmlFor='confirmPassword'>Confirm Password</label>
                                <input
                                    name="confirmPassword"
                                    type="password"
                                    placeholder='Confirm Password'
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        )}

                        <div className='auth__form-container_fields-content_button'>
                            <button>{isSignup ? "Sign Up" : "Sign In"}</button>
                        </div>
                    </form>

                    <div className='auth__form-container_fields-account'>
                        <p>
                            {isSignup ? "Already have an account? " : "Don't have an account? "}
                        </p>
                        <span onClick={switchMode}>
                            {isSignup ? "Sign In" : "Sign Up"}
                        </span>
                    </div>
                </div>
            </div>

            <div className='auth__form-container_image'>
                <img src={signInImage} alt="Sign In" />
            </div>
        </div>
    );
};

export default Auth;

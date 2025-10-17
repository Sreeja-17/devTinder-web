import React, { useState } from 'react'
import axios from "axios";
import { useDispatch } from 'react-redux';
import { addUser } from "../utils/userSlice";
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';


const Login = () => {
  const [emailId, setEmailId] = useState('chinni1@gmail.com');
  const [Password, setPassword] = useState('Chinni1@123');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(BASE_URL + "/login", {
        emailId,
        password: Password
      }, { withCredentials: true });
      dispatch(addUser(res.data));
      navigate("/");
    } catch (err) {
      console.log(err);

    }

  }
  return (
    <div className='flex justify-center mt-10'>
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend text-2xl text-center ">Login</legend>

        <label className="label">Email:{emailId}</label>
        <input type="email" value={emailId} className="input" placeholder="Email"
          onChange={(e) => setEmailId(e.target.value)}
        />

        <label className="label">Password:{Password}</label>
        <input value={Password} type="password" className="input" placeholder="Password"
          onChange={(e) => setPassword(e.target.value)} />

        <button className="btn btn-neutral mt-4" onClick={handleLogin}>Login</button>
      </fieldset>
    </div>
  )
}

export default Login
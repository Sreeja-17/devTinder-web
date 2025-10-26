import React, { useState } from 'react'
import axios from "axios";
import { useDispatch } from 'react-redux';
import { addUser } from "../utils/userSlice";
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';


const Login = () => {
  const [emailId, setEmailId] = useState('chinni1@gmail.com');
  const [password, setPassword] = useState('Chinni1@123');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [error, setError] = useState("")

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(BASE_URL + "/login", {
        emailId,
        password
      }, { withCredentials: true });
      dispatch(addUser(res.data.data));
      navigate("/");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong")
      console.log(err);

    }

  }
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(BASE_URL + "/signup", {
        emailId,
        password,
        firstName,
        lastName
      }, { withCredentials: true });
      dispatch(addUser(res.data.data));
      navigate("/profile");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong")
      console.log(err);

    }

  }
  return (
    <div className='flex justify-center '>
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4 my-1">
        <legend className="fieldset-legend text-2xl text-center mb-0">{isLoginForm ? "Login" : "Sign Up"}</legend>
        {!isLoginForm && (
          <>
          <label className="label">First Name:{firstName}</label>
          <input type="firstName" value={firstName} className="input"
            onChange={(e) => setFirstName(e.target.value)}
          />
          <label className="label">Last Name:{lastName}</label>
          <input value={lastName} className="input"
            onChange={(e) => setLastName(e.target.value)}
          />
        </>
        )}
        

        <label className="label">Email:{emailId}</label>
        <input type="email" value={emailId} className="input"
          onChange={(e) => setEmailId(e.target.value)}
        />

        <label className="label">Password:{password}</label>
        <input value={password} type="password" className="input"
          onChange={(e) => setPassword(e.target.value)} />
        <p className="text-red-500">{error}</p>


        <button className="btn btn-neutral mt-4" onClick={isLoginForm? handleLogin: handleSignup} >
          {isLoginForm?"Login" :"Sign Up"}</button>
          <p className='cursor-pointer ' onClick={()=>setIsLoginForm((value)=>!value)}> 
             {isLoginForm ? "New User?Signup here" :"Existing User?Login Here"}</p>
      </fieldset>
     
      
    </div>
  )
}

export default Login

//<p className="text-red-500">{error}</p> onClick={handleLogin} 
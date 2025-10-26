import React from 'react'
import { BASE_URL } from '../utils/constants';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { removeUserFromFeed } from '../utils/feedSlice';

const UserCard = ({ user }) => {

    const { _id,firstName, lastName, photoUrl, age, gender, about } = user;
    const dispatch = useDispatch();
    const handleSendRequest = async (status, userId) => {
        try {
            const res = await axios.post(BASE_URL
                + "/request/send/" + status + "/" + userId
                , {},
                { withCredentials: true })
            dispatch(removeUserFromFeed(userId))
        }

        catch (err) {
            console.log(err)
        }

    }

  if (!user) return;
  
    return (

        <div className="card bg-base-300 w-94 shadow-md -my-3">
            <figure>

                <img src={photoUrl}
                    alt="Photo"
                    className=" w-52 h-56 object-cover  mx-auto" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{firstName + " " + lastName}</h2>
                {age && gender && <p>{age + "," + gender}</p>}
                <p> {about}</p>
                <div className="card-actions justify-end">
                    <button className="btn btn-primary" onClick={()=>handleSendRequest("ignored",_id)}>Ignore</button>
                    <button className="btn btn-secondary"onClick={()=>handleSendRequest("interested",_id)}>Interested</button>
                </div>
            </div>
        </div>
    )
}

export default UserCard;
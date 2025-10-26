import React, { useEffect } from 'react'
import { addRequests, removeRequests } from '../utils/requestSlice'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { BASE_URL } from '../utils/constants'

const Requests = () => {
    const dispatch = useDispatch();
    const requests = useSelector((store) => store.requests);
    

    const reviewRequest = async (status, _id) => {
        try {
            const res = await axios.post
            (BASE_URL + "/request/review/" + status + "/" + _id, {}, { withCredentials: true, })
dispatch(removeRequests());
        }
        catch (err) {
            console.log(err)

        }
    }
    const fetchRequests = async () => {
        try {
            const res = await axios.get(BASE_URL + "/user/request/received", { withCredentials: true, })
            console.log(res)
            dispatch(addRequests(res.data.data))
        } catch (err) {
            console.log(err)

        }
    }
    useEffect(() => {
        fetchRequests();
    }, []);
    if (!requests) return;
    if (requests.length === 0) return <h1 className="flex justify-center my-10"> No Request Found</h1>
    return (
        <div>
            <ul className="list bg-base-100 rounded-box shadow-md">

                <li className="p-4 pb-2 text-2xl text-bold opacity-60 tracking-wide">Connections</li>

                {requests.map(request => {
                    const { _id, firstName, lastName, age, gender, about, photoUrl } = request?.fromUserId;
                    return (
                        <div key={_id}>
                            <li className="list-row">
                                <div><img className="size-10 rounded-box" src={photoUrl} /></div>
                                <div>
                                    <div>{firstName + " " + lastName}</div>
                                    {gender || age && (<div className="text-xs uppercase font-semibold opacity-60">{age + " " + gender}</div>)}
                                </div>
                                <p className="list-col-wrap text-xs">
                                    {about}
                                </p>
                                <button className="btn btn-outline btn-secondary" 
                                onClick={()=>reviewRequest("rejected",request._id)}>Decline</button>
                                <button className="btn btn-outline btn-accent" onClick={()=>reviewRequest("accepted",request._id)}>Accept</button>
                            </li>

                        </div>
                    )
                }
                )}

            </ul>
        </div>
    )
}

export default Requests
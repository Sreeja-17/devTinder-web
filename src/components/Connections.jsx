import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addConnections } from '../utils/connectionSlice'
import { Link } from "react-router-dom";

const Connections = () => {
    const connections=useSelector((store)=>store.connections);
    const dispatch=useDispatch();
    const fetchConnections = async () => {
        try {
            const res = await axios.get(BASE_URL + "/user/view/connections", { withCredentials: true, })
            
            dispatch(addConnections(res.data.data))
        } catch (err) {
            console.log(err)

        }
    }
    useEffect(()=>{
        fetchConnections();
    },[]);

    if(!connections) return;
    if(connections.length===0) return <h1> No Connection Found</h1>
    

    
    return (
        <div >
            <ul className="list bg-base-100 rounded-box shadow-md">
  
  <li className="p-4 pb-2 text-2xl text-bold opacity-60 tracking-wide">Connections</li>

  {connections.map(connection=> {
    const {_id,firstName,lastName,age,gender,about,photoUrl}=connection;
    return (
    <div key={_id}>
        <li className="list-row">
    <div><img className="size-10 rounded-box" src={photoUrl}/></div>
    <div>
      <div>{firstName + " " + lastName}</div>
      {gender || age  && (<div className="text-xs uppercase font-semibold opacity-60">{age + " " + gender}</div>)}
    </div>
    <p className="list-col-wrap text-xs">
     {about}
    </p>
    <Link to={"/chat/" + _id}>
              <button className="btn btn-primary">Chat</button>
            </Link>
   
  </li>

    </div>
    )}
    )}
  
  </ul>
        </div>
    )
}

export default Connections
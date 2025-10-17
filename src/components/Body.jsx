import { useEffect } from 'react'
import NavBar from './NavBar'
import Footer from './Footer'
import Profile from './Profile'
import { Outlet, useNavigate } from 'react-router-dom'
import { BASE_URL } from '../utils/constants'
import { addUser } from '../utils/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import axios from "axios";



const Body = () => {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData=useSelector((store)=>store.user);

  const fetchUser = async () => {
    
    try {
     
      const res = await axios.get(BASE_URL + "/profile/view",
        { withCredentials: true });
      dispatch(addUser(res.data));
      //console.log(res.data)
    }
    catch (err) {
      if(err.status===401){
      navigate("/login");
     }
      
      console.error(err);

    }};
  useEffect(() => {
      fetchUser();
    },[]);
  return (
    <div>
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  )
}

export default Body;
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux"
import axios from "../axios/axiosConfig"
import { login } from "../store/authSlice"

export const useAuthCheck = ()=>{
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(()=>{
        const fetchUser = async ()=>{
            try {
                const res = await axios.get("/auth/user");
                if(res.data.success){
                    dispatch(login(res.data.user));
                } else {
                    // navigate('/')
                    console.log("User not logined");

                }
            } catch (error) {
                console.log("Error: ",error );
                // navigate("/");
            }
        }

        fetchUser();
    },[dispatch, navigate])
}
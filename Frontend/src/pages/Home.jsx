import React, { useEffect, useState } from 'react'
import axios from '../axios/axiosConfig';
import TurfCard from "../components/TurfCard"
import { useNavigate } from 'react-router-dom';

function Home() {
  const [turfs, setTurfs] = useState([]);
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();

  const handleTurfClick = (venueId)=>{
    navigate(`/venue/${venueId}`);
  }

  useEffect(()=>{
    const fetchTurfs = async()=>{
      try {
        setLoading(true);
        const response = await axios.get('/venue/');
        const turfData = response.data;
        // console.log(turfData);
        const turfs = turfData?.venues
        setTurfs(turfs);
      } catch (error) {
        console.error('cant fetch venues and turfs :',error);
      } finally {
        setLoading(false)
      }
    }
    fetchTurfs();
  },[])

  return (
    <div className='px-5 md:px-10 py-20 '>
      <h1 className="text-2xl font-bold mb-6">Book your favourite Venue or Turf</h1>
      {loading ? (
        <p>Loading turfs...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {turfs?.map((turf) => (
            <TurfCard
              key={turf._id}
              image={turf.image}
              name={turf.name}
              location={turf.loaction}
              onClick={()=>{handleTurfClick(turf._id)}}
            />
          ))}
        </div>
      )} 
    </div>
  )
}

export default Home
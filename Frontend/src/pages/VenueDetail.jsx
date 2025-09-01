import React, { useEffect, useState } from 'react'
import axios from '../axios/axiosConfig';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addDetail } from "../store/turfSlotSlice"

function VenueDetail() {
  const [turfDetail, setTurfDetail] = useState({});
  const [turfSlots, setTurfSlots] = useState([]);
  const [turfAndSlots, setTurfAndSlots] = useState({});
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const { venueId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(()=>{
    const fetchTurfDetail = async()=>{
      try {
        setLoading(true);

        const response = await axios.get(`/venue/${venueId}`);
        const turfAndSlotData = response.data;
        const turf = turfAndSlotData?.venue;
        const turfSlot = turfAndSlotData?.slots;

        setTurfDetail(turf);
        setTurfSlots(turfSlot);
        setTurfAndSlots(turfAndSlotData);

        if (turfSlot && turfSlot.length > 0) {
          const sortedSlots = [...turfSlot].sort(
            (a, b) => new Date(a.date) - new Date(b.date)
          );
          setSelectedDate(sortedSlots[0].date);
        }
        
      } catch (error) {
        console.log("Error while fetching Venue Details: ",error);
      } finally {
        setLoading(false);
      }
    };
    fetchTurfDetail();
  },[venueId])

  const user = useSelector((state)=> state.auth.user);
  const handleBookNow = (slot)=>{
    if(user){
      // alert(`Booked slot on ${slot.date} (${slot.startTime} - ${slot.endTime})`)
      dispatch(addDetail(turfAndSlots));
      navigate(`/book/${slot._id}`)
    } else {
      navigate('/login')
    }
  }

  if (loading) return <p className="text-center py-10">Loading...</p>;

  const groupedSlots = turfSlots.reduce((acc, slot) => {
    if (!acc[slot.date]) acc[slot.date] = [];
    acc[slot.date].push(slot);
    return acc;
  }, {});

  return (
    <div className="max-w-5xl mx-auto p-6 py-22 md:px-10">
      {/* Venue Detail */}
      <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Image */}
        <div className="md:w-1/2">
          <img
            src={turfDetail.image}
            alt={turfDetail.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Details */}
        <div className="md:w-1/2 p-6">
          <h1 className="text-2xl font-bold mb-2">{turfDetail.name}</h1>
          <p className="text-gray-600 mb-4">{turfDetail.location}</p>
          <p className="text-sm text-gray-500">
            Created: {new Date(turfDetail.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Slots */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Available Slots</h2>
        {/* Date Tabs */}
        <div className="flex space-x-3 mb-6 overflow-x-auto pb-2 border-b">
          {Object.keys(groupedSlots).map((date) => (
            <button
              key={date}
              onClick={() => setSelectedDate(date)}
              className={`px-4 py-2 rounded-t-lg font-medium ${
                selectedDate === date
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {new Date(date).toLocaleDateString()}
            </button>
          ))}
        </div>
        {/* Slots for selected date */}
        <div className="grid gap-4 md:grid-cols-2">
          {groupedSlots[selectedDate]?.map((slot) => (
            <div
              key={slot._id}
              className="border p-4 rounded-lg shadow flex flex-col justify-between"
            >
              <p className="text-gray-600">
                {slot.startTime} - {slot.endTime}
              </p>
              <p
                className={`mt-2 font-semibold ${
                  slot.isBooked ? "text-red-500" : "text-green-600"
                }`}
              >
                {slot.isBooked ? "Booked" : "Available"}
              </p>
              <button
                className={`mt-4 py-2 px-4 rounded ${
                  slot.isBooked
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
                disabled={slot.isBooked}
                onClick={() => handleBookNow(slot)}
              >
                {slot.isBooked ? "Unavailable" : "Book Now"}
              </button>
            </div>
          ))}
        </div>        
      </div>
    </div>
  )
}

export default VenueDetail
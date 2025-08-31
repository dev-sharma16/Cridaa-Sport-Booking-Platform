import React, { useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { removeDetail } from "../store/turfSlotSlice"
import axios from '../axios/axiosConfig'

function ConfirmBooking() {
  const { slotId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const turfData = useSelector((state) => state.turf.turfSlot); 

  const [isConfirmed, setIsConfirmed] = useState(false);
  const [loading, setLoading] = useState(false);

  const venue = turfData?.venue;
  const slots = turfData?.slots || [];
  const selectedSlot = slots.find((slot) => slot._id === slotId);

  // if (!venue || !selectedSlot) {
  //   return <p className="text-center py-10">No booking data found.</p>;
  // }

  const handleConfirm = async () => {
    try {
      setLoading(true);
      const isBooked = await axios.post(`/venue/book/${slotId}`);
      if(isBooked){
        setIsConfirmed(true);
        dispatch(removeDetail()); 
      }
    } catch (error) {
      console.error("Booking error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (isConfirmed) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center p-6">
        <h1 className="text-2xl font-bold text-green-600 mb-4">
          🎉 Your booking is confirmed!
        </h1>
        <button
          className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
          onClick={() => navigate("/")}
        >
          Continue to Home
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* Venue Details */}
      <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="md:w-1/2">
          <img
            src={venue.image || "https://via.placeholder.com/300x200?text=No+Image"}
            alt={venue.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="md:w-1/2 p-6">
          <h1 className="text-2xl font-bold mb-2">{venue.name}</h1>
          <p className="text-gray-600">{venue.location}</p>
        </div>
      </div>

      {/* Slot Details */}
      <div className="mt-6 p-4 border rounded-lg shadow bg-gray-50">
        <h2 className="text-lg font-semibold mb-2">Selected Slot</h2>
        <p>Date: {selectedSlot.date}</p>
        <p>Time: {selectedSlot.startTime} - {selectedSlot.endTime}</p>
        <p>Status: {selectedSlot.isBooked ? "Already Booked" : "Available"}</p>
      </div>

      {/* Confirm Button */}
      <div className="mt-6 text-center">
        <button
          onClick={handleConfirm}
          disabled={loading || selectedSlot.isBooked}
          className={`px-6 py-2 rounded-lg shadow ${
            loading || selectedSlot.isBooked
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 text-white hover:bg-green-700"
          }`}
        >
          {loading ? "Confirming..." : "Confirm Booking"}
        </button>
      </div>
    </div>
  )
}

export default ConfirmBooking